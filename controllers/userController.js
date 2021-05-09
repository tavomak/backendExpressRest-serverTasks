const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  // console.log('From UserController', req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Revisar que ek usuario sea unico
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already in use" });
    }
    // crear usuario
    user = new User(req.body);

    // Hashear pass
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    // guardar usuario
    await user.save();

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
    res.status(400).json({ msg: "Opps, an error has occured" });
  }
};
