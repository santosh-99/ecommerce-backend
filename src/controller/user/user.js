import service from "../../service/index.js";

export const register = async (req, res, next) => {
 
  try {
    const user = await service.user.registration(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await service.user.login(email, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login Successfull",
      user 
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async(req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
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
