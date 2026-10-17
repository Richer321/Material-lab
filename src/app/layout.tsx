import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '材料性能数据库',
  description: '用于存储、检索、对比和管理各种材料性能数据的数据库系统',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">材料性能数据库</h1>
                </div>
                <nav className="flex space-x-4">
                  <a href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    首页
                  </a>
                  <a href="/materials" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    材料列表
                  </a>
                  <a href="/materials/new" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    新增材料
                  </a>
                  <a href="/compare" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    材料对比
                  </a>
                  <a href="/import" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    导入
                  </a>
                  <a href="/export" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    导出
                  </a>
                  <a href="/selection" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    选型规范
                  </a>
                  <a href="/manufacturing" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    材料加工
                  </a>
                  <a href="/surface-treatment" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    表面处理
                  </a>
                </nav>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-center text-sm text-gray-500">
                © 2026 材料性能数据库 - 用于材料科学研究和工程应用
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
