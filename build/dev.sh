cd ../
echo "Install libraries and dependency."
npm i
echo "Install prisma global"
npm install prisma -g
echo "Generate Schema Prisma"
prisma generate
echo "Migrate Database ..."
prisma db push
echo "Prebuild ..."
npm run prebuild
echo "Build ..."
npm run build
echo "Restart pm2 ..."
pm2 restart be-greenlab