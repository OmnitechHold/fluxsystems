const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');

// Initialize Ajv with strict mode and all errors
const ajv = new Ajv({ 
  allErrors: true, 
  strict: false,
  validateFormats: true
});
addFormats(ajv);

// Load schema and example configurations
const schemaPath = path.join(__dirname, '..', 'schemas', 'package-schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

// Load example configurations
const reactExample = JSON.parse(fs.readFileSync(
  path.join(__dirname, '..', 'schemas', 'examples', 'react-app.json'),
  'utf8'
));
const nodeExample = JSON.parse(fs.readFileSync(
  path.join(__dirname, '..', 'schemas', 'examples', 'node-backend.json'),
  'utf8'
));

// Comprehensive test cases
const testCases = {
  // Valid cases
  validBasic: {
    name: "my-package",
    version: "1.0.0",
    description: "A test package"
  },
  validReactApp: reactExample,
  validNodeBackend: nodeExample,
  validComplexName: {
    name: "@org/my-package",
    version: "1.0.0"
  },
  validVersionRanges: {
    name: "version-test",
    version: "1.0.0",
    dependencies: {
      "package1": "^1.0.0",
      "package2": "~2.0.0",
      "package3": ">=3.0.0 <4.0.0",
      "package4": "*"
    }
  },

  // Invalid cases
  invalidNameUppercase: {
    name: "MyPackage",
    version: "1.0.0"
  },
  invalidNameSpaces: {
    name: "my package",
    version: "1.0.0"
  },
  invalidVersionFormat: {
    name: "test",
    version: "1.a.0"
  },
  invalidSemver: {
    name: "test",
    version: "1.0"
  },
  invalidDependencyVersion: {
    name: "test",
    version: "1.0.0",
    dependencies: {
      "package": "invalid"
    }
  },
  invalidEmail: {
    name: "test",
    version: "1.0.0",
    author: {
      name: "Test",
      email: "invalid-email"
    }
  },
  invalidUrl: {
    name: "test",
    version: "1.0.0",
    homepage: "not-a-url"
  },
  missingRequired: {
    description: "Missing required fields"
  }
};

// Validate schema
const validate = ajv.compile(schema);

// Run validation tests
console.log('Running comprehensive schema validation tests...\n');

// Helper function to format errors
function formatErrors(errors) {
  return errors.map(error => ({
    field: error.instancePath,
    message: error.message,
    value: error.data
  }));
}

// Test results storage
const results = {
  passed: 0,
  failed: 0,
  details: []
};

// Run tests
Object.entries(testCases).forEach(([testName, testData]) => {
  console.log(`\nTesting ${testName}:`);
  const valid = validate(testData);
  
  if (valid) {
    console.log('✓ Valid');
    results.passed++;
  } else {
    console.log('✗ Invalid');
    console.log('Errors:', JSON.stringify(formatErrors(validate.errors), null, 2));
    results.failed++;
  }
  
  results.details.push({
    name: testName,
    valid,
    errors: valid ? null : formatErrors(validate.errors)
  });
});

// Print summary
console.log('\n--- Test Summary ---');
console.log(`Total Tests: ${Object.keys(testCases).length}`);
console.log(`Passed: ${results.passed}`);
console.log(`Failed: ${results.failed}`);

// Check VS Code integration
console.log('\nChecking VS Code integration...');
const settingsPath = path.join(__dirname, '..', '.vscode', 'settings.json');

if (fs.existsSync(settingsPath)) {
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  if (settings.json?.schemas?.length > 0) {
    console.log('✓ JSON schema configuration found in VS Code settings');
  } else {
    console.log('✗ JSON schema configuration missing in VS Code settings');
  }
} else {
  console.log('✗ VS Code settings file not found');
}

// Generate test report
const reportPath = path.join(__dirname, 'test-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
  timestamp: new Date().toISOString(),
  results
}, null, 2));

console.log('\nTest report generated: test-report.json');
console.log('\nValidation test suite complete!');
