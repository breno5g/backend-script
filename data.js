const directoriesArray = [
  'src/models',
  'src/services',
  'src/controllers',
  'src/middlewares',
  'src/routes',
  'src/utils',
  'src/tests',
];

const files = [
  {
    content: `const mysql = require('mysql2/promise');
    
const connection = mysql.createPool({ 
  host: 'localhost', 
  user: 'root', 
  password: 'docker', 
  database: 'insert_your_database_here', 
});

module.exports = connection;
    `,
    path: 'src/models/connection.js',
  },
  {
    content: `const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  return res.status(200).json({message: 3000});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('O pai tá on');
});
    `,
    path: 'src/index.js',
  },
  {
    content: 'PORT: 3000',
    path: '.env',
  },
  {
    content: '',
    path: 'src/services/index.js',
  },
  {
    content: '',
    path: 'src/routes/index.js',
  },
  {
    content: '',
    path: 'src/utils/index.js',
  },
  {
    content: '',
    path: 'src/middlewares/index.js',
  },
  {
    content: '',
    path: 'src/utils/index.js',
  },
  {
    content: '',
    path: 'src/controllers/index.js',
  },
  {
    content: '',
    path: 'src/models/index.js',
  },
  {
    content: '',
    path: 'src/tests/index.js',
  },
  {
    content: `{
  "env": { "node": true, "commonjs": true, "es2021": true },
  "extends": "eslint:recommended",
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
    `,
    path: '.eslintrc.json',
  },
  {
    content: '/src/tests',
    path: '.eslintignore',
  },
];

module.exports = {
  files,
  directoriesArray,
};
