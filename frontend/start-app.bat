@echo off
set NODE_OPTIONS=--openssl-legacy-provider
start cmd /k "npm start"
timeout /t 10
start cmd /k "npx electron ."
