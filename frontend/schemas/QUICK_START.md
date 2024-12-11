# Quick Start Guide

This guide will help you quickly set up and use the package.json validation system.

## Table of Contents
1. [Setup](#setup)
2. [Common Use Cases](#common-use-cases)
3. [Templates](#templates)
4. [Best Practices](#best-practices)

## Setup

1. **Install Dependencies**
   ```bash
   cd test
   npm install
   ```

2. **VS Code Setup**
   - Install recommended extensions:
     - ESLint
     - Prettier
     - npm Intellisense
   - Workspace settings are already configured in `.vscode/settings.json`

3. **Verify Installation**
   ```bash
   npm test
   ```

## Common Use Cases

### 1. Create a New Project

Choose a template based on your needs:

- **React Application**
  ```bash
  cp schemas/examples/react-app.json package.json
  ```

- **Node.js Backend**
  ```bash
  cp schemas/examples/node-backend.json package.json
  ```

- **TypeScript Node.js**
  ```bash
  cp schemas/examples/typescript-node.json package.json
  ```

- **Full-stack Application**
  ```bash
  cp schemas/examples/fullstack-app.json package.json
  ```

### 2. Add New Dependencies

```json
{
  "dependencies": {
    "package-name": "^1.0.0"    // Use caret for flexible updates
  },
  "devDependencies": {
    "dev-package": "~1.0.0"     // Use tilde for patch updates only
  }
}
```

### 3. Add Scripts

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint .",
    "build": "tsc"
  }
}
```

## Templates

### React Application
- TypeScript support
- Material UI setup
- Testing configuration
- Storybook integration
- ESLint + Prettier

### Node.js Backend
- Express setup
- Database integration
- Testing framework
- Logging setup
- Security middleware

### TypeScript Node.js
- Type definitions
- Testing with Jest
- Prisma integration
- Winston logging
- Express with types

### Full-stack Application
- Monorepo setup with Turborepo
- Shared TypeScript config
- Workspace management
- Changesets for versioning
- Unified tooling

## Best Practices

### 1. Version Management
- Use semantic versioning
- Lock file for consistency
- Update dependencies regularly

### 2. Scripts
- Use meaningful names
- Add documentation comments
- Include common operations

### 3. Dependencies
- Regular dependencies for runtime
- devDependencies for development
- peerDependencies for plugins

### 4. TypeScript
- Include type definitions
- Set strict mode
- Configure paths

### 5. Testing
- Configure test runners
- Set coverage thresholds
- Include watch modes

### 6. Linting and Formatting
- ESLint for code quality
- Prettier for formatting
- Pre-commit hooks

## Common Issues

### 1. Invalid Version Format
```json
// Correct
"version": "1.0.0"

// Incorrect
"version": "1.0"
"version": "v1.0.0"
```

### 2. Script Definitions
```json
// Correct
"scripts": {
  "start": "node index.js"
}

// Incorrect
"scripts": {
  "start": ["node", "index.js"]
}
```

### 3. Dependencies
```json
// Correct
"dependencies": {
  "package": "^1.0.0",
  "other-package": "~2.0.0"
}

// Incorrect
"dependencies": {
  "package": "latest",
  "other-package": "1.x"
}
```

## Next Steps

1. Check the [VALIDATION_GUIDE.md](./VALIDATION_GUIDE.md) for detailed rules
2. Review example templates in `schemas/examples/`
3. Run tests to verify your package.json
4. Set up pre-commit hooks for validation

## Need Help?

- Check the test report for detailed error messages
- Review the validation rules in the schema
- Consult the example templates
- Run `npm test` for immediate feedback
