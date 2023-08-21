var jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (token) {
      let decoded = jwt.verify(token.split(" ")[1], "mock5");

      if (decoded) {
        req.body.authorId = decoded.authorID
        next();
      } else {
        res.status(200).send({ msg: "Wrong person" });
      }
    } else {
      res.status(200).send({ msg: "Token is not valid" });
    }
  } catch (err) {
    res.status(400).send("You are not an authorized person");
  }
};

module.exports = { auth };
