# 材料性能数据库

一个用于存储、检索、对比和管理各种材料性能数据的 Web 应用系统。

## 功能特性

- ✅ **材料管理**：支持材料的增删改查操作
- ✅ **智能搜索**：按名称、牌号、类别快速搜索材料
- ✅ **性能数据**：记录材料的机械、热、电等性能数据
- ✅ **成分管理**：记录材料的化学成分和含量
- ✅ **数据来源**：追溯数据的文献、手册、实验等来源
- ✅ **材料对比**：选择多个材料进行性能对比
- ✅ **数据导入**：支持 CSV 批量导入材料数据
- ✅ **数据导出**：导出材料数据为 CSV 格式

## 技术栈

- **框架**：Next.js 15 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **数据库**：Prisma + SQLite
- **运行环境**：Node.js

## 安装步骤

### 1. 克隆项目

```bash
git clone <repository-url>
cd materials-db
```

### 2. 安装依赖

```bash
npm install
```

### 3. 初始化数据库

```bash
# 生成 Prisma Client
npm run db:generate

# 创建数据库表
npm run db:push

# 填充基础示例数据 (11 种材料)
npm run db:seed

# 填充扩展金属材料数据 (14 种传统钢材)
npm run db:seed:metals

# 填充扩展不锈钢材料数据 (17 种)
npm run db:seed:stainless

# 填充扩展钛合金材料数据 (13 种)
npm run db:seed:titanium

# 填充扩展铝合金材料数据 (19 种)
npm run db:seed:aluminum

# 填充扩展铜合金材料数据 (17 种)
npm run db:seed:copper

# 填充扩展镁合金材料数据 (19 种)
npm run db:seed:magnesium

# 填充扩展铸造铝合金材料数据 (19 种)
npm run db:seed:casting-aluminum

# 填充扩展镍钛合金材料数据 (14 种)
npm run db:seed:niti

# 填充扩展陶瓷材料数据 (20 种)
npm run db:seed:ceramics

# 填充扩展氮化硅陶瓷材料数据 (8 种)
npm run db:seed:silicon-nitride

# 填充扩展工程塑料材料数据 (16 种)
npm run db:seed:plastics

# 填充扩展其他高分子材料数据 (17 种)
npm run db:seed:polymers

# 填充扩展通用工程塑料数据 (14 种)
npm run db:seed:general-plastics

# 填充贵金属材料数据 (5 种) - PFA电极材料
npm run db:seed:precious-metals

# 填充医用高分子材料数据 (11 种) - PFA导管材料
npm run db:seed:medical-polymers

# 填充钴铬合金材料数据 (5 种) - PFA支撑结构材料
npm run db:seed:cobalt-chromium

# 检查数据统计
npm run db:check
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 数据库管理

### 查看数据库

```bash
npm run db:studio
```

这会打开 Prisma Studio，可以在浏览器中查看和编辑数据库。

### 重置数据库

```bash
# 删除数据库
rm prisma/dev.db

# 重新创建并填充数据
npm run db:push
npm run db:seed
```

## 项目结构

```
materials-db/
├── prisma/
│   ├── schema.prisma        # 数据库模型定义
│   └── seed.ts              # 示例数据脚本
├── src/
│   ├── app/                 # Next.js App Router 页面
│   │   ├── api/            # API 路由
│   │   ├── materials/      # 材料相关页面
│   │   ├── compare/        # 材料对比页面
│   │   ├── import/         # 数据导入页面
│   │   └── export/         # 数据导出页面
│   ├── components/         # React 组件
│   │   ├── ui/            # 基础 UI 组件
│   │   ├── material/      # 材料相关组件
│   │   └── forms/         # 表单组件
│   ├── lib/               # 工具库
│   │   ├── db/           # 数据库客户端
│   │   ├── services/     # 业务逻辑服务
│   │   └── utils/        # 工具函数
│   └── types/            # TypeScript 类型定义
├── public/               # 静态文件
└── package.json
```

## 数据模型

### Material（材料）
- 基本信息：名称、牌号、类别、描述
- 关联：性能数据、成分数据、数据来源

### MaterialProperty（性能数据）
- 属性分类：机械、热、电、光学性能
- 数值支持：单值、范围值
- 测试信息：温度、条件、标准

### MaterialComposition（成分数据）
- 元素/组分名称
- 含量：单值或范围值

### DataSource（数据来源）
- 类型：文献、手册、实验、供应商、网站
- 详细信息：作者、年份、出版商、链接

## 材料数据

### 数据统计

- **总材料数**: 233 种
- **性能数据**: 2200+ 条
- **成分数据**: 950+ 条
- **材料类别**: 18 个 (4 个主类别 + 14 个金属子类别)

### 材料分类

#### 金属材料 (99 种)
- **碳钢** (3 种): Q235普通碳素结构钢、45号优质碳素结构钢、65Mn弹簧钢
- **工具钢** (3 种): T10碳素工具钢、CrWMn合金工具钢、W18Cr4V高速工具钢
- **模具钢** (4 种): Cr12冷作模具钢、Cr12MoV冷作模具钢、H13热作模具钢、P20塑料模具钢
- **不锈钢** (17 种): 304L、316、321、347、409、410、420、430、431、439、440C、444、904L、2205、2507、17-4PH、15-5PH
- **钛合金** (13 种): TA1、TA3、TA4、TC10、TC11、TB2、TB6、Ti-6Al-7Nb、Ti-13Nb-13Zr、Ti-153、Ti-5553、Ti-3Al-2.5V、Ti-811
- **铝合金** (19 种): 1060、1100、2017、2024、2A12、3003、3004、3A21、5052、5083、5A03、5A06、6061、6063、6A02、6082、7075、7A04、7A09
- **铸造铝合金** (19 种): A356、356、A380、380、319、383、384、413、A360、360、518、206、242、ZL101、ZL102、ZL104、ZL105、ZL201、ZL301
- **铜合金** (17 种): T2、H62、H68、H70、H80、HPb59-1、QSn6.5-0.1、QSn7-0.2、QSn4-3、QAl9-4、QAl10-4-4、QBe2、QSi3-1、B10、B19、B30、BZn15-20
- **镁合金** (19 种): AZ31、AZ61、AZ91、ZK30、ZK60、AM50、AM60、WE43、MB1、MB2、MB3、MB8、MB15、ZM1、ZM2、ZM3、ZM4、ZM5、ZM6
- **镍钛合金** (14 种): NiTi近等原子比、NiTi超弹性、NiTi高温型、NiTiNb宽滞后、NiTiCu铜改性、NiTiFe铁改性、NiTiCr铬改性、NiTi医用、NiTi航空航天、NiTi线材、NiTi薄板、NiTi高阻尼、NiTi轧制带材
- **贵金属** (5 种): 铂(Pt-99.95)、铱(Ir-99.9)、铂-铱合金(PtIr-90/10)、铂-铱合金(PtIr-95/5)、金(Au-99.99)
- **钴铬合金** (5 种): L605钴铬高温合金、MP35N钴镍铬钼合金、F75铸造钴铬钼合金、F799锻造钴铬钼合金、F1537锻造钴铬镍钼铁合金
- **其他金属**: 304不锈钢、纯钛TA2、TC4钛合金

#### 陶瓷材料 (30 种)
- **氧化物陶瓷** (4 种): 氧化铝、氧化锆、氧化镁、氧化钇稳定氧化锆
- **碳化物陶瓷** (3 种): 碳化硅、碳化硼、碳化钨硬质合金
- **氮化物陶瓷** (11 种): 氮化硅、氮化铝、氮化硼、热压氮化硅、反应烧结氮化硅、气压烧结氮化硅、自增韧氮化硅、Sialon陶瓷、无压烧结氮化硅、氮化硅轴承球、高热导氮化硅
- **硼化物陶瓷** (2 种): 硼化钛、硼化锆
- **硅化物陶瓷** (2 种): 硅化钼、二硅化钽
- **功能陶瓷** (2 种): 钛酸钡压电陶瓷、压电石英陶瓷
- **传统陶瓷** (3 种): 莫来石、堇青石、尖晶石
- **复合陶瓷** (1 种): 氧化铝增韧陶瓷
- **微晶玻璃** (1 种): 锂铝硅陶瓷
- **其他陶瓷** (1 种): 玻璃纤维增强复合材料

#### 聚合物材料 (49 种)
- **通用塑料**: PP聚丙烯、LDPE低密度聚乙烯、HDPE高密度聚乙烯、PVC聚氯乙烯、PS聚苯乙烯、HIPS高抗冲聚苯乙烯、ABS、SAN、ASA、MS、SB
- **聚酰胺**: PA6尼龙6、PA66尼龙66、PA11尼龙11、PA12尼龙12
- **聚碳酸酯**: PC聚碳酸酯
- **聚甲醛**: POM聚甲醛
- **聚酯**: PBT聚对苯二甲酸丁二醇酯、PET聚对苯二甲酸乙二醇酯
- **高性能工程塑料**: PEEK聚醚醚酮、PPS聚苯硫醚、LCP液晶聚合物
- **特种工程塑料**: PSU聚砜、PES聚醚砜、PI聚酰亚胺
- **聚烯烃**: UHMWPE超高分子量聚乙烯、HDPE高密度聚乙烯
- **氟塑料**: PTFE聚四氟乙烯、PFA全氟烷氧基树脂、ETFE乙烯-四氟乙烯共聚物、PVDF聚偏氟乙烯
- **丙烯酸酯**: PMMA聚甲基丙烯酸甲酯
- **聚苯醚**: PPO聚苯醚
- **橡胶/弹性体**: NR天然橡胶、SBR丁苯橡胶、NBR丁腈橡胶、EPDM三元乙丙橡胶、VMQ硅橡胶、FKM氟橡胶、TPU热塑性聚氨酯、TPE热塑性弹性体
- **生物降解高分子**: PLA聚乳酸、PHA聚羟基脂肪酸酯
- **其他聚合物**: 环氧树脂

#### 复合材料 (2 种)
- 碳纤维/环氧树脂复合材料、玻璃纤维/聚酯复合材料

### 数据来源

所有性能数据参考自：
- **MatWeb Database** (https://www.matweb.com)
- **GB/T 国家标准** - 中国钢铁材料标准
- **ASM Handbook** - 材料手册

详细材料信息请查看:
- [METALS_DATA.md](./METALS_DATA.md) - 金属材料详细数据
- [TITANIUM_DATA.md](./TITANIUM_DATA.md) - 钛合金材料详细数据
- [ALUMINUM_DATA.md](./ALUMINUM_DATA.md) - 铝合金材料详细数据
- [CASTING_ALUMINUM_DATA.md](./CASTING_ALUMINUM_DATA.md) - 铸造铝合金材料详细数据
- [COPPER_DATA.md](./COPPER_DATA.md) - 铜合金材料详细数据
- [MAGNESIUM_DATA.md](./MAGNESIUM_DATA.md) - 镁合金材料详细数据
- [NITI_DATA.md](./NITI_DATA.md) - 镍钛合金材料详细数据
- [CERAMICS_DATA.md](./CERAMICS_DATA.md) - 陶瓷材料详细数据
- [SILICON_NITRIDE_DATA.md](./SILICON_NITRIDE_DATA.md) - 氮化硅陶瓷材料详细数据
- [PLASTICS_DATA.md](./PLASTICS_DATA.md) - 工程塑料材料详细数据
- [POLYMERS_DATA.md](./POLYMERS_DATA.md) - 其他高分子材料详细数据
- [GENERAL_PLASTICS_DATA.md](./GENERAL_PLASTICS_DATA.md) - 通用工程塑料材料详细数据

## 使用指南

### 添加新材料

1. 点击"新增材料"按钮
2. 填写材料基本信息（名称、牌号、类别、描述）
3. 点击"创建材料"保存

### 搜索材料

1. 在材料列表页输入搜索关键词
2. 选择材料类别进行筛选
3. 点击"搜索"按钮

### 对比材料

1. 进入"材料对比"页面
2. 选择 2-4 个材料
3. 点击"开始对比"查看性能对比

### 导入数据

1. 下载 CSV 模板
2. 按照模板格式填写材料数据
3. 上传 CSV 文件进行导入

### 导出数据

1. 进入"数据导出"页面
2. 点击"导出所有材料数据"
3. 文件将自动下载

## CSV 导入格式

```csv
材料名称,牌号,类别,描述
6061-T6 铝合金,6061-T6,金属材料,6061铝合金是热处理可强化的铝合金
304 不锈钢,SUS304,金属材料,304不锈钢是最常用的不锈钢型号
```

**注意**：
- 第一行为标题行
- 材料名称和类别为必填项
- 使用逗号分隔各字段
- 支持中文内容

## 后续扩展

### 计划功能
- [ ] 用户认证和权限管理
- [ ] 单位换算系统
- [ ] 数据可视化图表
- [ ] 性能曲线数据存储
- [ ] PostgreSQL 支持
- [ ] REST API 接口
- [ ] 批量编辑功能
- [ ] 数据版本历史

### 数据库迁移到 PostgreSQL

1. 修改 `prisma/schema.prisma`：
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. 配置环境变量 `DATABASE_URL`

3. 运行迁移：
```bash
npm run db:migrate
```

## 常见问题

### 数据库连接失败

确保已经运行 `npm run db:push` 创建数据库。

### Seed 数据为空

运行 `npm run db:seed` 重新填充示例数据。

### 端口被占用

修改 `package.json` 中的 dev 脚本：
```json
"dev": "next dev -p 3001"
```

## 开发命令

```bash
# 开发服务器
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint

# 数据库相关
npm run db:generate    # 生成 Prisma Client
npm run db:push       # 推送 schema 到数据库
npm run db:migrate    # 运行迁移
npm run db:seed       # 填充示例数据
npm run db:studio     # 打开 Prisma Studio
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
