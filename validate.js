const fs = require('fs');

try {
  const members = JSON.parse(fs.readFileSync('./members.json', 'utf8'));

  if (!Array.isArray(members)) throw new Error("members.json must be an array");

  const urls = new Set();
  members.forEach((m, i) => {
    if (!m.name || !m.url) {
      throw new Error(`Member at index ${i} is missing name or url.`);
    }
    new URL(m.url);
    
    if (urls.has(m.url)) {
      throw new Error(`Duplicate URL detected: ${m.url}`);
    }
    urls.add(m.url);
  });

  console.log("Validation passed: members.json is looking good.");
} catch (err) {
  console.error("Validation failed:", err.message);
  process.exit(1);
}
