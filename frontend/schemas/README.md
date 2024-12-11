# Package.json Schema Documentation

This document provides comprehensive documentation for the package.json schema validation rules.

## Schema Overview

The schema provides validation for all standard package.json fields with additional custom validations for enhanced reliability.

## Field Descriptions

### Required Fields

- `name`: Package name
  - Must be lowercase
  - Can include hyphens and underscores
  - Can include scope (e.g., @org/package-name)
  - Pattern: `^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$`

- `version`: Package version
  - Must follow semantic versioning
  - Pattern: `^\\d+\\.\\d+\\.\\d+(?:-[\\w.-]+)?(?:\\+[\\w.-]+)?$`
  - Examples: "1.0.0", "1.0.0-beta.1"

### Optional Fields

#### Basic Information
- `description`: Package description
- `keywords`: Array of keywords
- `homepage`: Package homepage URL
- `bugs`: Issue tracker information
  - Can be string (URL) or object with `url` and `email`
- `license`: Package license

#### Dependencies
- `dependencies`: Production dependencies
- `devDependencies`: Development dependencies
- `peerDependencies`: Peer dependencies
  - All dependencies support:
    - Semantic version ranges (^1.0.0, ~1.0.0)
    - URLs (git://, https://)
    - Local paths (file:)
    - Wildcards (*)

#### Scripts
- `scripts`: npm scripts
  - Common scripts: "start", "build", "test", "eject"
  - Custom scripts supported

#### Configuration
- `engines`: Node.js and npm version requirements
- `browserslist`: Target browsers configuration
- `eslintConfig`: ESLint configuration
- `proxy`: Development proxy settings

#### Package Content
- `main`: Entry point file
- `types`: TypeScript types definition
- `files`: Files to include in package

## VS Code Integration

The schema is configured in VS Code to provide:
- Real-time validation
- IntelliSense suggestions
- Hover documentation
- Error highlighting

## Testing

Run the validation tests:
```bash
npm install ajv ajv-formats
node test/schema-validator.js
```

## Common Issues and Solutions

1. Invalid package name
   - Ensure lowercase
   - Use hyphens instead of spaces
   - Start with letter/number

2. Invalid version
   - Follow semantic versioning (X.Y.Z)
   - Optional prerelease (-alpha.1)
   - Optional build metadata (+001)

3. Invalid URLs
   - Must be properly formatted
   - Must include protocol (http://, https://)

4. Invalid dependency versions
   - Use semantic versioning
   - Use proper range operators (^, ~, >, <)

## Best Practices

1. Version Management
   - Use semantic versioning
   - Use caret (^) for flexible updates
   - Use tilde (~) for patch updates only

2. Dependencies
   - Regular dependencies for runtime
   - devDependencies for development
   - peerDependencies for plugins

3. Scripts
   - Include standard scripts (start, test)
   - Document custom scripts
   - Use pre/post hooks when needed
