const { users } = require("./mock-users");

const authenticate = (req) => {
  let auth = false;
  const base64Credentials = req.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");
  const [username, password] = credentials.split(":");
  auth = users.some((user) => {
    return user.username === username && user.password === password;
  });
  return auth;
};

module.exports = authenticate;
