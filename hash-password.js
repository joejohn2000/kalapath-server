// test-hash.js
const bcrypt = require("bcryptjs");

const inputPassword = "joe@123"; // 🔁 replace with the plain password
const hashedPassword =
  "$2a$10$IGLGAkWnjr0miZyQojPOTuYlcsGbwoifuQlJFU8WNNFneMbwOU9FG"; // 🔁 replace with the hash from DB

bcrypt.compare(inputPassword, hashedPassword).then((result) => {
  console.log("Password Match:", result); // should log true
});
