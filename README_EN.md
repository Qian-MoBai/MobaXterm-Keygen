# MobaXterm Keygen

[中文版本](README.md)

MobaXterm Key Generator is a web application based on Vue 3 + TypeScript, used to generate MobaXterm license files.

> ⚠️ Note: This project is for learning and research purposes only. Please use it in compliance with local laws and regulations.

## Features

- Generate MobaXterm license files (.mxtpro)
- Support multiple license types:
  - Personal (Personal Edition)
  - Professional (Professional Edition)
  - Educational (Educational Edition)
- Web-based user interface, no installation required
- Implemented with TypeScript, clear code structure

## Technology Stack

- [Vue 3](https://v3.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Element Plus](https://element-plus.org/)
- [JSZip](https://stuk.github.io/jszip/)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/)

## Usage

1. Select the license type (Personal/Professional/Educational)
2. Enter your username
3. Enter the MobaXterm version number (e.g., 25.2)
4. Enter the number of users
5. Click the "Generate Now" button
6. Download the generated Custom.mxtpro file

## Local Development

### Environment Requirements

- Node.js (version >= 20.19.0 or >= 22.12.0)

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build Production Version

```bash
npm run build
```

## How It Works

This tool generates license files by simulating MobaXterm's license generation algorithm. The main steps include:

1. Constructing the license data string based on user input
2. Encrypting the data using a specific algorithm
3. Base64 encoding the encrypted data
4. Saving the encoded data as a .mxtpro file

## Disclaimer

This project is for educational and research purposes only. Software licenses are intended to support software developers in continuing to develop and maintain software. We recommend purchasing legitimate licenses to support the MobaXterm developers.

By using this tool, you agree that:

1. This tool provides no warranty
2. Any consequences resulting from using this tool are the responsibility of the user
3. The tool developer is not liable for any losses
