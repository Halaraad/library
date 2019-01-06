
function auth (req, res, next) {
    const token = req.headers.authorization;
    if(token){
      try {
        let payload = jwt.verify(token, 'key');
        next();
      } catch (err) {
        res.status(400).send(err);
      }
    }else{
      res.send('you need to login');
    }
  }

  module.exports = auth;
  