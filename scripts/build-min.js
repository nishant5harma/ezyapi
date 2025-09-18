const fs = require('fs');
const path = require('path');

// Simple minifier for EzyAPI
function minify(code) {
  return code
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove spaces around operators
    .replace(/\s*([{}();,=+\-*/<>!&|])\s*/g, '$1')
    // Remove trailing whitespace
    .replace(/^\s+|\s+$/gm, '')
    // Join lines
    .replace(/\n\s*/g, '');
}

try {
  const sourceFile = path.join(__dirname, '..', 'ezyapi.js');
  const outputFile = path.join(__dirname, '..', 'ezyapi.min.js');
  
  const sourceCode = fs.readFileSync(sourceFile, 'utf8');
  const minifiedCode = minify(sourceCode);
  
  const header = `/*! EzyAPI v1.0.0 | MIT License | Making APIs Easy */\n`;
  
  fs.writeFileSync(outputFile, header + minifiedCode);
  
  const originalSize = sourceCode.length;
  const minifiedSize = minifiedCode.length;
  const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
  
  console.log(`✅ Minified: ${originalSize} → ${minifiedSize} bytes (${reduction}% reduction)`);
  console.log(`📦 Created: ezyapi.min.js`);
} catch (error) {
  console.error('❌ Minification failed:', error.message);
  process.exit(1);
}
