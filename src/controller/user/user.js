import service from "../../service/index.js";

export const register = async (req, res, next) => {
  const body = req.body;
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).send("Empty Body");
  }

  try {
    const user = await service.user.registration(body);
    res.status(201).json({
      message: "User registered",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("req.body", req.body);
  try {
    const { token, user } = await service.user.login(email, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Successfull login",
      userId: user._id,
      name: user.name,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async(req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite:'none'
    });
    res.status(200).json({
        success: true,
        message: "logged out successfully"
    })

  } catch(err) {
    next(err);
  }
}