# Publishing EzyAPI to NPM

This guide explains how to publish EzyAPI to NPM so anyone can install and use it.

## Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com)
2. **NPM CLI**: Install via `npm install -g npm`
3. **Login**: Run `npm login` and enter your credentials

## Publishing Steps

### 1. Prepare the Package
```bash
# Build all distribution files
npm run build

# Verify package contents
npm pack --dry-run
```

### 2. Version Management
```bash
# For first release
npm version 1.0.0

# For patch updates (bug fixes)
npm version patch

# For minor updates (new features)
npm version minor

# For major updates (breaking changes)
npm version major
```

### 3. Publish to NPM
```bash
# Publish public package
npm publish

# For scoped packages (optional)
npm publish --access public
```

### 4. Verify Publication
```bash
# Check package info
npm info ezyapi

# Test installation
npm install ezyapi
```

## Package Structure

The NPM package includes:
- `ezyapi.js` - Main UMD build for browsers
- `ezyapi.esm.js` - ES Module build 
- `ezyapi.min.js` - Minified version
- `ezyapi.d.ts` - TypeScript definitions
- `README.md` - Complete documentation
- `LICENSE` - MIT license
- `CHANGELOG.md` - Version history

## Installation Methods

Users can install EzyAPI in multiple ways:

### NPM
```bash
npm install ezyapi
```

### Yarn
```bash
yarn add ezyapi
```

### CDN (jsDelivr)
```html
<script src="https://cdn.jsdelivr.net/npm/ezyapi@latest/ezyapi.min.js"></script>
```

### CDN (unpkg)
```html
<script src="https://unpkg.com/ezyapi@latest/ezyapi.min.js"></script>
```

## Usage Examples

### ES Modules
```javascript
import { autoBind, callapi } from 'ezyapi';
await autoBind('/api/data');
```

### CommonJS
```javascript
const { autoBind } = require('ezyapi');
await autoBind('/api/data');
```

### Browser Script Tag
```html
<script src="ezyapi.js"></script>
<script>autoBind('/api/data');</script>
```

## Continuous Deployment

For automated publishing, add to `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Maintenance

### Regular Tasks
1. Monitor [GitHub issues](https://github.com/webdenn/ezyapi/issues)
2. Update dependencies (though EzyAPI has zero dependencies!)
3. Release security patches promptly
4. Update documentation as needed
5. Respond to community feedback

### Version Strategy
- **Patch** (1.0.x): Bug fixes, security updates
- **Minor** (1.x.0): New features, enhancements
- **Major** (x.0.0): Breaking changes (avoid when possible)

## Support

- **Community**: GitHub Issues and Discussions
- **Enterprise**: Professional support via [Webdenn](https://webdenn.com)
- **Documentation**: Complete guides in README.md
