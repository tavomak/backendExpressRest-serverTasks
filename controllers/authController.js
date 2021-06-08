const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  // console.log("From UserController", req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }

    // Verificar password
    const CorrectPassword = await bcryptjs.compare(password, user.password);

    if (!CorrectPassword) {
      return res.status(400).json({ msg: "Wrong Password" });
    }

    // Crear JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Firmar JWT
    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: "24h" },
      (error, token) => {
        if (error) {
          throw new Error(error);
        }

        // mensaje de confirmaci'on
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
