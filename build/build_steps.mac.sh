../node_modules/.bin/esbuild ../index.js --bundle --outfile=./bundled.js --platform=node

node --experimental-sea-config sea-config.json

cp $(command -v node) x32vor

codesign --remove-signature x32vor
chmod 755 x32vor

npx postject x32vor NODE_SEA_BLOB sea-prep.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 \
    --macho-segment-name NODE_SEA 

codesign --sign - x32Vor

mv x32Vor ../dist/