# Batch audio generation for Ciclos III and IV
# Koiné App -- Piper TTS v3.0 pipeline

$ErrorActionPreference = "Stop"
$env:PYTHONIOENCODING = "utf-8"
$env:PYTHONUTF8 = "1"

$modulosDir = "C:\Users\marco\Documents\BerithCode\Koine\WikiProjeto\Modulos"
$piperDir = (Get-ChildItem -LiteralPath "C:\Users\marco\Documents\BerithCode\Koine\WikiProjeto" -Filter "Ger*" -Directory | Select-Object -First 1).FullName
$python = Join-Path $piperDir ".venv\Scripts\python.exe"
$scriptPy = Join-Path $piperDir "gerar_audio.py"

$modules = @(
    "C3-M01", "C3-M02", "C3-M03", "C3-M04",
    "C3-M05", "C3-M06", "C3-M07", "C3-M08",
    "C4-M01", "C4-M02", "C4-M03", "C4-M04",
    "C4-M05", "C4-M06", "C4-M07", "C4-M08"
)

$total = $modules.Count
$ok = 0
$fail = 0

Write-Host "============================================================"
Write-Host "Batch Audio Generation - C3 + C4 (16 modules)"
Write-Host "============================================================"
Write-Host ""

foreach ($mod in $modules) {
    $narracaoOrigem = Join-Path $modulosDir "$mod.narracao.md"
    $narracaoDestino = Join-Path $piperDir "$mod.narracao.md"
    $count = $ok + $fail + 1

    if (-not (Test-Path -LiteralPath $narracaoOrigem)) {
        Write-Host "[SKIP] $mod - narracao.md not found" -ForegroundColor Yellow
        $fail++
        continue
    }

    Write-Host "($count/$total) Processing $mod..." -ForegroundColor Cyan

    Copy-Item -LiteralPath $narracaoOrigem -Destination $narracaoDestino -Force -ErrorAction Stop
    Set-Location -LiteralPath $piperDir

    $result = & $python $scriptPy -i "$mod.narracao.md" -o "../../public/audio" --no-play 2>&1

    if ($LASTEXITCODE -ne 0) {
        Write-Host "[FAIL] $mod - Piper exit code $LASTEXITCODE" -ForegroundColor Red
        Write-Host $result -ForegroundColor Red
        $fail++
    } else {
        $mp3 = "C:\Users\marco\Documents\BerithCode\Koine\WikiProjeto\public\audio\$mod\$mod.mp3"
        if (Test-Path -LiteralPath $mp3) {
            $size = [math]::Round((Get-Item $mp3).Length / 1KB)
            Write-Host "  OK MP3: ${size}KB" -ForegroundColor Green
            $ok++
        } else {
            Write-Host "[FAIL] $mod - MP3 not created" -ForegroundColor Red
            Write-Host $result
            $fail++
        }
    }
    Write-Host ""
}

Write-Host "============================================================"
$color = if ($fail -eq 0) { "Green" } else { "Yellow" }
Write-Host "Summary: $ok OK $fail Failed $total Total" -ForegroundColor $color
Write-Host "============================================================"
