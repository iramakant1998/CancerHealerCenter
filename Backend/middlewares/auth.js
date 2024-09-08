const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");


exports.protect = asyncHandler(async (req, res, next) => {
  // get token //
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // decode the token //
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const id = decoded.id
      req.id=id
      const user = await User.findById(id)
      req.user = user
      next()
    } catch (err) {
      res.status(401).json({
        sucess: false,
        massage: "Not Authorized, Token Failed",
      })
      throw new Error("Not Authorized, Token Failed")
    }
  }

  if (!token) {
    res.status(401).json({
      sucess: false,
      massage: "Not Authorized To Access This Route",
    })
    throw new Error("Not Authorized To Access This Route")
  }
})

exports.authRole = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user; // Assuming the user information is stored in req.user
    
    // Check if the user's role matches any of the allowed roles or is a Supervisor
    if (user.role === 'SUPERVISOR' || allowedRoles.includes(user.role)) {
      // User has the required role or is a Supervisor, proceed to the next middleware
      console.log('Starting')
      next();
    } else {
      // User doesn't have the required role, send forbidden response
      res.status(403).json({ error: 'Access Denied' });
    }
  };
};

// Grant access to specific roles //
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User Role ${req.user.role} Is Not Authorized To Access This Route`,
          403
        )
      )
    }
    next()
  }
}

// export const checkUserRole = (requiredRole) => {
//   return (req, res, next) => {
//     const user = req.user; // Assuming you set the user object in the request during authentication
//     console.log(user)
//     if (user && user.role === requiredRole) {
//       // User has the required role, proceed to the next middleware
//       next();
//     } else {
//       // User doesn't have the required role, send forbidden response
//       res.status(403).json({ error: 'Access denied.' });
//     }
//   };
// };