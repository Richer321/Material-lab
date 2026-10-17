# 常见问题解决方案

## localhost 拒绝连接

### 解决方案 1: 确认服务器正在运行

打开新的终端窗口，运行：
```bash
cd materials-db
npm run dev
```

看到以下输出表示成功：
```
▲ Next.js 15.0.3
- Local:        http://localhost:3000
✓ Ready in 2.5s
```

### 解决方案 2: 清除浏览器缓存

1. 按 `Ctrl + Shift + Delete` 打开清除浏览器数据
2. 选择"缓存的图片和文件"
3. 点击"清除数据"
4. 刷新页面

### 解决方案 3: 尝试其他浏览器

- Chrome/Edge: http://localhost:3000
- Firefox: http://localhost:3000
- 或使用 127.0.0.1: http://127.0.0.1:3000

### 解决方案 4: 检查防火墙

1. 打开 Windows 防火墙设置
2. 允许 Node.js 通过防火墙
3. 或临时关闭防火墙测试

### 解决方案 5: 使用其他端口

如果 3000 端口被占用，可以使用其他端口：

修改 `package.json`：
```json
"scripts": {
  "dev": "next dev -p 3001",
  ...
}
```

然后访问 http://localhost:3001

### 解决方案 6: 检查 Node.js 版本

确保 Node.js 版本 >= 18.17：
```bash
node --version
```

如果版本过低，请升级 Node.js。

### 解决方案 7: 重新安装依赖

```bash
cd materials-db
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

### 解决方案 8: 检查代理设置

如果使用了代理，确保 localhost 不走代理：
1. 浏览器设置 → 搜索"代理"
2. 将 "localhost" 添加到"不使用代理的列表"

## 数据库错误

### 找不到数据库

```bash
npm run db:push
npm run db:seed
```

### Prisma Client 未生成

```bash
npm run db:generate
```

## 端口被占用

### 查找并停止占用进程

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <进程ID> /F
```

### 或使用其他端口

```bash
npm run dev -- -p 3001
```
