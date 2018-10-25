import userModule from '../modules/user.module';
import bcrypt from 'bcrypt';

/**
 * User POST insert
 */
const userPost = (req, res) => {
    const insertValues = {
        user_name: req.body.user_name,
        user_mail: req.body.user_mail,
        user_password: bcrypt.hashSync(req.body.user_password, 10)
    };
    userModule.createUser(insertValues).then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
};

/**
 * User GET select data
 */
const userGet = (req, res) => {
    userModule.selectUser().then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
};

/**
 * User POST login
 */
const userLogin = (req, res) => {
    const insertValues = req.body;
    userModule.selectUserLogin(insertValues).then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
};

/**
 * User PUT update
 */
const userPut = (req, res) => {
    const userId = req.params.user_id;
    const insertValues = req.body;
    userModule.modifyUser(insertValues, userId).then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
};

/**
 * User DELETE delete
 */
const userDelete = (req, res) => {
    const userId = req.params.user_id;
    userModule.deleteUser(userId).then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
};

export default {
    userPost,
    userGet,
    userLogin,
    userPut,
    userDelete
}