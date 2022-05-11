const color = {
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
  end: '\x1b[0m%s',
};

const coloredLog = (color, str) => {
  console.log(`${color}${str}`);
  console.log('\x1b[0m');
};

module.exports = {
  color,
  coloredLog,
};