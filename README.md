# 星光剧场 · 亲子选座与互动任务系统

面向家长购票、入场引导和演前互动的 React 单页应用，支持移动端选座与现场大屏幕双模式。

---

## 原始需求

> 请制作儿童剧场亲子选座与互动任务页面，React 页面面向家长购票、入场引导和演前互动，包含舞台视角、亲子座、儿童身高、过道距离、安静区、角色贴纸、中场休息和退改规则。家长在手机上挑座时能判断前排遮挡、是否方便抱娃离场、哪块区域适合小龄儿童；现场屏幕则负责显示互动任务、集合地点、角色提示和迟到入场安排。视觉要有童趣但不幼稚，座位图、任务卡和家长提醒在小屏上要清楚，不能让漂亮插画盖住安全与路线信息。

---

## 项目简介

本项目为儿童剧场打造的一站式亲子观演体验系统，包含 6 大核心页面：

| 页面 | 路由 | 功能说明 |
|------|------|----------|
| 🏠 首页 | `/` | 剧目信息展示 + 快捷入口导航 |
| 🪑 亲子选座 | `/seats` | 舞台视角模拟、遮挡风险、亲子座推荐、安静区、身高适配 |
| 🗺️ 入场引导 | `/guide` | 电子票、入场路线图、集合地点、迟到安排 |
| 🎉 演前互动 | `/interaction` | 任务墙、角色贴纸收集、出场阵容 |
| 🔔 家长提醒 | `/reminders` | 中场休息导览、退改规则、安全礼仪、紧急联系 |
| 📺 现场大屏 | `/screen` | 大字号任务墙、角色提示、迟到入场（适配 1920×1080） |

---

## 技术栈

- **框架**：React 18 + TypeScript 5
- **构建工具**：Vite 6
- **样式方案**：Tailwind CSS 3（珊瑚橙主题系统 + 6 套自定义动画）
- **状态管理**：Zustand 5
- **路由**：React Router DOM 7
- **图标**：Lucide React
- **字体**：ZCOOL KuaiLe（标题） + Noto Sans SC（正文）

---

## 启动方式

### 方式一：Docker 一键启动（推荐）

#### 前置要求

- Docker ≥ 20.10
- Docker Compose ≥ 2.0

#### 启动步骤

```bash
docker compose up --build
```

后台运行：

```bash
docker compose up --build -d
```

停止并清理服务：

```bash
docker compose down
```

**访问地址：** http://localhost:3000

---

### 方式二：本地开发启动

#### 前置要求

- Node.js ≥ 20.0.0
- npm ≥ 9 或 pnpm ≥ 8

#### 启动步骤

##### 1. 安装依赖

```bash
npm install
```

##### 2. 启动开发服务

```bash
npm run dev
```

**访问地址：** Vite 默认启动地址（终端会显示，通常为 http://localhost:5173）

##### 3. 生产构建

```bash
npm run build
```

构建产物输出至 `dist/` 目录。

##### 4. 预览生产构建

```bash
npm run preview
```

---

## 页面导航

| 场景 | 入口 | 说明 |
|------|------|------|
| 家长端首页 | `/` | 剧目封面 + 4 格快捷入口 |
| 选座购票 | `/seats` | 座位图 + 筛选 + 详情卡 + 结算条 |
| 入场导航 | `/guide` | 电子票头 + 路线 SVG 动画 + 集合点 |
| 互动任务 | `/interaction` | 4 个任务卡 + 5 个角色贴纸墙 |
| 家长须知 | `/reminders` | 4 类规则手风琴 + 中场休息时间轴 |
| 现场大屏 | `/screen` | 三 Tab 切换：任务墙 / 角色提示 / 迟到入场 |

---

## 核心功能亮点

### 亲子选座决策辅助

- **舞台视角模拟**：点击座位后，用 clip-path 可视化前排遮挡百分比
- **亲子友好 4 维评估**：视野 / 抱娃离场 / 安静度 / 年龄适配，进度条直观呈现
- **convenienceScore 算法**：综合过道步数、出口距离、区域类型、身高适配，给出 5 星便利度
- **身高预设滑块**：90cm/110cm/130cm/150cm 四档，自动过滤前排遮挡风险座位

### 安全与路线信息优先

- 所有出口、卫生间、紧急通道信息使用高对比纯文字 + 实色边框，不使用半透明模糊
- 大屏迟到入场页面采用橙红渐变全屏警告，3 步流程清晰可见
- 集合地点卡片优先展示设施信息（WC/母婴/小卖部），插画仅作点缀

### 童趣但不幼稚的视觉

- ZCOOL KuaiLe 圆润字体 + 珊瑚橙/薄荷绿/天空蓝柔和三色系统
- emoji 点缀代替卡通插画图片，避免遮挡内容
- 16-32px 大圆角卡片 + 微妙 pulseRing / floatY / bounceSoft 动画
- 座位图支持 0.8x-1.5x 双指缩放 + 滑块调节，保证小屏清晰度

---

## 目录结构

```
src/
├── components/
│   ├── common/          # Header、BottomNav 通用组件
│   ├── seats/           # SeatMap、SeatDetail、FilterDrawer 选座模块
│   ├── guide/           # RouteMap、MeetingPointCard 引导模块
│   ├── interaction/     # TaskCard、StickerWall、BigScreenTasks 互动模块
│   └── reminders/       # IntermissionCard、RuleAccordion 提醒模块
├── data/                # mockSeats、mockTasks、mockGuide Mock 数据
├── pages/               # 6 个路由页面
├── store/               # seatStore、screenStore（Zustand）
├── types/               # 8 个核心 TypeScript 接口定义
├── utils/               # seatUtils 座位推荐与配色算法
├── App.tsx              # 6 个路由配置
└── index.css            # Tailwind 全局 + 自定义组件类
```

---

## 验证说明

### 已完成验证

| 验证项 | 命令 | 结果 |
|--------|------|------|
| TypeScript 类型检查 | `npm run check` | ✅ 通过（0 错误） |
| 生产环境构建 | `npm run build` | ✅ 通过（26KB HTML / 58KB CSS / 527KB JS） |
| Docker Compose 配置 | - | ⚠️ 见下方说明 |

### Docker 验证说明

> ⚠️ **未执行 Docker 构建与启动验证**：当前执行环境无法运行 Docker 守护进程。请在本地执行以下命令验证：
>
> ```bash
> docker compose config   # 配置语法校验
> docker compose up --build
> ```
>
> 如遇问题，请检查本机 Docker 是否已启动，并参考 [Dockerfile](./Dockerfile) 和 [docker-compose.yml](./docker-compose.yml) 中的配置。

---

## 注意事项

- 本项目使用 **BrowserRouter**，部署至非根路径时需调整 nginx.conf 的 `try_files` 和 `base`
- 大屏页面 `/screen` 建议在 1920×1080 分辨率下全屏显示，已内置粒子背景与大字号适配
- 座位 Mock 数据为 8 行 × 14 列（含中间过道），如需真实数据请替换 `src/data/mockSeats.ts`
- 所有安全 / 路线 / 出口信息未使用动效遮挡，符合「安全信息优先级最高」原则

---

© 星光剧场 · 儿童互动体验系统
