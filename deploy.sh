#!/bin/bash

set -e

git pull --rebase

./setup.sh
./build.sh

for f in $(ls /etc/systemd/system/svivor-*.service | xargs -n 1 basename); do
	sudo systemctl restart "$f"
done
