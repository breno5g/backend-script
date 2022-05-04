#!/bin/bash

# Create package

packageJson="{ \n
  \"name\": \"teste\", \n
  \"version\": \"1.0.0\", \n
  \"main\": \"index.js\", \n
  \"license\": \"MIT\", \n
  \"scripts\": { \n
    \"dev\": \"nodemon src/index.js\" \n
  } \n
}"

echo -e $packageJson > package.json

# Install packages
yarn add express mysql2 dotenv http-status-codes joi cors jsonwebtoken
yarn add -D jest eslint nodemon

# Create directories
mkdir -p src/models src/services src/controllers src/middlewares src/routes src/utils

# Create files
touch src/index.js src/models/connection.js

# Populate files

# Database Connection
connection="
  const mysql = require('mysql2/promise');\n
  \n
  const connection = mysql.createPool({ 
    host: 'localhost', 
    user: 'root', 
    password: 'docker', 
    database: 'model_example', 
  });\n
  \n
  module.exports = connection;
"

echo -e $connection > src/models/connection.js

# Set lint
lint="
  {
    \"env\": {
        \"node\": true,
        \"commonjs\": true,
        \"es2021\": true
    },
    \"extends\": \"eslint:recommended\",
  
    \"rules\": {
        \"indent\": [
            \"error\",
            2
        ],
        \"linebreak-style\": [
            \"error\",
            \"unix\"
        ],
        \"quotes\": [
            \"error\",
            \"single\"
        ],
        \"semi\": [
            \"error\",
            \"always\"
        ]
    }
}
"

echo -e $lint > .eslintrc.json

# server index
index="
  const express = require('express'); \n
  \n
  require('dotenv').config(); \n
  \n
  const app = express(); \n
  \n
  app.use(express.json()); \n
  \n
  app.get('/', (_req, res) => {
    return res.status(200).json({message: 3000});
  }); \n
  \n
  const PORT = process.env.PORT || 3000; \n
  \n
  app.listen(PORT, () => {
    console.log('listening on port 3000'); \n
    \n
  });
"

echo -e $index > src/index.js

# Enviroment variables
env="
  PORT: 4000
"

echo -e $env > .env

npx prettier --write --single-quote .