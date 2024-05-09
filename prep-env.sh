#!/bin/bash

set -e

export NVM_DIR="$HOME/.nvm"
[ -f "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"  # This loads nvm

if ! command -v nvm &> /dev/null; then
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
	source "$NVM_DIR/nvm.sh"  # This loads nvm
fi


nvm install v20.13.1
nvm alias default v20.13.1

if ! command -v yarn &> /dev/null; then
	npm install --global yarn
fi

for f in $(ls */svivor*.service); do
	if ! [ -f "/etc/systemd/system/$f" ]; then
		sudo ln -sf "$HOME/svivor/$f" /etc/systemd/system/
	fi
done

for d in $(ls -d */); do
	cd "$d"
	if [ -f "package.json" ]; then
		yarn
		yarn build
	fi
	cd -
done

sudo systemctl restart svivor-screenshot
