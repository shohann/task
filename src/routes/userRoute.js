const router = require('express').Router();
const { authorize } = require('../middlewares/auth')
const { signUp, logIn } = require('../controllers/userController')

router.route('/auth/signup')
      .post(signUp);

router.route('/auth/login')
      .post(logIn);

module.exports = router;