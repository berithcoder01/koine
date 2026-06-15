"""
gerar_audio.py v3.0 — Koiné Audio Generator (simplificado)
============================================================

Gera o pacote de áudio de um módulo Koiné a partir do .narracao.md:

  public/audio/<ID>/
    ├── <ID>.mp3            ← Áudio completo MP3 (Piper + lameenc)
    └── <ID>.cues.json      ← Metadados sincronizados (timecodes + estrutura)

v3.0 simplificado:
  - Removeu suporte a PERGUNTA/OPCOES/PAUSA/RESPOSTA (exercícios)
  - Apenas conteúdo expositivo: TITULO, INTRODUCAO, UNIDADE, EXPOSICAO,
    NOTA_DIACRITICOS, DICA, VERSICULO, TRANSICAO, FINALIZACAO
  - Groups são apenas de exposição, sem canSkip nem lessonPhase
  - Estrutura plana: um grupo por bloco de conteúdo

Uso:
  python gerar_audio.py
  python gerar_audio.py --input C1-M02.narracao.md
  python gerar_audio.py -i C1-M01.narracao.md -o ../../public/audio
  python gerar_audio.py --no-play
"""

import argparse
import io
import json
import os
import re
import shutil
import sys
import tempfile
import unicodedata
import wave
from datetime import datetime, timezone
from pathlib import Path


# ============================================================
#  CONFIGURAÇÕES PADRÃO
# ============================================================

DEFAULT_NARRATION  = "C1-M01.narracao.md"
DEFAULT_MODEL      = "piper_voz/pt_BR-faber-medium.onnx"
DEFAULT_OUTPUT_DIR = "../../public/audio"

SAMPLE_RATE        = 22050
N_CHANNELS         = 1
SAMPLE_WIDTH       = 2

MP3_BITRATE        = 64
MP3_QUALITY        = 2  # 0=best, 9=worst — mantido em 2 para compensar bitrate menor

# Marcadores válidos (apenas expositivos — sem exercícios)
NARRATION_MARKERS = {
    "TITULO":           {"pause_after": 2.0},
    "INTRODUCAO":       {"pause_after": 1.0},
    "UNIDADE":          {"pause_after": 1.0},
    "EXPOSICAO":        {"pause_after": 0.5},
    "NOTA_DIACRITICOS": {"pause_after": 1.0},
    "DICA":             {"pause_after": 1.5},
    "VERSICULO":        {"pause_after": 1.5},
    "TRANSICAO":        {"pause_after": 1.5},
    "PAUSA":            {"pause_after": 2.0},
    "DITADO":           {"pause_after": 1.0},
    "FINALIZACAO":      {"pause_after": 1.0},
}

NARRATION_MARKER_PATTERN = re.compile(r"^\[([A-Z_]+)\]$")

# Marcadores de nível do módulo (sem prefixo de unidade)
MODULE_LEVEL_MARKERS = {"TITULO", "INTRODUCAO", "FINALIZACAO"}


# ============================================================
#  DICIONÁRIO GREGO → PT
# ============================================================

GREEK_LETTER_NAMES_PT = {
    "α": "alfa",     "Α": "Alfa",
    "β": "beta",     "Β": "Beta",
    "γ": "gama",     "Γ": "Gama",
    "δ": "delta",    "Δ": "Delta",
    "ε": "épsilon",  "Ε": "Épsilon",
    "ζ": "zeta",     "Ζ": "Zeta",
    "η": "eta",      "Η": "Eta",
    "θ": "teta",     "Θ": "Teta",
    "ι": "iota",     "Ι": "Iota",
    "κ": "capa",     "Κ": "Capa",
    "λ": "lambda",   "Λ": "Lambda",
    "μ": "mi",       "Μ": "Mi",
    "ν": "nu",       "Ν": "Nu",
    "ξ": "xi",       "Ξ": "Xi",
    "ο": "ômicron",  "Ο": "Ômicron",
    "π": "pi",       "Π": "Pi",
    "ρ": "rô",       "Ρ": "Rô",
    "σ": "sigma",    "ς": "sigma",   "Σ": "Sigma",
    "τ": "tau",      "Τ": "Tau",
    "υ": "ípsilon",  "Υ": "Ípsilon",
    "φ": "fi",       "Φ": "Fi",
    "χ": "chi",      "Χ": "Chi",
    "ψ": "psi",      "Ψ": "Psi",
    "ω": "ômega",    "Ω": "Ômega",
}

GREEK_WORDS_FONETICA = {
    "ἀγάπη": "agápe",    "ἐγώ": "egó",      "Ἰησοῦς": "Iesús",
    "λόγος": "logós",    "θεός": "teós",     "υἱός": "huiós",
    "ὁ": "ho",           "ἡ": "he",          "τὸ": "to",
    "τὸν": "ton",        "καὶ": "caí",       "ἐν": "en",
    "τῆς": "tes",        "τῇ": "te",         "ἦν": "en",
    "ἀρχῇ": "arjé",      "πρὸς": "prós",     "μονογενῆ": "monogené",
    "ἀνάστασις": "anástasis", "ζωή": "zoé",  "εἰμί": "eimí",
    "εἶπεν": "êipen",    "ἵνα": "hína",      "ἰδού": "idú",
    "Ἐγώ": "Egó",        "Εἰμι": "Eime",     "Ἁγάπη": "Agápe",
    "Λόγος": "Logós",    "Θεός": "Teós",     "Υἱός": "Huiós",
    "Ἐν": "En",          "Ἀρχῇ": "Arjé",
}


def safety_transliterate(text: str) -> str:
    """Rede de proteção: limpa qualquer glifo grego remanescente."""
    if not text:
        return ""
    for greek_word, pt_word in GREEK_WORDS_FONETICA.items():
        text = text.replace(greek_word, pt_word)
    for greek_letter, pt_name in GREEK_LETTER_NAMES_PT.items():
        pattern = r"\b" + re.escape(greek_letter) + r"\b"
        text = re.sub(pattern, pt_name, text)

    def strip_greek_diacritics(char):
        if "\u0370" <= char <= "\u03ff" or "\u1f00" <= char <= "\u1fff":
            nfd = unicodedata.normalize("NFD", char)
            return "".join(c for c in nfd if not unicodedata.combining(c))
        return char

    result = []
    for char in text:
        stripped = strip_greek_diacritics(char)
        if "\u0370" <= stripped <= "\u03ff" or "\u1f00" <= stripped <= "\u1fff":
            continue
        result.append(char)
    return "".join(result)


# ============================================================
#  PARSER
# ============================================================

def parse_narration(filepath: Path) -> list:
    """
    Lê o .narracao.md e retorna lista de tuplas (marker, content).
    Linhas com [NOME_MARCADOR] demarcam seções.
    """
    if not filepath.exists():
        raise FileNotFoundError(f"Arquivo de narração não encontrado: {filepath}")
    text = filepath.read_text(encoding="utf-8")
    chunks = []
    current_marker = None
    current_content = []
    for line in text.split("\n"):
        match = NARRATION_MARKER_PATTERN.match(line.strip())
        if match:
            if current_marker is not None:
                chunks.append((current_marker, "\n".join(current_content).strip()))
            current_marker = match.group(1)
            current_content = []
        else:
            if current_marker is not None:
                current_content.append(line)
    if current_marker is not None:
        chunks.append((current_marker, "\n".join(current_content).strip()))
    return chunks


# ============================================================
#  CUE ID E FUNÇÕES AUXILIARES
# ============================================================

def extract_unit_number_from_unidade_content(content: str) -> int:
    m = re.search(r"unidade\s*(\d+)", content.lower())
    return int(m.group(1)) if m else 0


def extract_module_title_from_titulo_content(content: str) -> str:
    title = content.strip()
    title = re.sub(r"^m[oó]dulo\s*\d+\s*[—\-:]?\s*", "", title, flags=re.IGNORECASE)
    return title.strip().rstrip(".").strip()


def build_cue_id(marker: str, current_unit: int) -> str:
    """
    Gera ID semântico simplificado.
    Marcadores module-level não recebem prefixo.
    Demais recebem prefixo u<N>_.
    """
    suffix = marker.lower()
    if marker in MODULE_LEVEL_MARKERS:
        return suffix
    if current_unit > 0:
        return f"u{current_unit}_{suffix}"
    return suffix


# ============================================================
#  ÁUDIO
# ============================================================

def generate_silence_pcm(duration_sec: float) -> bytes:
    n_frames = int(duration_sec * SAMPLE_RATE)
    return b"\x00\x00" * n_frames * N_CHANNELS


def synthesize_text_to_pcm(voice, text: str) -> bytes:
    buf = io.BytesIO()
    with wave.open(buf, "wb") as temp_wav:
        temp_wav.setnchannels(N_CHANNELS)
        temp_wav.setsampwidth(SAMPLE_WIDTH)
        temp_wav.setframerate(SAMPLE_RATE)
        voice.synthesize_wav(text, temp_wav)
    buf.seek(0)
    with wave.open(buf, "rb") as temp_wav:
        return temp_wav.readframes(temp_wav.getnframes())


def pcm_duration_sec(pcm_bytes: bytes) -> float:
    return len(pcm_bytes) / (SAMPLE_RATE * SAMPLE_WIDTH * N_CHANNELS)


def encode_pcm_to_mp3(pcm_bytes: bytes) -> bytes:
    import lameenc
    encoder = lameenc.Encoder()
    encoder.set_bit_rate(MP3_BITRATE)
    encoder.set_in_sample_rate(SAMPLE_RATE)
    encoder.set_channels(N_CHANNELS)
    encoder.set_quality(MP3_QUALITY)
    mp3_chunks = []
    chunk_size = 8192
    for i in range(0, len(pcm_bytes), chunk_size * SAMPLE_WIDTH * N_CHANNELS):
        block = pcm_bytes[i : i + chunk_size * SAMPLE_WIDTH * N_CHANNELS]
        mp3_chunks.append(encoder.encode(block))
    mp3_chunks.append(encoder.flush())
    return b"".join(mp3_chunks)


def setup_piper():
    from piper import PiperVoice
    from piper.phonemize_espeak import ESPEAK_DATA_DIR
    espeak_data_src = Path(ESPEAK_DATA_DIR)
    if any(ord(c) > 127 for c in str(espeak_data_src)):
        espeak_data_dst = Path(tempfile.gettempdir()) / "piper-espeak-data"
        if not espeak_data_dst.exists():
            shutil.copytree(espeak_data_src, espeak_data_dst)
        os.environ["ESPEAK_DATA_PATH"] = str(espeak_data_dst)
    else:
        os.environ["ESPEAK_DATA_PATH"] = str(espeak_data_src)
    return PiperVoice


# ============================================================
#  PIPELINE PRINCIPAL
# ============================================================

def generate_module_audio(
    narration_path: Path,
    model_path: Path,
    output_dir: Path,
    auto_play: bool = True,
):
    print(f"[INFO] Lendo narracao: {narration_path}", flush=True)
    try:
        chunks = parse_narration(narration_path)
    except FileNotFoundError as e:
        print(f"[ERROR] {e}", flush=True)
        return
    if not chunks:
        print(f"[ERROR] Nenhum marcador [SECAO] encontrado em {narration_path}.", flush=True)
        return
    print(f"   -> {len(chunks)} secoes encontradas", flush=True)

    module_id = narration_path.stem.replace(".narracao", "")
    module_title = ""
    for marker, content in chunks:
        if marker == "TITULO" and content:
            module_title = extract_module_title_from_titulo_content(content)
            break
    if not module_title:
        module_title = module_id

    if not model_path.exists():
        print(f"[ERROR] Modelo de voz nao encontrado: {model_path}", flush=True)
        return
    print(f"[INFO] Carregando modelo: {model_path}", flush=True)
    try:
        PiperVoice = setup_piper()
        voice = PiperVoice.load(str(model_path))
    except Exception as e:
        print(f"[ERROR] Erro ao carregar Piper: {e}", flush=True)
        return

    # Pipeline: sintetizar chunk por chunk
    pcm_buffer = bytearray()
    cues = []
    current_time = 0.0
    current_unit = 0

    print(f"[INFO] Sintetizando audio + gerando timecodes...", flush=True)

    for marker, content in chunks:
        if marker not in NARRATION_MARKERS:
            print(f"   [WARN] Marcador desconhecido: [{marker}] - pulando", flush=True)
            continue

        # Atualiza unidade atual
        if marker == "UNIDADE":
            current_unit = extract_unit_number_from_unidade_content(content)

        # Gera PCM
        if not content or not content.strip():
            continue
        text_to_speak = safety_transliterate(content)
        if not text_to_speak or not text_to_speak.strip():
            continue
        try:
            pcm = synthesize_text_to_pcm(voice, text_to_speak)
        except Exception as e:
            print(f"   [{marker}] [ERROR] Erro na sintese: {e}", flush=True)
            continue

        # Calcula timecodes
        duration = pcm_duration_sec(pcm)
        start_time = current_time
        end_time = current_time + duration
        current_time = end_time

        # Gera cue ID
        cue_id = build_cue_id(marker, current_unit)
        existing_ids = {c["id"] for c in cues}
        if cue_id in existing_ids:
            suffix = 2
            while f"{cue_id}_{suffix}" in existing_ids:
                suffix += 1
            cue_id = f"{cue_id}_{suffix}"

        cues.append({
            "id": cue_id,
            "marker": marker,
            "text": content[:200],
            "startTime": round(start_time, 2),
            "endTime": round(end_time, 2),
        })

        pcm_buffer.extend(pcm)

        # Pausa após o chunk
        pause_after = NARRATION_MARKERS[marker].get("pause_after", 0.0)
        if pause_after > 0:
            silence = generate_silence_pcm(pause_after)
            pcm_buffer.extend(silence)
            current_time += pause_after

    # Codificar PCM → MP3
    print(f"[INFO] Codificando MP3 (lameenc, {MP3_BITRATE} kbps)...", flush=True)
    pcm_bytes = bytes(pcm_buffer)
    mp3_bytes = encode_pcm_to_mp3(pcm_bytes)
    total_duration = pcm_duration_sec(pcm_bytes)

    # Gerar groups (simplificado: grupos por unidade + transições + intro/final)
    groups = []
    current_group_cues = []
    current_group_unit = 0
    current_group_is_transicao = False

    def close_group():
        nonlocal current_group_cues, current_group_unit, current_group_is_transicao
        if not current_group_cues:
            return

        is_trans = current_group_is_transicao
        markers = [c["marker"] for c in current_group_cues]
        is_final = markers == ["FINALIZACAO"]

        if is_trans:
            gid = f"phase_trans_u{current_group_unit}" if current_group_unit > 0 else "phase_trans_app"
        elif is_final:
            gid = "phase_final"
        elif current_group_unit == 0:
            all_module_level = all(m in MODULE_LEVEL_MARKERS for m in markers)
            gid = "phase_intro" if all_module_level else f"phase_unit_{len(groups):02d}"
        else:
            gid = f"phase_exp_u{current_group_unit}"

        cue_ids = [c["id"] for c in current_group_cues]

        group = {
            "id": gid,
            "lessonPhase": "exposure",
            "cueIds": cue_ids,
        }

        if current_group_unit > 0:
            group["unitId"] = f"{module_id}-U{current_group_unit:02d}"
            group["unitType"] = "letter"

        groups.append(group)
        current_group_cues = []
        current_group_is_transicao = False

    for cue in cues:
        marker = cue["marker"]

        if marker == "TRANSICAO":
            # Fecha grupo anterior e inicia grupo de transição
            if current_group_cues:
                close_group()
            current_group_is_transicao = True
            m = re.match(r"u(\d+)_transicao", cue["id"])
            if m:
                current_group_unit = int(m.group(1))
            current_group_cues.append(cue)
            close_group()
            continue

        if marker == "UNIDADE" and current_group_cues:
            # Fecha grupo expositivo anterior
            close_group()
            m = re.match(r"u(\d+)_unidade", cue["id"])
            if m:
                current_group_unit = int(m.group(1))
            current_group_cues.append(cue)
            continue

        if marker == "FINALIZACAO":
            # Fecha grupo anterior e cria grupo module-level para finalização
            if current_group_cues:
                close_group()
            current_group_unit = 0
            current_group_cues.append(cue)
            close_group()
            continue

        current_group_cues.append(cue)
        m = re.match(r"u(\d+)_", cue["id"])
        if m:
            current_group_unit = int(m.group(1))

    close_group()

    # Salvar MP3 + cues.json
    out_dir = output_dir / module_id
    out_dir.mkdir(parents=True, exist_ok=True)
    mp3_path = out_dir / f"{module_id}.mp3"
    cues_path = out_dir / f"{module_id}.cues.json"

    mp3_path.write_bytes(mp3_bytes)
    print(f"   MP3 salvo: {mp3_path} ({len(mp3_bytes) // 1024} KB)", flush=True)

    cues_data = {
        "version": "1.0",
        "moduleId": module_id,
        "moduleTitle": module_title,
        "audioFile": f"/audio/{module_id}/{module_id}.mp3",
        "duration": round(total_duration, 2),
        "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "narrationFile": narration_path.name,
        "cues": cues,
        "groups": groups,
    }

    cues_path.write_text(
        json.dumps(cues_data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"   Cues salvos: {cues_path}", flush=True)

    print(f"\n{'=' * 60}", flush=True)
    print(f"[OK] Pacote de audio gerado!", flush=True)
    print(f"{'=' * 60}", flush=True)
    print(f"   Módulo:            {module_id}", flush=True)
    print(f"   Título:            {module_title}", flush=True)
    print(f"   MP3:               {mp3_path}", flush=True)
    print(f"   Cues:              {cues_path}", flush=True)
    print(f"   Tamanho MP3:       {len(mp3_bytes) // 1024} KB", flush=True)
    print(f"   Cues:              {len(cues)}", flush=True)
    print(f"   Groups:            {len(groups)}", flush=True)
    print(f"   Duração total:     {total_duration:.1f}s "
          f"({total_duration / 60:.1f} min)", flush=True)
    print(f"{'=' * 60}", flush=True)

    if auto_play:
        play_audio(mp3_path)


def play_audio(audio_path: Path):
    abs_path = audio_path.absolute()
    try:
        if sys.platform == "win32":
            os.startfile(str(abs_path))
        elif sys.platform == "darwin":
            os.system(f'open "{abs_path}"')
        else:
            os.system(f'xdg-open "{abs_path}"')
    except Exception as e:
        print(f"   (Não foi possível abrir o player: {e})", flush=True)


# ============================================================
#  CLI
# ============================================================

def main():
    parser = argparse.ArgumentParser(
        description="Gera MP3 + cues.json de um módulo Koiné (v3 simplificado)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos:
  python gerar_audio.py
  python gerar_audio.py --input C1-M02.narracao.md
  python gerar_audio.py -i C1-M01.narracao.md -o ../../public/audio
  python gerar_audio.py --no-play
        """,
    )
    parser.add_argument(
        "--input", "-i",
        default=DEFAULT_NARRATION,
        help=f"Arquivo .narracao.md (padrão: {DEFAULT_NARRATION})",
    )
    parser.add_argument(
        "--model", "-m",
        default=DEFAULT_MODEL,
        help=f"Modelo Piper .onnx (padrão: {DEFAULT_MODEL})",
    )
    parser.add_argument(
        "--output-dir", "-o",
        default=DEFAULT_OUTPUT_DIR,
        help=f"Diretório base de saída (padrão: {DEFAULT_OUTPUT_DIR})",
    )
    parser.add_argument(
        "--no-play", "-q",
        action="store_true",
        help="Não abrir o player automaticamente ao final",
    )
    args = parser.parse_args()

    narration_path = Path(args.input)
    model_path = Path(args.model)
    output_dir = Path(args.output_dir)

    print(f"Koine Audio Generator v3.0 (simplificado)", flush=True)
    print(f"   Entrada:    {narration_path}", flush=True)
    print(f"   Modelo:     {model_path}", flush=True)
    print(f"   Saída base: {output_dir}", flush=True)
    print(flush=True)

    generate_module_audio(
        narration_path=narration_path,
        model_path=model_path,
        output_dir=output_dir,
        auto_play=not args.no_play,
    )


if __name__ == "__main__":
    main()
