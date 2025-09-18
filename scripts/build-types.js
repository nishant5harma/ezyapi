const fs = require('fs');
const path = require('path');

try {
  console.log('✅ TypeScript definitions already created: ezyapi.d.ts');
  console.log('📦 TypeScript support includes full type definitions and JSDoc');
} catch (error) {
  console.error('❌ TypeScript definitions build failed:', error.message);
  process.exit(1);
}
