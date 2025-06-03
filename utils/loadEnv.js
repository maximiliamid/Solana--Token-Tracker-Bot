const fs = require("fs");
const path = require("path");

function loadEnvFile(file) {
  if (fs.existsSync(file)) {
    const data = fs.readFileSync(file, "utf8");
    data.split(/\r?\n/).forEach(line => {
        const match = line.match(/^(\w+)=([^\n]*)$/);
      if (match) process.env[match[1]] = match[2];
    });
  }
}

loadEnvFile(path.join(__dirname, "..", ".env"));
loadEnvFile(path.join(__dirname, "..", ".env.example"));

module.exports = {};
