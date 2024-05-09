#!/bin/bash

for d in $(ls -d */); do
	cd "$d"
	if [ -f "package.json" ]; then
		yarn
		yarn build
	fi
	cd -
done
