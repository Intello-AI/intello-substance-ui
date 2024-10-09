const fs = require("fs");
const path = require("path");

const componentName = process.argv[2];

if (!componentName) {
  console.error("Please provide a component name");
  process.exit(1);
}

const componentDir = path.join(
  __dirname,
  "..",
  "packages",
  "ui",
  "src",
  "components"
);
const componentPath = path.join(componentDir, `${componentName}.tsx`);

const componentTemplate = `import React from 'react';

interface ${componentName}Props {
  // Define your props here
}

export const ${componentName}: React.FC<${componentName}Props> = (props) => {
  return (
    <div>
      {/* Your component JSX here */}
    </div>
  );
};
`;

fs.writeFileSync(componentPath, componentTemplate);

console.log(`Component ${componentName} created at ${componentPath}`);

// Update index.tsx
const indexPath = path.join(
  __dirname,
  "..",
  "packages",
  "ui",
  "src",
  "index.tsx"
);
const indexContent = fs.readFileSync(indexPath, "utf-8");
const updatedIndexContent =
  indexContent + `\nexport * from './components/${componentName}';`;
fs.writeFileSync(indexPath, updatedIndexContent);

console.log(`Updated ${indexPath} with new component export`);

// Update CLI
const cliIndexPath = path.join(
  __dirname,
  "..",
  "packages",
  "cli",
  "src",
  "index.ts"
);
const cliIndexContent = fs.readFileSync(cliIndexPath, "utf-8");
const updatedCliIndexContent = cliIndexContent.replace(
  "program.parse();",
  `program
  .command('add ${componentName.toLowerCase()}')
  .description('Add ${componentName} component to your project')
  .action(async () => {
    const componentPath = path.join(__dirname, '..', '..', 'ui', 'src', 'components', '${componentName}.tsx');
    const destinationPath = path.join(process.cwd(), 'src', 'components', '${componentName}.tsx');
    await fs.copy(componentPath, destinationPath);
    console.log('Added ${componentName} component to your project.');
  });

program.parse();`
);
fs.writeFileSync(cliIndexPath, updatedCliIndexContent);

console.log(`Updated CLI to include ${componentName} component`);
