# MobaXterm Keygen

MobaXterm 注册码生成器是一个基于 Vue 3 + TypeScript 的网页应用程序，用于生成 MobaXterm 的许可证文件。

> ⚠️ 注意：本项目仅供学习和研究用途，请在遵守当地法律法规的前提下使用。

## 功能特点

- 生成 MobaXterm 的许可证文件（.mxtpro）
- 支持多种许可证类型：
  - Personal（个人版）
  - Professional（专业版）
  - Educational（教育版）
- 基于 Web 的用户界面，无需安装即可使用
- 使用 TypeScript 实现，代码结构清晰

## 技术栈

- [Vue 3](https://v3.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Element Plus](https://element-plus.org/)
- [JSZip](https://stuk.github.io/jszip/)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/)

## 使用方法

1. 选择许可证类型（个人版/专业版/教育版）
2. 输入用户名
3. 输入 MobaXterm 版本号（格式如：25.2）
4. 输入用户数
5. 点击"立即生成"按钮
6. 下载生成的 Custom.mxtpro 文件

## 本地开发

### 环境要求

- Node.js (版本 >= 20.19.0 或 >= 22.12.0)

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 工作原理

该工具通过模拟 MobaXterm 的许可证生成算法来创建许可证文件。主要步骤包括：

1. 根据用户输入的信息构建许可证数据字符串
2. 使用特定算法对数据进行加密
3. 对加密后的数据进行 Base64 编码
4. 将编码后的数据保存为 .mxtpro 文件

## 免责声明

本项目仅用于教育和研究目的。软件许可证是为了支持软件开发者继续开发和维护软件。建议您购买正版许可证以支持 MobaXterm 的开发者。

使用本工具即表示您理解并同意：

1. 本工具不提供任何担保
2. 使用本工具产生的任何后果由使用者自行承担
3. 本工具开发者不对任何损失负责
