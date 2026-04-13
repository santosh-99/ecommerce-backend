import model from "../../repository/index.js";
import { ApplicationError } from "../../utils/applicationError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registration = async (params) => {
  const hasedPassword = await bcrypt.hash(params.password, 12);
  const newUser = await model.user.create({
    name: params.name,
    email: params.email,
    password: hasedPassword,
    type: params.type,
  });
  return newUser;
};

export const login = async (email, password) => {
  if (!email || !password) {
    throw new ApplicationError("Email and password are required", 400);
  }

  const user = await model.user.findOne({ email });
  if (!user) {
    throw new ApplicationError("User not exist, please register", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApplicationError("Invalid Credentials", 401);
  }
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return {
    token,
    user: {
      userId: user._id,
      name: user.name,
    },
  };
};
