const fs = require('fs');
const path = require('path');

// Check if schema file exists
const schemaPath = path.join(__dirname, 'schemas', 'package-schema.json');
const settingsPath = path.join(__dirname, '.vscode', 'settings.json');

console.log('Checking schema configuration...');

if (fs.existsSync(schemaPath)) {
    console.log('✓ Schema file exists');
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    console.log('✓ Schema is valid JSON');
} else {
    console.log('✗ Schema file not found');
}

if (fs.existsSync(settingsPath)) {
    console.log('✓ VS Code settings file exists');
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    console.log('✓ VS Code settings are valid JSON');
} else {
    console.log('✗ VS Code settings file not found');
}

console.log('\nSchema validation setup complete!');
