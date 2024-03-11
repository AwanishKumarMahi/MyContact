const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.header.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      res.status(404);
      throw new Error("Token not found/generated");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorised");
      }

      req.user = decoded.user;
      next(); //next is use to move to next controller in get() i.e. here currentUser
    });
  } else {
    res.status(401);
    throw new Error("Unauthorize User");
  }
});

module.exports = validateToken;
