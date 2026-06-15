"""
gerar_audio.py — REFATORADO v1.0
================================
Sintetiza áudio narrado de um módulo Koiné a partir do arquivo .narracao.md.

Diferenças em relação à versão anterior:
  1. Lê .narracao.md (curado, sem glifos gregos) em vez de .apostila.md
  2. Usa parser de marcadores [SEÇÃO] em vez de "linha.startswith(titulo:)"
  3. Síntese em chunks com pausas reais de silêncio entre seções
  4. Dicionário de transliteração grego→PT expandido (safety net)
  5. CLI com --input, --model, --output, --no-play
  6. Configuração alinhada com WikiProjeto/Estruturador/NARRACAO.md

Uso:
  python gerar_audio.py
  python gerar_audio.py --input C1-M02.narracao.md
  python gerar_audio.py --input C1-M01.narracao.md --output audio_m01.wav
  python gerar_audio.py --no-play    # não abre o player ao final
"""

import argparse
import io
import os
import re
import shutil
import sys
import tempfile
import unicodedata
import wave
from pathlib import Path


# ============================================================
#  CONFIGURAÇÕES PADRÃO
# ============================================================

DEFAULT_NARRATION = "C1-M01.narracao.md"
DEFAULT_MODEL     = "piper_voz/pt_BR-faber-medium.onnx"
DEFAULT_OUTPUT    = "audio_modulo.wav"
SAMPLE_RATE       = 22050
N_CHANNELS        = 1
SAMPLE_WIDTH      = 2   # 16-bit


# ============================================================
#  TABELA DE MARCADORES  (espelha NARRACAO.md § "TABELA DE MARCADORES")
# ============================================================

NARRATION_MARKERS = {
    "TITULO":            {"action": "speak_with_pause",  "pause_after": 2.0},
    "INTRODUCAO":        {"action": "speak_normal",      "pause_after": 1.0},
    "UNIDADE":           {"action": "speak_with_pause",  "pause_after": 1.0},
    "EXPOSICAO":         {"action": "speak_normal",      "pause_after": 0.5},
    "NOTA_DIACRITICOS":  {"action": "speak_informative", "pause_after": 1.0},
    "DICA":              {"action": "speak_slow",        "pause_after": 1.5},
    "VERSICULO":         {"action": "speak_reverent",    "pause_after": 1.5},
    "PERGUNTA":          {"action": "speak_with_pause",  "pause_after": 2.0},
    "OPCOES":            {"action": "speak_list",        "pause_after": 0.5},
    "PAUSA":             {"action": "silence",           "duration":    5.0},
    "RESPOSTA":          {"action": "speak_affirmative", "pause_after": 2.0},
    "TRANSICAO":         {"action": "speak_transition",  "pause_after": 1.5},
    "FINALIZACAO":       {"action": "speak_closing",     "pause_after": 3.0},
}

NARRATION_MARKER_PATTERN = re.compile(r"^\[([A-Z_]+)\]$")


# ============================================================
#  DICIONÁRIO GREGO → PT  (safety net + base para novos módulos)
# ============================================================
#  Este dicionário é uma REDE DE PROTEÇÃO. O arquivo .narracao.md já
#  é curado e não deve conter glifos gregos. Se algum passar, este
#  código limpa. Conforme novos módulos forem criados, expandir a
#  lista GREEK_WORDS_FONETICA.
# ============================================================

# Letras gregas isoladas → nome em PT
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

# Palavras gregas → pronúncia fonética em PT-BR
GREEK_WORDS_FONETICA = {
    # C1-M01, C1-M02
    "ἀγάπη":     "agápe",
    "ἐγώ":       "egó",
    "Ἰησοῦς":    "Iesús",
    "λόγος":     "logós",
    "θεός":      "teós",
    "υἱός":      "huiós",
    "ὁ":         "ho",
    "ἡ":         "he",
    "τὸ":        "to",
    "τὸν":       "ton",
    "καὶ":       "caí",
    "ἐν":        "en",
    "τῆς":       "tes",
    "τῇ":        "te",
    "ἦν":        "en",
    "ἀρχῇ":      "arjé",
    "πρὸς":      "prós",
    "μονογενῆ":  "monogené",
    "ἀνάστασις": "anástasis",
    "ζωή":       "zoé",
    "εἰμί":      "eimí",
    "εἶπεν":     "êipen",
    "ἵνα":       "hína",
    "ἰδού":      "idú",
    # variantes com inicial maiúscula
    "Ἐγώ":       "Egó",
    "Εἰμι":      "Eime",
    "Ἁγάπη":     "Agápe",
    "Λόγος":     "Logós",
    "Θεός":      "Teós",
    "Υἱός":      "Huiós",
    "Ἐν":        "En",
    "Ἀρχῇ":      "Arjé",
}


def safety_transliterate(text: str) -> str:
    """
    Limpa qualquer glifo grego que tenha passado pelo .narracao.md.
    Como o .narracao.md já é curado, isto é só rede de proteção.
    Retorna o texto já tratado para envio ao Piper.
    """
    if not text:
        return ""

    # 1) Substitui palavras gregas conhecidas (faz antes de letras,
    #    para evitar que 'a' em 'agape' seja trocado por 'alfa')
    for greek_word, pt_word in GREEK_WORDS_FONETICA.items():
        text = text.replace(greek_word, pt_word)

    # 2) Substitui letras gregas isoladas (com word-boundary, para
    #    não interferir em palavras já transliteradas acima)
    for greek_letter, pt_name in GREEK_LETTER_NAMES_PT.items():
        # Escapa caracteres regex especiais (raros em grego, mas seguro)
        pattern = r"\b" + re.escape(greek_letter) + r"\b"
        text = re.sub(pattern, pt_name, text)

    # 3) Remove qualquer diacrítico grego remanescente
    def strip_greek_diacritics(char):
        if "\u0370" <= char <= "\u03ff" or "\u1f00" <= char <= "\u1fff":
            nfd = unicodedata.normalize("NFD", char)
            return "".join(c for c in nfd if not unicodedata.combining(c))
        return char

    # 4) Remove qualquer glifo grego que ainda tenha passado
    result = []
    for char in text:
        stripped = strip_greek_diacritics(char)
        if "\u0370" <= stripped <= "\u03ff" or "\u1f00" <= stripped <= "\u1fff":
            # Glifo grego não-mapeado — descarta
            continue
        result.append(char)
    text = "".join(result)

    return text


# ============================================================
#  PARSER DO ARQUIVO .narracao.md
# ============================================================

def parse_narration(filepath: Path) -> list:
    """
    Faz o parse de um arquivo .narracao.md e retorna lista de tuplas:
        [(marker, content), (marker, content), ...]

    Linhas com padrão [NOME_MARCADOR] demarcam seções; o texto entre
    dois marcadores consecutivos é o conteúdo a ser falado.
    Linhas antes do primeiro marcador (cabeçalho, comentários) são
    descartadas.
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
            # Encontrou novo marcador — salva o anterior
            if current_marker is not None:
                chunks.append((current_marker, "\n".join(current_content).strip()))
            current_marker = match.group(1)
            current_content = []
        else:
            if current_marker is not None:
                current_content.append(line)

    # Salva o último bloco
    if current_marker is not None:
        chunks.append((current_marker, "\n".join(current_content).strip()))

    return chunks


# ============================================================
#  FUNÇÕES DE ÁUDIO
# ============================================================

def generate_silence(duration_sec: float) -> bytes:
    """Gera bytes de silêncio PCM 16-bit mono."""
    n_frames = int(duration_sec * SAMPLE_RATE)
    return b"\x00\x00" * n_frames * N_CHANNELS


def synthesize_text_to_bytes(voice, text: str) -> bytes:
    """
    Sintetiza texto usando Piper e retorna os bytes de áudio PCM.
    Usa BytesIO intermediário para isolar a síntese de cada chunk.
    """
    buf = io.BytesIO()
    with wave.open(buf, "wb") as temp_wav:
        temp_wav.setnchannels(N_CHANNELS)
        temp_wav.setsampwidth(SAMPLE_WIDTH)
        temp_wav.setframerate(SAMPLE_RATE)
        voice.synthesize_wav(text, temp_wav)

    buf.seek(0)
    with wave.open(buf, "rb") as temp_wav:
        return temp_wav.readframes(temp_wav.getnframes())


def adapt_text_for_action(text: str, action: str) -> str:
    """
    Ajustes finos no texto conforme a ação de TTS:
    - speak_slow:        reticências forçam Piper a desacelerar
    - speak_reverent:    pausas extras em vírgulas
    - speak_list:        quebras para pausas naturais entre itens
    - speak_transition:  adiciona gancho de continuidade
    """
    if action == "speak_slow":
        return text.replace(". ", "... ").replace(", ", ",  ")
    if action == "speak_reverent":
        return text.replace(", ", ",  ")
    if action == "speak_list":
        return text.replace(". ", ".\n")
    if action == "speak_transition":
        return text + " ..."
    return text


def setup_piper():
    """
    Configura o Piper com o workaround do espeak-ng no Windows.
    Retorna a classe PiperVoice (já carregada com o ambiente).
    """
    from piper import PiperVoice
    from piper.phonemize_espeak import ESPEAK_DATA_DIR

    # espeak-ng no Windows não lida bem com acentos no caminho
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

def generate_audio(narration_path: Path, model_path: Path, output_path: Path,
                   auto_play: bool = True):
    """
    Pipeline completo:
      1. Lê e parsea o .narracao.md
      2. Carrega o modelo Piper
      3. Sintetiza cada seção respeitando os marcadores
      4. Insere silêncio entre seções
      5. Concatena tudo em um único .wav
    """
    # 1) Parse do arquivo .narracao.md
    print(f"📖 Lendo narração: {narration_path}", flush=True)
    try:
        chunks = parse_narration(narration_path)
    except FileNotFoundError as e:
        print(f"❌ {e}", flush=True)
        return

    if not chunks:
        print(f"❌ Nenhum marcador [SEÇÃO] encontrado em {narration_path}.", flush=True)
        print(f"   Verifique se o arquivo segue o formato documentado em", flush=True)
        print(f"   WikiProjeto/Estruturador/NARRACAO.md", flush=True)
        return

    # Mostra resumo
    markers_found = [m for m, _ in chunks]
    print(f"   → {len(chunks)} seções encontradas", flush=True)
    print(f"   → Marcadores: {', '.join(markers_found)}", flush=True)

    # 2) Carregar modelo Piper
    if not model_path.exists():
        print(f"❌ Modelo de voz não encontrado: {model_path}", flush=True)
        return

    print(f"🎙️ Carregando modelo: {model_path}", flush=True)
    try:
        PiperVoice = setup_piper()
        voice = PiperVoice.load(str(model_path))
    except Exception as e:
        print(f"❌ Erro ao carregar Piper: {e}", flush=True)
        return

    # 3) Sintetizar chunk por chunk
    if output_path.exists():
        output_path.unlink()

    total_chars = 0
    total_audio_bytes = 0
    section_count = 0

    print(f"🔊 Sintetizando áudio em {len(chunks)} seções...", flush=True)

    with wave.open(str(output_path), "wb") as wav_file:
        wav_file.setnchannels(N_CHANNELS)
        wav_file.setsampwidth(SAMPLE_WIDTH)
        wav_file.setframerate(SAMPLE_RATE)

        for marker, content in chunks:
            if not content or not content.strip():
                continue

            config = NARRATION_MARKERS.get(
                marker, {"action": "speak_normal", "pause_after": 0.5}
            )
            action = config.get("action", "speak_normal")

            # --- Ação especial: silêncio puro ---
            if action == "silence":
                duration = config.get("duration", 1.0)
                wav_file.writeframes(generate_silence(duration))
                print(f"   [{marker:<22}] silêncio {duration:.1f}s", flush=True)
                continue

            # --- Ação normal: sintetizar texto ---
            # Safety net de transliteração
            text_to_speak = safety_transliterate(content)
            if not text_to_speak or not text_to_speak.strip():
                print(f"   [{marker:<22}] ⚠️ conteúdo vazio após transliteração", flush=True)
                continue

            # Adapta texto conforme a ação
            text_to_speak = adapt_text_for_action(text_to_speak, action)

            try:
                audio_bytes = synthesize_text_to_bytes(voice, text_to_speak)
                wav_file.writeframes(audio_bytes)
                total_audio_bytes += len(audio_bytes)
                total_chars += len(text_to_speak)
                section_count += 1
                print(f"   [{marker:<22}] {len(text_to_speak):>4} chars "
                      f"→ {len(audio_bytes) // 1024:>3}KB", flush=True)
            except Exception as e:
                print(f"   [{marker:<22}] ❌ Erro: {e}", flush=True)
                continue

            # Pausa após a seção (padrão 0.5s)
            pause_after = config.get("pause_after", 0.5)
            if pause_after > 0:
                wav_file.writeframes(generate_silence(pause_after))

    # 4) Relatório final
    size = output_path.stat().st_size if output_path.exists() else 0

    if size > 2000:
        duration_sec = total_audio_bytes / (SAMPLE_RATE * SAMPLE_WIDTH * N_CHANNELS)
        print(f"\n{'='*60}", flush=True)
        print(f"✅ Áudio gerado com sucesso!", flush=True)
        print(f"{'='*60}", flush=True)
        print(f"   Arquivo:           {output_path}", flush=True)
        print(f"   Tamanho:           {size // 1024} KB", flush=True)
        print(f"   Seções faladas:    {section_count}", flush=True)
        print(f"   Caracteres:        {total_chars}", flush=True)
        print(f"   Duração estimada:  {duration_sec:.1f}s "
              f"({duration_sec / 60:.1f} min)", flush=True)
        print(f"{'='*60}", flush=True)

        # Toca o áudio (opcional, configurável por --no-play)
        if auto_play:
            play_audio(output_path)
    else:
        print(f"\n⚠️ Arquivo de áudio muito pequeno ({size} bytes).", flush=True)
        print(f"   Verifique se o modelo de voz e o arquivo .md estão corretos.", flush=True)


def play_audio(output_path: Path):
    """Abre o áudio no player padrão do sistema operacional."""
    abs_path = output_path.absolute()
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
        description="Gera áudio narrado de um módulo Koiné a partir de .narracao.md",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos:
  python gerar_audio.py
  python gerar_audio.py --input C1-M02.narracao.md
  python gerar_audio.py -i C1-M01.narracao.md -o audio_m01.wav
  python gerar_audio.py --no-play              # não abre o player ao final
  python gerar_audio.py --model piper_voz/faber.onnx

Formato de entrada: ver WikiProjeto/Estruturador/NARRACAO.md
        """
    )
    parser.add_argument(
        "--input", "-i",
        default=DEFAULT_NARRATION,
        help=f"Arquivo .narracao.md de entrada (padrão: {DEFAULT_NARRATION})"
    )
    parser.add_argument(
        "--model", "-m",
        default=DEFAULT_MODEL,
        help=f"Caminho do modelo Piper .onnx (padrão: {DEFAULT_MODEL})"
    )
    parser.add_argument(
        "--output", "-o",
        default=DEFAULT_OUTPUT,
        help=f"Arquivo .wav de saída (padrão: {DEFAULT_OUTPUT})"
    )
    parser.add_argument(
        "--no-play", "-q",
        action="store_true",
        help="Não abrir o player automaticamente ao final"
    )

    args = parser.parse_args()

    narration_path = Path(args.input)
    model_path = Path(args.model)
    output_path = Path(args.output)

    print(f"🚀 Koiné Audio Generator v1.0", flush=True)
    print(f"   Entrada: {narration_path}", flush=True)
    print(f"   Modelo:  {model_path}", flush=True)
    print(f"   Saída:   {output_path}", flush=True)
    print(flush=True)

    generate_audio(
        narration_path,
        model_path,
        output_path,
        auto_play=not args.no_play,
    )


if __name__ == "__main__":
    main()
