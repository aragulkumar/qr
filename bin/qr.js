#!/usr/bin/env node

import qr from "qr-image";
import fs from "fs";
import { URL } from "url";
import inquirer from "inquirer";

// ---------- Helpers ----------

// Extract smart default name
function extractName(url) {
  const parsed = new URL(url);
  const parts = parsed.hostname.split(".");

  while (["www", "m", "api"].includes(parts[0])) {
    parts.shift();
  }

  return parts[0];
}

// Prevent overwriting files
function getAvailableName(baseName) {
  let name = baseName;
  let counter = 1;

  while (
    fs.existsSync(`${name}.png`) ||
    fs.existsSync(`${name}.txt`)
  ) {
    name = `${baseName}-${counter}`;
    counter++;
  }

  return name;
}

// Generate QR + files
function generateQR(inputUrl, customName) {
  let baseName;

  try {
    baseName = customName || extractName(inputUrl);
  } catch {
    console.error("❌ Invalid URL format");
    process.exit(1);
  }

  const finalName = getAvailableName(baseName);

  const qrImg = qr.image(inputUrl, { type: "png" });
  qrImg.pipe(fs.createWriteStream(`${finalName}.png`));

  fs.writeFile(`${finalName}.txt`, inputUrl, (err) => {
    if (err) throw err;
    console.log(`✅ Generated: ${finalName}.png`);
    console.log(`📄 Saved: ${finalName}.txt`);
  });
}

// ---------- CLI Parsing ----------

const args = process.argv.slice(2);
const urlArg = args.find(arg => !arg.startsWith("--"));

const nameIndex = args.indexOf("--name");
const customName =
  nameIndex !== -1 && args[nameIndex + 1]
    ? args[nameIndex + 1]
    : null;

// ---------- Main Flow ----------

if (urlArg) {
  generateQR(urlArg, customName);
} else {
  inquirer
    .prompt([
      {
        type: "input",
        name: "url",
        message: "Enter the URL:",
        validate(input) {
          try {
            new URL(input);
            return true;
          } catch {
            return "Please enter a valid URL";
          }
        }
      },
      {
        type: "input",
        name: "name",
        message: "Custom name (optional):",
        filter(input) {
          return input.trim() || null;
        }
      }
    ])
    .then((answers) => {
      generateQR(answers.url, answers.name);
    });
}

