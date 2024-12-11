# Package.json Validation Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Schema Features](#schema-features)
3. [Field Validation Rules](#field-validation-rules)
4. [Common Patterns](#common-patterns)
5. [Examples](#examples)
6. [Troubleshooting](#troubleshooting)

## Introduction

This validation system provides comprehensive validation for package.json files with support for:
- Semantic versioning
- Package naming conventions
- Dependency management
- Script definitions
- Configuration validation

## Schema Features

### Core Features
- Real-time validation in VS Code
- Comprehensive error messages
- Auto-completion support
- Documentation on hover
- Format validation for URLs and emails

### Supported Fields
All standard npm package.json fields are supported with additional validation for:
- Custom scripts
- Development configurations
- Testing setups
- Build tools
- Type definitions

## Field Validation Rules

### Package Name
```javascript
// Valid examples
"name": "my-package"
"name": "@org/package-name"
"name": "underscore_package"

// Invalid examples
"name": "My-Package"        // No uppercase
"name": "my package"        // No spaces
"name": "@org/Package"      // No uppercase in scope
```

### Version
```javascript
// Valid examples
"version": "1.0.0"
"version": "1.0.0-beta.1"
"version": "1.0.0+build.123"

// Invalid examples
"version": "1.0"           // Incomplete
"version": "v1.0.0"        // No 'v' prefix
"version": "1.0.0.0"       // Too many segments
```

### Dependencies
```javascript
// Valid examples
"dependencies": {
  "package": "^1.0.0",
  "package": "~1.0.0",
  "package": ">=1.0.0 <2.0.0",
  "package": "*",
  "package": "git+https://github.com/user/repo.git"
}

// Invalid examples
"dependencies": {
  "package": "latest",     // Avoid using 'latest'
  "package": "1.x",        // Use proper semver
  "package": "invalid"     // Not a valid version
}
```

## Common Patterns

### Script Definitions
```javascript
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "jest --coverage",
  "lint": "eslint src/**/*.js",
  "format": "prettier --write src/**/*.js"
}
```

### Browser Compatibility
```javascript
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

## Examples

### React Application
See [examples/react-app.json](./examples/react-app.json) for a complete React application setup.

### Node.js Backend
See [examples/node-backend.json](./examples/node-backend.json) for a complete Node.js backend setup.

## Troubleshooting

### Common Issues

1. Invalid Package Name
   ```
   Error: must match pattern "^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$"
   Solution: Use lowercase letters, hyphens, or underscores
   ```

2. Invalid Version
   ```
   Error: must match pattern "^\\d+\\.\\d+\\.\\d+(?:-[\\w.-]+)?(?:\\+[\\w.-]+)?$"
   Solution: Use semantic versioning (X.Y.Z)
   ```

3. Invalid URL Format
   ```
   Error: must match format "uri"
   Solution: Include protocol (http:// or https://)
   ```

### VS Code Integration

If schema validation isn't working:
1. Check .vscode/settings.json exists
2. Verify schema path is correct
3. Reload VS Code window
4. Clear VS Code cache

### Running Tests

```bash
cd test
npm install
npm test
```

Test results will be saved in test-report.json with detailed error information.
