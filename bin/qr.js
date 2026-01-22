#!/usr/bin/env node

import qr from "qr-image";
import fs from "fs";
import { URL } from "url";
import inquirer from "inquirer";

// Extract safe filename (no .com, .in, etc.)
function extractName(url) {
  const parsed = new URL(url);
  return parsed.hostname.split(".")[0];
}

// Generate QR + save files
function generateQR(inputUrl) {
  let name;

  try {
    name = extractName(inputUrl);
  } catch {
    console.error("❌ Invalid URL format");
    process.exit(1);
  }

  const qrImg = qr.image(inputUrl, { type: "png" });
  qrImg.pipe(fs.createWriteStream(`${name}.png`));

  fs.writeFile(`${name}.txt`, inputUrl, (err) => {
    if (err) throw err;
    console.log(`✅ Generated: ${name}.png`);
    console.log(`📄 Saved: ${name}.txt`);
  });
}

// Main logic
const argUrl = process.argv[2];

if (argUrl) {
  // Direct usage: qr <url>
  generateQR(argUrl);
} else {
  // Interactive fallback: qr
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
      }
    ])
    .then((answers) => {
      generateQR(answers.url);
    });
}
