import express from 'express';
import validate from 'express-validation';
import userCtrl from '../controllers/user.controller';
import paramValidation from '../../config/param-validation'

const router = express.Router();

router.route('/')
    .get(userCtrl.userGet)
    .post(validate(paramValidation.createUser),userCtrl.userPost);

router.route('/login').post(userCtrl.userLogin);

router.route('/:user_id')
    .put(userCtrl.userPut)
    .delete(userCtrl.userDelete);

export default router;