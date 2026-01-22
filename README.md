# QR

A minimal, interactive QR code generator that converts URLs into QR codes directly from your terminal.

No more opening QR websites, pasting links, downloading images, and dealing with ads.  
Just run `qr` and generate your QR code locally — instantly.

Works on **macOS**, **Linux**, and **Windows**.

## Overview

`qr` is a lightweight CLI tool that helps you generate QR codes from URLs with a single command.

It supports:

- Direct command-line usage
- Interactive mode for beginners
- Smart file naming
- Automatic overwrite protection
- Custom output names for power users

Built to be fast, simple, and developer-friendly.

## Installation

### Using npx (recommended – no install)
```bash
npx @aragulkumar/qr https://google.com
```

### Install globally
```bash
npm install -g @aragulkumar/qr
```

Then run:
```bash
qr https://google.com
```

### From source
```bash
git clone https://github.com/aragulkumar/qr.git
cd qr
npm install
npm link
```

## Usage

### Basic usage
```bash
qr https://google.com
```

Generates:
```
google.png
google.txt
```

### Custom file name
```bash
qr https://youtube.com/watch?v=A --name homebrew-search
```

Generates:
```
homebrew-search.png
homebrew-search.txt
```

### Interactive mode
```bash
qr
```

You'll be prompted for:
- URL
- Optional custom file name

### Overwrite Protection

Running the same command multiple times will never overwrite existing files.

**Example:**
```bash
qr https://google.com
qr https://google.com
```

**Output:**
```
google.png
google-1.png
```

## Contributing

Contributions are welcome!

 - Fork the repository
 - Create a branch: 
`git checkout -b contribution/feature-name`
 -  Commit your changes: 
`git commit -m "add feature-name"`
 - Push to your branch: 
`git push origin contribution/feature-name`
 - Open a pull request

Please keep changes focused and well-documented.

## Security

- Runs completely offline
- No external API calls
- No tracking or analytics
- Your URLs never leave your system

## License

This project is licensed under the [GPL-3.0 License](LICENSE).

---

**Made by [Ragul Kumar A](https://github.com/aragulkumar)**

Built as part of my journey learning Node.js, CLI tooling, and developer-focused UX.

[![GitHub](https://img.shields.io/badge/GitHub-@aragulkumar-blue?logo=github)](https://github.com/aragulkumar)
[![npm](https://img.shields.io/badge/npm-%40aragulkumar%2Fqr-green?logo=npm)](https://www.npmjs.com/package/@aragulkumar/qr)

If this project helped you, feel free to ⭐ the repository.