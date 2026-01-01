const bcrypt = require("bcryptjs");

async function run() {
  const pw = process.argv[2];
  if (!pw) {
    console.log("사용법: node src/scripts/hash.js <password>");
    process.exit(1);
  }
  const hash = await bcrypt.hash(pw, 10);
  console.log(hash);
}

run();
