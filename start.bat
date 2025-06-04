@echo off
echo Starting Agent Ecosystem...
node "%~dp0\start.js" %*
if errorlevel 1 (
  echo Error starting Agent Ecosystem
  pause
  exit /b 1
)
