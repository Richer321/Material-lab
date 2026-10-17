@echo off
cd /d D:\Claudecode\Materials\materials-db
echo 正在获取本机IP...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do set IP=%%a
set IP=%IP: =%
echo.
echo ============================================
echo  材料库局域网访问
echo ============================================
echo.
echo  电脑访问: http://localhost:3000
echo  手机访问: http://%IP%:3000
echo.
echo 请确保手机和电脑在同一 WiFi 网络
echo ============================================
echo.
npm run dev
