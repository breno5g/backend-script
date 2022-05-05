const { exec } = require('child_process');
const fs = require('fs/promises');
const { directoriesArray, files } = require('./data');

// Create package
const createPackage = () => {
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
  for (let dir of directoriesArray) {
    await fs.mkdir(dir, { recursive: true });
  }
  console.log('Directories were created');
};

// Create Files

const createFiles = async () => {
  for (let { content, path } of files) {
    await fs.writeFile(path, content);
  }
  console.log('Files were created');
};

const addDevScript = async () => {
  const package = await fs.readFile('package.json', 'utf-8');
  const array = JSON.parse(package);
  array.scripts.dev = 'nodemon src/index.js';
  await fs.writeFile('package.json', JSON.stringify(array, null, 2));
  console.log('Script to start the server has been added');
};

const createBackend = async () => {
  try {
    await createPackage();
    await installDependencies();
    await installDevDependencies();
    await createDirectories();
    await createFiles();
    await addDevScript();
    console.log(
      "Don't forget to change the database name in the connection.js file and change the port in the.env file"
    );
  } catch (err) {
    console.log('Error: ', err);
  }
};

module.exports = createBackend;
