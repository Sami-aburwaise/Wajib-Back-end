const bcrypt = require('bcrypt')

const comparePassword = async (storedPassword, password) => {
  //This compares the storedPassword with the password a client provides when logging in
  console.log(storedPassword, password)
  let matchedPassword = await bcrypt.compare(password, storedPassword)
  console.log(matchedPassword)
  return matchedPassword
}

module.exports = {
  comparePassword
}
