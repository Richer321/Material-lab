# 服务器状态检查脚本

Write-Host "检查材料性能数据库服务器状态..." -ForegroundColor Green

# 1. 检查端口
Write-Host "`n1. 检查端口 3000..." -ForegroundColor Yellow
$port = Test-NetConnection -ComputerName localhost -Port 3000
if ($port.TcpTestSucceeded) {
    Write-Host "   ✓ 端口 3000 可访问" -ForegroundColor Green
} else {
    Write-Host "   ✗ 端口 3000 不可访问" -ForegroundColor Red
}

# 2. 检查文件
Write-Host "`n2. 检查关键文件..." -ForegroundColor Yellow
$files = @(
    "src/app/globals.css",
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "prisma/schema.prisma",
    "prisma/dev.db"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "   ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $file 缺失" -ForegroundColor Red
    }
}

# 3. 检查数据库
Write-Host "`n3. 检查数据库..." -ForegroundColor Yellow
if (Test-Path "prisma/dev.db") {
    Write-Host "   ✓ 数据库文件存在" -ForegroundColor Green
} else {
    Write-Host "   ✗ 数据库文件缺失，请运行: npm run db:push" -ForegroundColor Red
}

# 4. 访问地址
Write-Host "`n4. 访问地址:" -ForegroundColor Yellow
Write-Host "   http://localhost:3000" -ForegroundColor Cyan
Write-Host "   http://127.0.0.1:3000" -ForegroundColor Cyan

Write-Host "`n按 Ctrl+C 停止检查..." -ForegroundColor Gray
Start-Sleep -Seconds 300
