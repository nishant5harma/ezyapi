# EzyAPI 🚀

**Making APIs Easy** - A lightweight, zero-dependency JavaScript library that simplifies API calls and DOM data binding.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/dependencies-none-green.svg)](package.json)

## 🌟 Features

- **Simple API Calls**: Easy-to-use functions for making HTTP requests
- **Smart Data Binding**: Automatically bind API responses to DOM elements
- **Framework Agnostic**: Works with vanilla JavaScript and any frontend framework
- **Zero Dependencies**: No external libraries required (works with or without axios)
- **Lightweight**: Minimal footprint, maximum functionality
- **Error Handling**: Built-in error handling and timeout support
- **Flexible**: Supports nested object binding with dot notation

## 📦 Installation

Choose your preferred installation method - EzyAPI supports all modern development environments:

### 🚀 Quick Start (CDN)
**Perfect for:** Static websites, prototypes, quick testing
```html
<!-- Latest version (recommended) -->
<script src="https://cdn.jsdelivr.net/npm/ezyapi@latest/ezyapi.min.js"></script>

<!-- Specific version (production) -->
<script src="https://cdn.jsdelivr.net/npm/ezyapi@1.0.0/ezyapi.min.js"></script>

<!-- Alternative CDN -->
<script src="https://unpkg.com/ezyapi@latest/ezyapi.min.js"></script>
```

### 📦 NPM/Yarn (Modern Projects)
**Perfect for:** React, Vue, Angular, Node.js, TypeScript projects
```bash
# NPM
npm install ezyapi

# Yarn
yarn add ezyapi

# Specific version
npm install ezyapi@1.0.0
```

### 💾 Direct Download
**Perfect for:** Offline development, custom hosting
```html
<!-- Download ezyapi.js from GitHub and include -->
<script src="./js/ezyapi.js"></script>

<!-- Or use minified version -->
<script src="./js/ezyapi.min.js"></script>
```

### ⚡ Framework-Specific Setup

#### React/Next.js
```bash
npm install ezyapi
```
```javascript
import { autoBind, callapi, apidata } from 'ezyapi';
```

#### Vue.js/Nuxt
```bash
npm install ezyapi
```
```javascript
import { callapi, apidata } from 'ezyapi';
```

#### Angular
```bash
npm install ezyapi
```
```typescript
import { callapi, apidata } from 'ezyapi';
```

#### Node.js/Express
```bash
npm install ezyapi
```
```javascript
const { callapi, apidata } = require('ezyapi');
```

## 🚀 Quick Start

### Browser (Script Tag)
```html
<!DOCTYPE html>
<html>
<head>
    <title>EzyAPI Example</title>
</head>
<body>
    <h1>User Profile</h1>
    <p>Name: {name}</p>
    <p>Email: {email}</p>
    <p>City: {address.city}</p>
    
    <script src="ezyapi.js"></script>
    <script>
        // Fetch and automatically bind data to DOM
        autoBind('/api/user/123');
    </script>
</body>
</html>
```

### ES Modules
```javascript
import { autoBind, callapi, apidata, bindData } from 'ezyapi';

// Fetch and automatically bind data to DOM
await autoBind('/api/user/123');

// Or use individual functions
const data = await apidata(callapi('/api/users'));
bindData(data);
```

### Node.js / CommonJS
```javascript
const { autoBind, callapi, apidata, bindData } = require('ezyapi');

// Use in your Node.js application
const userData = await autoBind('/api/user/123');
```

### TypeScript
```typescript
import { autoBind, callapi, ApiOptions, ApiResponse } from 'ezyapi';

interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
    country: string;
  };
}

const options: ApiOptions = {
  method: 'GET',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer your-token'
  }
};

const userData = await autoBind<User>('/api/user/123', undefined, options);
console.log(userData.name); // TypeScript knows this is a string
```

## 🎮 Interactive Playground

**Try EzyAPI right now!** We've created an interactive playground where you can test the library without any setup:

👉 **[Open Interactive Playground](index.html)** 👈

The playground includes:
- 🎯 **Live demos** with real APIs (no setup required)
- 👨‍🎓 **Step-by-step beginner tutorial**
- 🔧 **Custom API testing** - test your own endpoints
- 📄 **Complete code examples** you can copy and use
- 💡 **All placeholder patterns** and pro tips

Perfect for:
- Learning how EzyAPI works
- Testing your APIs quickly
- Understanding data binding patterns
- Getting code examples for your projects

## 📚 API Reference

### `callapi(url, options)`

Makes an HTTP request and returns a Promise with the response.

**Parameters:**
- `url` (string): The API endpoint URL
- `options` (object, optional): Request configuration

**Options:**
- `method` (string): HTTP method (default: 'GET')
- `body` (object): Request body for POST/PUT requests
- `withCredentials` (boolean): Include credentials (default: true)
- `timeout` (number): Request timeout in milliseconds (default: 10000)

**Example:**
```javascript
// GET request
const response = await callapi('/api/users');

// POST request
const newUser = await callapi('/api/users', {
    method: 'POST',
    body: { name: 'John', email: 'john@example.com' }
});
```

### `apidata(promise)`

Extracts the data payload from API responses that follow the `{success: true, data: {...}}` pattern.

**Parameters:**
- `promise` (Promise): The promise returned by `callapi()`

**Returns:** The `data` field if the response has `success: true`, otherwise returns the full response.

**Example:**
```javascript
const users = await apidata(callapi('/api/users'));
console.log(users); // Just the data, not the wrapper
```

### `bindData(data, root)`

Replaces placeholders in the DOM with actual data values.

**Parameters:**
- `data` (object): The data object containing values
- `root` (Element, optional): Root element to search for placeholders (default: document.body)

**Placeholder Syntax:**
- `{propertyName}` - Simple property
- `{object.property}` - Nested property with dot notation
- `{v.propertyName}` - Optional 'v.' prefix

**Example:**
```javascript
const userData = { name: 'Alice', address: { city: 'New York' } };

// HTML: <p>Hello {name} from {address.city}!</p>
bindData(userData);
// Result: <p>Hello Alice from New York!</p>
```

### `autoBind(url, root, options)`

Convenience function that combines `callapi`, `apidata`, and `bindData` in one call.

**Parameters:**
- `url` (string): API endpoint URL
- `root` (Element, optional): Root element for data binding (default: document.body)
- `options` (object, optional): Request options (same as `callapi`)

**Returns:** Promise that resolves to the bound data object

**Example:**
```javascript
// Fetch user data and automatically bind to DOM
const userData = await autoBind('/api/user/123');
```

## 💡 Framework Usage Examples

### React.js
```jsx
import React, { useState, useEffect } from 'react';
import { callapi, apidata, bindData } from 'ezyapi';

// Using with React Hooks
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await apidata(callapi(`/api/users/${userId}`));
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Location: {user.address?.city}</p>
    </div>
  );
}

// Alternative: Using EzyAPI for DOM binding in React
function ProfileCard() {
  const profileRef = useRef();

  useEffect(() => {
    // Bind API data directly to DOM
    autoBind('/api/current-user', profileRef.current);
  }, []);

  return (
    <div ref={profileRef}>
      <h1>{'{name}'}</h1>
      <p>Email: {'{email}'}</p>
      <p>Since: {'{created_at}'}</p>
    </div>
  );
}
```

### Vue.js
```vue
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="user">
      <h1>{{ user.name }}</h1>
      <p>Email: {{ user.email }}</p>
      <p>Location: {{ user.address?.city }}</p>
    </div>
    
    <!-- Alternative: DOM binding approach -->
    <div ref="profileSection">
      <h1>{name}</h1>
      <p>Email: {email}</p>
      <p>Joined: {created_at}</p>
    </div>
  </div>
</template>

<script>
import { callapi, apidata, autoBind } from 'ezyapi';

export default {
  data() {
    return {
      user: null,
      loading: true
    };
  },
  async mounted() {
    try {
      // Method 1: Manual data handling
      this.user = await apidata(callapi('/api/current-user'));
      
      // Method 2: Automatic DOM binding
      await autoBind('/api/current-user', this.$refs.profileSection);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>
```

### Angular
```typescript
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { callapi, apidata, autoBind } from 'ezyapi';

interface User {
  id: number;
  name: string;
  email: string;
  address: { city: string };
}

@Component({
  selector: 'app-user-profile',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="user && !loading">
      <h1>{{ user.name }}</h1>
      <p>Email: {{ user.email }}</p>
      <p>Location: {{ user.address?.city }}</p>
    </div>
    
    <!-- Alternative: DOM binding -->
    <div #profileSection>
      <h1>{name}</h1>
      <p>Email: {email}</p>
      <p>Joined: {created_at}</p>
    </div>
  `
})
export class UserProfileComponent implements OnInit {
  @ViewChild('profileSection') profileSection!: ElementRef;
  
  user: User | null = null;
  loading = true;

  async ngOnInit() {
    try {
      // Method 1: Component data
      this.user = await apidata(callapi<User>('/api/current-user'));
      
      // Method 2: DOM binding
      await autoBind('/api/current-user', this.profileSection.nativeElement);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      this.loading = false;
    }
  }
}
```

### Node.js/Express Backend
```javascript
const express = require('express');
const { callapi, apidata } = require('ezyapi');

const app = express();

// Proxy API endpoint
app.get('/api/users/:id', async (req, res) => {
  try {
    const userData = await apidata(
      callapi(`https://external-api.com/users/${req.params.id}`, {
        headers: {
          'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
      })
    );
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Server-side rendering with EzyAPI
app.get('/profile/:id', async (req, res) => {
  try {
    const user = await apidata(callapi(`/api/users/${req.params.id}`));
    const html = `
      <html>
        <body>
          <h1>${user.name}</h1>
          <p>Email: ${user.email}</p>
          <p>Location: ${user.address.city}</p>
        </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    res.status(500).send('Error loading profile');
  }
});
```

### Next.js (React Framework)
```jsx
// pages/users/[id].js
import { GetServerSideProps } from 'next';
import { callapi, apidata } from 'ezyapi';

export default function UserPage({ user, error }) {
  if (error) return <div>Failed to load user</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Location: {user.address?.city}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const user = await apidata(callapi(`/api/users/${params?.id}`));
    return { props: { user } };
  } catch (error) {
    return { props: { error: 'Failed to fetch user' } };
  }
};

// Alternative: Client-side with DOM binding
export default function ProfilePage() {
  useEffect(() => {
    autoBind('/api/current-user');
  }, []);

  return (
    <div>
      <h1>{'{name}'}</h1>
      <p>Email: {'{email}'}</p>
      <p>Since: {'{created_at}'}</p>
    </div>
  );
}
```

### Svelte
```svelte
<script>
  import { onMount } from 'svelte';
  import { callapi, apidata, autoBind } from 'ezyapi';
  
  let user = null;
  let loading = true;
  let profileSection;

  onMount(async () => {
    try {
      // Method 1: Component data
      user = await apidata(callapi('/api/current-user'));
      
      // Method 2: DOM binding
      await autoBind('/api/current-user', profileSection);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div>Loading...</div>
{:else if user}
  <div>
    <h1>{user.name}</h1>
    <p>Email: {user.email}</p>
    <p>Location: {user.address?.city}</p>
  </div>
{/if}

<!-- Alternative: DOM binding -->
<div bind:this={profileSection}>
  <h1>{'{name}'}</h1>
  <p>Email: {'{email}'}</p>
  <p>Joined: {'{created_at}'}</p>
</div>
```

### jQuery (Legacy Support)
```javascript
$(document).ready(async function() {
  // EzyAPI works perfectly with jQuery
  try {
    const users = await apidata(callapi('/api/users'));
    
    // Manual DOM manipulation
    $('#user-count').text(users.length);
    
    // Or use EzyAPI's binding
    bindData({ count: users.length }, $('#stats')[0]);
    
    // Auto-bind to specific sections
    await autoBind('/api/current-user', $('#profile')[0]);
  } catch (error) {
    $('#error').show().text('Failed to load data');
  }
});
```

## 💡 Vanilla JavaScript Examples

### Basic User Profile Display
```html
<div id="profile">
    <h2>{name}</h2>
    <p>Email: {email}</p>
    <p>Phone: {phone}</p>
    <p>Location: {address.city}, {address.country}</p>
</div>

<script>
autoBind('/api/profile', document.getElementById('profile'));
</script>
```

### Dynamic Product List
```html
<div id="products">
    <h2>Products ({products.length} items)</h2>
    <!-- You would typically loop through products in your templating system -->
</div>

<script>
// Fetch and bind product data
autoBind('/api/products', document.getElementById('products'));
</script>
```

### Error Handling
```javascript
try {
    const data = await autoBind('/api/data');
    if (!data) {
        console.log('No data received');
    }
} catch (error) {
    console.error('Failed to fetch data:', error);
}
```

### Working with Forms
```javascript
// Submit form data
async function submitForm(formData) {
    const response = await callapi('/api/submit', {
        method: 'POST',
        body: formData
    });
    
    const result = await apidata(Promise.resolve(response));
    
    if (result.success) {
        // Bind success message
        bindData({ message: 'Form submitted successfully!' });
    }
}
```

## 🔧 Advanced Features

### Custom Data Transformation

```javascript
// Fetch raw data
const rawResponse = await callapi('/api/complex-data');

// Transform data as needed
const transformedData = {
    ...rawResponse,
    displayName: `${rawResponse.firstName} ${rawResponse.lastName}`,
    fullAddress: `${rawResponse.address.street}, ${rawResponse.address.city}`
};

// Bind transformed data
bindData(transformedData);
```

### Working with Different API Response Formats

```javascript
// For APIs that don't use {success: true, data: {...}} format
const response = await callapi('/api/different-format');
// response is returned as-is, no automatic data extraction

// For standard format APIs
const data = await apidata(callapi('/api/standard-format'));
// automatically extracts the 'data' field
```

## 🤝 Contributing

We welcome contributions! EzyAPI is open source and community-driven.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test your changes**
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Contribution Guidelines

- Keep the library lightweight and dependency-free
- Follow existing code style and conventions
- Add tests for new features
- Update documentation for any API changes
- Ensure backward compatibility

### Areas for Contribution

- 🐛 Bug fixes and improvements
- ✨ New features that align with "making APIs easy"
- 📖 Documentation improvements
- 🧪 Test coverage expansion
- 🌐 Framework-specific integrations
- 💡 Usage examples and tutorials

## 🎯 Our Mission

**Making APIs Easy** - We believe that working with APIs should be simple, intuitive, and accessible to developers of all skill levels. EzyAPI removes the complexity and boilerplate code typically associated with API integration, allowing you to focus on building great applications.

## 📋 Roadmap

- [ ] TypeScript definitions
- [ ] Plugin system for custom data transformers
- [ ] Built-in caching mechanisms
- [ ] WebSocket support
- [ ] React/Vue/Angular specific helpers
- [ ] CLI tools for API testing

## 🔗 Browser Support

EzyAPI works in all modern browsers that support:
- ES6+ features
- Fetch API (or include a polyfill)
- Promises

## 🔒 Production Security & Best Practices

EzyAPI is **production-ready** with built-in security features and follows industry best practices:

### ✅ **Security Features:**

- **XSS Prevention**: Only modifies text nodes, avoiding script injection
- **Input Validation**: Strict regex validation for placeholders
- **Safe Data Binding**: Automatic sanitization of undefined/null values
- **Error Handling**: Graceful fallbacks without exposing sensitive data
- **Timeout Protection**: Built-in request timeouts (10s default)
- **CSP Compatible**: Works with strict Content Security Policies

### 🛡️ **Production Recommendations:**

1. **Server-Side Security:**
   ```javascript
   // Always validate/sanitize data on your backend
   app.use(helmet()); // Use security headers
   app.use(cors({ origin: 'your-domain.com' })); // Restrict CORS
   ```

2. **API Security:**
   ```javascript
   // Use HTTPS and proper authentication
   const data = await callapi('/api/users', {
       headers: {
           'Authorization': 'Bearer ' + token,
           'X-CSRF-Token': csrfToken
       }
   });
   ```

3. **Content Security Policy:**
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; connect-src 'self' https://api.yourdomain.com;">
   ```

4. **Input Validation:**
   ```javascript
   // Validate API responses before binding
   function validateUserData(data) {
       return {
           name: sanitize(data.name),
           email: validateEmail(data.email),
           // ... other validations
       };
   }
   
   const rawData = await apidata(callapi('/api/user'));
   const safeData = validateUserData(rawData);
   bindData(safeData);
   ```

### 🏭 **Enterprise Features:**

- **Zero Dependencies**: No third-party vulnerabilities
- **Lightweight**: <5KB minified, minimal attack surface
- **Framework Agnostic**: Works with any security setup
- **Error Boundary**: Graceful degradation on failures
- **Professional Support**: Enterprise support available via [Webdenn](https://webdenn.com)

### 🔍 **Security Audit:**

EzyAPI has been designed with security-first principles:
- No use of `eval()` or `innerHTML`
- No dynamic script generation
- Minimal DOM manipulation surface
- Proper error boundaries
- Safe string handling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐ Show Your Support

If EzyAPI helps you build better applications, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code
- 📢 Sharing with other developers

---

## 🛠️ Tech Support

**Tech Support by [Webdenn](https://webdenn.com)** - Professional technical support and consulting services available.

For enterprise support, custom integrations, or technical consulting, please contact Webdenn.

---

**Made with ❤️ by the EzyAPI community**

*Let's make APIs easy for everyone!*
