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

### CDN (Recommended)
```html
<script src="path/to/ezyapi.js"></script>
```

### Download
Download the `ezyapi.js` file and include it in your project:
```html
<script src="./ezyapi.js"></script>
```

### NPM (if publishing to npm)
```bash
npm install ezyapi
```

## 🚀 Quick Start

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

## 🎮 Interactive Playground

**Try EzyAPI right now!** We've created an interactive playground where you can test the library without any setup:

👉 **[Open playground.html](playground.html)** 👈

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

## 💡 Usage Examples

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
