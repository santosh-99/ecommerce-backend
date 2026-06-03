import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.user = null;
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized: Invalid or expired token.",
      });
  }
};

export default jwtMiddleware;
