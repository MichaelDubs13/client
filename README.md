pm2 serve build/ 3000 --spa
pm2 save
pm2 kill

cd /nginx
taskkill /f /IM nginx.exe
start nginx
EXIT

start nginx
nginx -s reload
tasklist /fi "imagename eq nginx.exe"
taskkill /f /im nginx.exe


npm install -g node-windows
npm link node-windows
node index.js
node nodeUninstallService.js
node nodeInstallService.js



mysql credential: root/password