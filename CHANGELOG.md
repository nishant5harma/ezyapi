# Changelog

All notable changes to EzyAPI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-09-18

### Added
- Initial release of EzyAPI
- Core API functions: `callapi`, `apidata`, `bindData`, `autoBind`
- Zero-dependency implementation
- Support for both axios and native fetch
- Secure DOM data binding with XSS prevention
- TypeScript definitions
- ES Module support
- Interactive playground and comprehensive documentation
- Production-ready security features
- Error handling and timeout protection
- Support for nested object placeholders with dot notation
- Professional documentation and examples

### Security
- XSS prevention through text-only DOM manipulation
- Input validation with strict regex patterns
- Safe handling of undefined/null values
- No use of dangerous functions like `eval()` or `innerHTML`
- Content Security Policy compatibility
- Built-in request timeouts and error boundaries

### Features
- Framework agnostic - works with any frontend framework
- Lightweight - under 5KB minified
- Smart data binding with placeholder replacement
- Automatic credential handling
- Graceful error handling
- Professional support available via Webdenn
