CALL ../node_modules/.bin/esbuild ../index.js --bundle --outfile=./bundled.js --platform=node

node --experimental-sea-config sea-config.json

node -e "require('fs').copyFileSync(process.execPath, 'x32Vor.exe')"

"C:\Program Files (x86)\Windows Kits\10\bin\10.0.26100.0\x64\signtool.exe" remove /s x32Vor.exe 

CALL npx postject x32Vor.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2

"C:\Program Files (x86)\Windows Kits\10\bin\10.0.26100.0\x64\signtool.exe" sign /a /fd SHA256 x32Vor.exe

move x32Vor.exe ..\dist\
