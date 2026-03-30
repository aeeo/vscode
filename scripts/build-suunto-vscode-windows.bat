@echo off
setlocal enabledelayedexpansion

set "VSCODE_DIR=D:\Z\Suu\Git\silta_ide\vscode"
set "EXTENSIONS=D:\Z\Suu\Git\suuntoplus-editor"
set "VSCODE_APP=Suunto JS"
set "ARCH=x64"

echo === Building Suunto VS Code ===

cd /d "%VSCODE_DIR%"
call npm run gulp vscode-win32-%ARCH%
if errorlevel 1 exit /b 1

echo === Copying extensions ===
set "EXT_DIR=..\VSCode-win32-%ARCH%\resources\app\extensions"
if not exist "%EXT_DIR%" mkdir "%EXT_DIR%"

for %%i in (%EXTENSIONS%) do (
    echo Copying %%i to %EXT_DIR%\
    xcopy "%%i" "%EXT_DIR%\%%~nxi\" /E /I /Y
)

echo === Renaming executable ===
if exist "..\VSCode-win32-%ARCH%\Code - OSS.exe" (
    ren "..\VSCode-win32-%ARCH%\Code - OSS.exe" "%VSCODE_APP%.exe"
)

echo === Creating ZIP archive ===
where powershell >nul 2>&1
if %errorlevel% == 0 (
    powershell -Command "Compress-Archive -Path '..\VSCode-win32-%ARCH%\*' -DestinationPath '..\Suunto-VSCode-win32-%ARCH%.zip' -Force"
) else (
    echo PowerShell not available, skipping ZIP creation
    echo App location: ..\VSCode-win32-%ARCH%\
)

echo === Done! ===
