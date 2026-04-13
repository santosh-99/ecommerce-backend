import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {

  const token = req.cookies.token;

  if (!token) {
      res.locals.user = null;
     return res.status(400).send("Unauthorized")
    }

  try {
    
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;
    res.locals.user = decode;

    next();
  } catch (err) {
    res.clearCookie("token");
    req.user = null;
    next();
  }
};

export default jwtMiddleware;
