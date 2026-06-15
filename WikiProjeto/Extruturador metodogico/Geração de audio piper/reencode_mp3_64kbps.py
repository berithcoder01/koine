"""
reencode_mp3_64kbps.py — Re-encode todos os MP3s existentes para 64 kbps

Uso:
  python reencode_mp3_64kbps.py
  python reencode_mp3_64kbps.py --dry-run   # só mostra o que seria convertido
"""

import argparse
import subprocess
import sys
from pathlib import Path

FFMPEG = Path.home() / ".ffmpeg" / "ffmpeg.exe"
AUDIO_DIRS = [
    Path(__file__).resolve().parent.parent / "public" / "audio",
    Path(__file__).resolve().parent.parent.parent / "public" / "audio",
    Path(__file__).resolve().parent.parent.parent / "android" / "app" / "src" / "main" / "assets" / "public" / "audio",
]


def find_mp3s() -> list[Path]:
    files: list[Path] = []
    for d in AUDIO_DIRS:
        if not d.exists():
            continue
        for f in sorted(d.rglob("*.mp3")):
            # Evita processar o mesmo arquivo duas vezes pelo path canônico
            if f not in files:
                files.append(f)
    return files


def reencode(mp3: Path, dry_run: bool = False):
    tmp = mp3.with_suffix(".tmp.mp3")
    cmd = [
        str(FFMPEG),
        "-y",
        "-i", str(mp3),
        "-b:a", "64k",
        "-ar", "22050",
        "-ac", "1",
        "-q:a", "2",
        "-write_xing", "0",
        str(tmp),
    ]
    if dry_run:
        print(f"[DRY-RUN] ffmpeg -i {mp3.name} -b:a 64k")
        return
    old_size = mp3.stat().st_size
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"  ERRO: {mp3.name} - {r.stderr.strip()[-200:]}")
        if tmp.exists():
            tmp.unlink()
        return
    new_size = tmp.stat().st_size
    tmp.replace(mp3)
    pct = (1 - new_size / old_size) * 100
    print(f"  {mp3.name}  {old_size // 1024}KB -> {new_size // 1024}KB  (-{pct:.0f}%)")


def main():
    parser = argparse.ArgumentParser(description="Re-encode MP3s to 64 kbps")
    parser.add_argument("--dry-run", "-n", action="store_true", help="Apenas listar")
    args = parser.parse_args()

    if not FFMPEG.exists():
        print(f"[ERROR] ffmpeg nao encontrado em: {FFMPEG}")
        sys.exit(1)

    mp3s = find_mp3s()
    print(f"[SCAN] {len(mp3s)} MP3(s) unico(s) encontrado(s)")
    if args.dry_run:
        for m in mp3s:
            print(f"   {m.relative_to(m.anchor)}  ({m.stat().st_size // 1024} KB)")
        return

    total_before = sum(m.stat().st_size for m in mp3s)
    print(f"[BEFORE] Tamanho total antes: {total_before // 1024 // 1024} MB")
    print()

    for mp3 in mp3s:
        rel = mp3.relative_to(mp3.anchor)
        reencode(mp3)

    total_after = sum(m.stat().st_size for m in mp3s)
    pct = (1 - total_after / total_before) * 100
    print(f"\n[DONE] {total_before // 1024 // 1024} MB -> {total_after // 1024 // 1024} MB  (-{pct:.0f}%)")


if __name__ == "__main__":
    main()
