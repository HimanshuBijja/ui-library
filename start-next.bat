@echo off
setlocal enabledelayedexpansion

REM ===== Config =====
set /a port=3000
REM ==================

echo Finding available port...
:findport
netstat -an | find ":%port% " >nul
if %errorlevel% equ 0 (
    set /a port+=1
    goto findport
)
echo Using port %port%

REM Start Next.js production server (app already built)
echo Starting Next.js on port %port%...
start "Next Server - Port %port%" cmd /k "set PORT=%port% && npx next start -p %port%"

echo Waiting for server to be ready at http://localhost:%port% ...
:checkserver
REM Ensure the port is listening
netstat -an | find ":%port% " | find "LISTENING" >nul
if %errorlevel% equ 0 (
    REM Try HTTP request; consider 2xx–4xx as 'ready'
    powershell -NoProfile -Command ^
      "try { $r = Invoke-WebRequest -Uri 'http://localhost:%port%' -TimeoutSec 2 -UseBasicParsing; if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 500) { exit 0 } else { exit 1 } } catch { exit 1 }" >nul 2>&1
    if !errorlevel! equ 0 (
        echo Server is ready! Opening browser...
        start "" "http://localhost:%port%"
        goto done
    )
)
timeout /t 1 /nobreak > nul
goto checkserver

:done
echo Server running on: http://localhost:%port%
exit /b 0
