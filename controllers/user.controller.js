import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@desc register the user
//@route GET /api/users/register
//@access public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const providedPasswordString = String(password);
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  // console.log("the password to register is:", password);

  //hash password
  const hashedPassword = await bcrypt.hash(providedPasswordString, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // console.log("hashed password is :", hashedPassword);
  if (user) {
    res
      .status(200)
      .json({ _id: user.id, username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("User details were not valid");
  }
};

//@desc login the user
//@route GET /api/users/login
//@access public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // ⭐ THIS IS THE CRUCIAL PART: Convert to string IMMEDIATELY
  const providedPasswordString = String(password);

  if (!email || !providedPasswordString) {
    // Check for providedPasswordString now
    res.status(400);
    return next(new Error("All fields are mandatory"));
  }

  // console.log("Attempting to log in with email:", email);
  const user = await User.findOne({ email });

  // console.log("User found:", user);

  // Now, the logs should show 'string' for provided password type
  // console.log(
  //   "Type of provided password:",
  //   typeof providedPasswordString,
  //   "Value:",
  //   providedPasswordString
  // );
  // console.log(
  //   "Type of stored password:",
  //   typeof user?.password,
  //   "Value:",
  //   user?.password
  // );

  if (user) {
    // Only proceed if a user is found
    // The comparison will now use two strings
    const passwordsMatch = await bcrypt.compare(
      providedPasswordString,
      user.password
    );
    // console.log("Passwords match:", passwordsMatch);

    if (passwordsMatch) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" }
      );
      res.status(200).json({ accessToken });
    }
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
  // res.send("user login");
};

//@desc get the current user info
//@route GET /api/users/current
//@access private
const currentUser = async (req, res) => {
  res.json(req.user);
  console.log(req.user);
};

export { registerUser, loginUser, currentUser };
