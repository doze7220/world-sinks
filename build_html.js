const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('index.html', 'utf-8');
const bundleJs = fs.readFileSync('bundle.js', 'utf-8');

// <script type="module"> から </script> までを削除
let html = indexHtml.replace(/<script type="module">[\s\S]*?<\/script>/g, '');

// </body> の前に bundled JS を挿入
html = html.replace('</body>', `<script>\n${bundleJs}\n</script>\n</body>`);

const outDir = path.join(__dirname, 'artifacts');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const vFile = fs.readFileSync('meta/version.js', 'utf-8');
const vMatch = vFile.match(/VERSION = "(.*)"/);
const version = vMatch ? vMatch[1] : 'v0.5.0';

const outFile = path.join(outDir, `worldsinks_${version}.html`);
fs.writeFileSync(outFile, html, 'utf-8');
fs.writeFileSync('worldsinks.html', html, 'utf-8');
console.log('Successfully written to ' + outFile + ' and worldsinks.html');
