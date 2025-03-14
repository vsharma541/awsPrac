#!/bin/bash

# Navigate to the local-modules/@subwayapi directory
cd local_modules/@api

# Loop through each folder and perform npm link
for dir in */; do
  if [ -d "$dir" ]; then
    echo "Linking $dir"
    cd "$dir"
    npm i
    # npm link
    cd ..
  fi
done