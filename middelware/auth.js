const jwt = require('jsonwebtoken');
 
module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  
  if(!token) {
    return res.status(401).json({msg: "you don't have permission to access this resource"})
  }
  try {
    const decrypt = jwt.verify(token, process.env.SECRET);
    req.user = decrypt.user;
    next();
  } catch (error) {
    res.status(401).json({msg: 'Invalid Token'})
  }
}