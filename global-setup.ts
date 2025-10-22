import fs from 'fs-extra';

async function globalSetup() {
  const artifactsDir = '.artifacts';
  // Remove the folder if it exists
  if (await fs.pathExists(artifactsDir)) {
    await fs.remove(artifactsDir);
    console.log(`Deleted ${artifactsDir} folder before test run.`);
  }
  // Always create fresh .artifacts directory
  await fs.ensureDir(artifactsDir);
  console.log(`Ensured ${artifactsDir} folder exists for test run.`);
}

export default globalSetup;
