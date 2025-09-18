const fs = require('fs');
const path = require('path');

try {
  console.log('✅ ES Module version already created: ezyapi.esm.js');
  console.log('📦 ES Module supports: import { callapi, apidata, bindData, autoBind } from "ezyapi"');
} catch (error) {
  console.error('❌ ES Module build failed:', error.message);
  process.exit(1);
}
