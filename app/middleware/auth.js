const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
   const token = req.header("x-auth-token");
   if (!token) {
      res.send("rejected ......");
   }
   try {
      const decoded = jwt.verify(token, "privet");
      req.user = decoded;
      next();
   } catch (error) {
      res.status(400).send("worng token .....");
   }
};
