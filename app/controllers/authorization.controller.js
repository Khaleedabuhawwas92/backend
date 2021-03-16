const db = require("../models");
const serves = require("../services/serversUser");
const User = db.user;

exports.findUser = async (req, res) => {
   try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
         return res.send("Invalid email OR password1");
      }
      const match = await serves.checkUser(req.body.password, user.password);
      if (!match) {
         return res.send("Invalid email OR password2");
      }
      const token = user.token();
      const newToken = (user.auth = token);
      user.save(newToken);
      res.send("token is" + "  " + token);
   } catch (error) {
      console.log(error);
   }
};
