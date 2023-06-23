export default function checkSession(req, res, next) {
  if (!req.session.auth) {
    console.log(req.session.auth);
    res.status(403).send("non autorisé !");
  } else {
    next();
  }
}
