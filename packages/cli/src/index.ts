#!/usr/bin/env node

import { program } from "commander";
import fs from "fs-extra";
import path from "path";

program
  .name("intello-substance-ui")
  .description("CLI for Intello Substance UI components")
  .version("0.0.1");

program
  .command("add <component>")
  .description("Add a component to your project")
  .action(async (component) => {
    const componentPath = path.join(
      __dirname,
      "..",
      "..",
      "ui",
      "src",
      "components",
      `${component}.tsx`
    );
    const destinationPath = path.join(
      process.cwd(),
      "src",
      "components",
      `${component}.tsx`
    );

    if (await fs.pathExists(componentPath)) {
      await fs.copy(componentPath, destinationPath);
      console.log(`Added ${component} component to your project.`);
    } else {
      console.error(`Component ${component} not found.`);
    }
  });

program
  .command('add dialog')
  .description('Add Dialog component to your project')
  .action(async () => {
    const componentPath = path.join(__dirname, '..', '..', 'ui', 'src', 'components', 'Dialog.tsx');
    const destinationPath = path.join(process.cwd(), 'src', 'components', 'Dialog.tsx');
    await fs.copy(componentPath, destinationPath);
    console.log('Added Dialog component to your project.');
  });

program.parse();
