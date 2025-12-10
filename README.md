# Ariadne - Detective Board (剧本杀线索整理器)

![Status](https://img.shields.io/badge/Status-Active-success)
![Deploy](https://img.shields.io/badge/Deploy-GitHub_Pages-blue)

Ariadne 是一个**沉浸式、现代化**的剧本杀/侦探游戏辅助工具。它摒弃了传统的纸笔记录，通过**可视化的线索墙**和**动态关联图谱**，帮你梳理错综复杂的案情，找出隐藏的真相。

## 核心功能

- **🕵️‍♂️ 嫌疑人档案**：建立嫌疑人名册，支持头像、动机备注，一键标记“已确认的凶手”。
- **🧶 动态关联图谱**：不仅是列表，系统会根据你录入的线索，自动绘制人物与线索之间的红线关系网（Investigation Board）。
- **📜 沉浸式线索流**：时间轴形式记录时间、地点、证据，支持 `@` 快速关联嫌疑人。
- **💾 自动保存**：所有数据实时保存在浏览器本地，刷新不丢失，误关也不怕。
- **📤 案情报告导出**：一键生成 Markdown 格式的完整案情分析报告，方便复盘分享。

---

## 🚀 部署指南 (如何发布给朋友看)

本项目已配置自动化部署。

### 如果你是仓库拥有者：

1. **确认设置**：

   - 进入 GitHub 仓库 -> **Settings** -> **Pages**。
   - 在 **Build and deployment** 下，将 **Source** 选为 **Deploy from a branch**。
   - 将 **Branch** 选为 **`gh-pages`** (如果没有这个分支，请先随意修改一下代码推送到 main，等待几分钟由 Action 自动生成)。
   - 点击 **Save**。

2. **获取链接**：
   - 刷新页面，GitHub 会在顶部显示绿色的访问链接（例如 `https://yourname.github.io/Ariadne/`）。
   - 将此链接发给你的车队队友即可使用！

---

## 🛠️ 本地开发

如果你想在本地修改或运行：

1. **安装依赖**

   ```bash
   npm install
   ```

2. **启动开发服务器**

   ```bash
   npm run dev
   ```

3. **构建生产版本**
   ```bash
   npm run build
   ```

## 技术栈

- **Vue 3** + **Vite** (核心架构)
- **Tailwind CSS** (沉浸式 UI)
- **Pinia** + **VueUse** (状态管理与持久化)
- **SVG / D3** (可视化图谱逻辑)
