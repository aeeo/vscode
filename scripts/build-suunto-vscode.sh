#!/bin/bash

set -e

VSCODE_DIR="/Users/z/z/Git/vscode"
EXTENSIONS=(
	"/Users/z/Suunto/suuntoplus-editor"
)
VSCODE_APP="Suunto JS.app"

echo "=== Building Suunto VS Code ==="

cd "$VSCODE_DIR"
npm run gulp vscode-darwin-arm64

echo "=== Copying extensions ==="
EXT_DIR="../VSCode-darwin-arm64/${VSCODE_APP}/Contents/Resources/app/extensions"
for ext in "${EXTENSIONS[@]}"; do
	echo "Copying $ext $EXT_DIR/ ..."
	cp -R "$ext" "$EXT_DIR/"
done

echo "=== Creating DMG ==="
if command -v create-dmg &> /dev/null; then
	create-dmg \
		--volname "Suunto VS Code" \
		--window-size 800 400 \
		--icon-size 100 \
		--app-drop-link 600 185 \
		"../Suunto-VSCode-arm64.dmg" \
		"../VSCode-darwin-arm64/${VSCODE_APP}"
else
	echo "create-dmg not installed, skipping DMG creation"
	echo "App location: ../VSCode-darwin-arm64/${VSCODE_APP}"
fi

echo "=== Done! ==="
