import jwt from "jsonwebtoken";

const generateAuthToken = (userId, secret) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: "24h" });
};

export default generateAuthToken;
