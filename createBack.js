const { exec } = require('child_process');
const fs = require('fs/promises');
const { directoriesArray, files } = require('./data');
const { coloredLog, color } = require('./utils/index');

// Create package
const createPackage = () => {
  coloredLog(color.FgBlue, 'Creating package.json');
  const res = new Promise((resolve, reject) => {
    exec('npm init -y', (error, stdout, stderr) => {
      if (error) reject(new Error('Error: ', error));
      if (stderr) console.log('Stderr: ', stderr);

      console.log('package.json was created');
      console.log('Stdout: ', stdout);
      resolve();
    });
  });
  return res;
};

// Install Dependencies
const installDependencies = () => {
  coloredLog(color.FgBlue, 'Installing dependencies');
  const res = new Promise((resolve, reject) => {
    exec(
      'npm install express mysql2 dotenv http-status-codes joi cors jsonwebtoken',
      (error, stdout, stderr) => {
        if (error) reject(new Error('Error: ', error));
        if (stderr) console.log('Stderr: ', stderr);
        console.log('Dependencies have been installed');
        console.log('Stdout: ', stdout);
        resolve();
      }
    );
  });
  return res;
};
// Install DevDependencies
const installDevDependencies = async () => {
  coloredLog(color.FgBlue, 'Installing development dependencies');

  const res = new Promise((resolve, reject) => {
    exec('npm install -D jest eslint nodemon', (error, stdout, stderr) => {
      if (error) reject(new Error('Error: ', error));
      if (stderr) console.log('Stderr: ', stderr);
      console.log('Development dependencies have been installed');
      console.log('Stdout: ', stdout);
      resolve('Dependencias de desenvolvimento instaladas');
    });
  });
  return res;
};
// Create Directories
const createDirectories = async () => {
  coloredLog(color.FgBlue, 'Creating directories');

  for (let dir of directoriesArray) {
    await fs.mkdir(dir, { recursive: true });
  }
  console.log('Directories were created');
};

// Create Files

const createFiles = async () => {
  coloredLog(color.FgBlue, 'Creating files');

  for (let { content, path } of files) {
    await fs.writeFile(path, content);
  }
  console.log('Files were created');
};

const addDevScript = async () => {
  coloredLog(color.FgBlue, 'Add script to start the server');

  const package = await fs.readFile('package.json', 'utf-8');
  const array = JSON.parse(package);
  array.scripts.dev = 'nodemon src/index.js';
  array.scripts.start = 'node src/index.js';
  await fs.writeFile('package.json', JSON.stringify(array, null, 2));
  coloredLog(color.FgBlue, 'Script to start the server has been added');
};

const createBackend = async () => {
  try {
    coloredLog(color.FgBlue, 'Starting the script');
    await createPackage();
    await installDependencies();
    await installDevDependencies();
    await createDirectories();
    await createFiles();
    await addDevScript();
    const str =
      "Don't forget to change the database name in the connection.js file and change the port in the.env file";
    coloredLog(color.FgRed, str);
  } catch (err) {
    console.log('Error: ', err);
  }
};

module.exports = createBackend;
