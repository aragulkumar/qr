#!/usr/bin/env node

import qr from "qr-image";
import fs from "fs";
import { URL } from "url";

const inputUrl = process.argv[2];

if (!inputUrl) {
  console.error("❌ Please provide a URL");
  console.log("Usage: qr <url>");
  process.exit(1);
}

function extractName(url) {
  const parsed = new URL(url);
  return parsed.hostname.split(".")[0];
}

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
