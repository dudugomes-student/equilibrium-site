@echo off
title Equilibrium Multi - Servidor local
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"

if not exist "C:\Program Files\nodejs\npm.cmd" (
  echo Node.js nao foi encontrado em C:\Program Files\nodejs.
  echo Reinstale o Node.js LTS em https://nodejs.org/
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Instalando dependencias...
  call "C:\Program Files\nodejs\npm.cmd" install
  if errorlevel 1 (
    echo Nao foi possivel instalar as dependencias.
    pause
    exit /b 1
  )
)

echo Iniciando o site em http://127.0.0.1:5173/
start "" "http://127.0.0.1:5173/"
call "C:\Program Files\nodejs\npm.cmd" run dev -- --host 127.0.0.1

echo O servidor foi encerrado.
pause
