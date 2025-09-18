# EzyAPI Installation & Usage Guide

## 📦 Installation

### Option 1: NPM (Recommended)
```bash
npm install ezyapi
```

### Option 2: Yarn
```bash
yarn add ezyapi
```

### Option 3: CDN
```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/ezyapi@latest/ezyapi.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/ezyapi@1.0.0/ezyapi.min.js"></script>
```

## 🚀 Usage Examples

### 1. ES Modules (Modern JavaScript)
```javascript
import { autoBind, callapi, apidata, bindData } from 'ezyapi';

// Simple usage
await autoBind('/api/user/123');

// Advanced usage
const response = await callapi('/api/users', {
  method: 'POST',
  body: { name: 'John', email: 'john@example.com' }
});
const data = await apidata(Promise.resolve(response));
bindData(data);
```

### 2. CommonJS (Node.js)
```javascript
const { autoBind, callapi, apidata, bindData } = require('ezyapi');

async function fetchUserData() {
  const userData = await autoBind('/api/user/123');
  console.log('User data loaded:', userData);
}
```

### 3. Browser Script Tag
```html
<!DOCTYPE html>
<html>
<head>
    <title>EzyAPI Example</title>
</head>
<body>
    <div id="user-profile">
        <h1>{name}</h1>
        <p>Email: {email}</p>
        <p>Location: {address.city}</p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/ezyapi@latest/ezyapi.min.js"></script>
    <script>
        // Load user data and bind to DOM
        autoBind('/api/user/123', document.getElementById('user-profile'));
    </script>
</body>
</html>
```

### 4. TypeScript
```typescript
import { autoBind, callapi, ApiOptions } from 'ezyapi';

interface User {
  id: number;
  name: string;
  email: string;
}

const options: ApiOptions = {
  method: 'GET',
  timeout: 5000
};

const userData = await autoBind<User>('/api/user/123', undefined, options);
console.log(userData.name); // TypeScript knows this is a string
```

## 🎯 Key Features

### Zero Dependencies
- No external libraries required
- Works with or without Axios
- Pure JavaScript implementation

### Framework Agnostic
```javascript
// Works with React
import { useEffect, useState } from 'react';
import { callapi, apidata } from 'ezyapi';

function UserComponent() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    apidata(callapi('/api/user')).then(setUser);
  }, []);
  
  return <div>{user?.name}</div>;
}

// Works with Vue
import { callapi, apidata } from 'ezyapi';

export default {
  async mounted() {
    this.user = await apidata(callapi('/api/user'));
  }
}

// Works with Angular
import { callapi, apidata } from 'ezyapi';

@Component({...})
export class UserComponent {
  async ngOnInit() {
    this.user = await apidata(callapi('/api/user'));
  }
}
```

### Secure by Default
- XSS prevention built-in
- Input validation
- No dangerous functions used
- Content Security Policy compatible

## 📚 Complete API Reference

### `callapi(url, options)`
Makes HTTP requests with automatic error handling.

### `apidata(promise)`
Extracts data from standardized API responses.

### `bindData(data, root)`
Binds data to DOM using placeholder syntax.

### `autoBind(url, root, options)`
One-line solution combining all functions.

## 🔗 Resources

- **Documentation**: Complete guide in [README.md](README.md)
- **Playground**: Interactive demo in [index.html](index.html)
- **TypeScript**: Full type definitions included
- **Support**: Enterprise support via [Webdenn](https://webdenn.com)

## 📈 Package Stats

- **Size**: 4.5KB (2.2KB minified)
- **Dependencies**: 0
- **Browser Support**: All modern browsers
- **Node.js**: 12.0.0+

## 🚀 Quick Test

After installation, test EzyAPI quickly:

```javascript
import { callapi } from 'ezyapi';

// Test with a public API
callapi('https://jsonplaceholder.typicode.com/users/1')
  .then(data => console.log('EzyAPI works!', data))
  .catch(err => console.error('Error:', err));
```

**Ready to make APIs easy!** 🎉
