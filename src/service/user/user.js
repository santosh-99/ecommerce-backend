import model from "../../repository/index.js";
import { ApplicationError } from "../../utils/applicationError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registration = async (params) => {
  const existingUser = await model.user.findOne({ email: params.email });
  if(existingUser) {
    throw new ApplicationError("User already exists with this email", 400);
  }

  const hasedPassword = await bcrypt.hash(params.password, 12);

  const newUser = await model.user.create({
    name: params.name,
    email: params.email,
    password: hasedPassword,
    type: params.type || "customer",
  });

  const userResponse = newUser.toObject();
  delete userResponse.password;
  return userResponse;
 
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
    { userId: user._id, name: user.name, type: user.type },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      type : user.type
    },
  };
};
