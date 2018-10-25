import mysql from 'mysql';
import config from '../../config/config';
import bcrypt from 'bcrypt';

const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
});

/**
 * User POST insert
 */
const createUser = (insertValues) => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError);
            } else {
                connection.query('INSERT INTO user SET ?', insertValues, (error, result) => {
                    if (error) {
                        console.log('SQL error', error);
                        reject(error);
                    } else if (result.affectedRows === 1) {
                        resolve(`新增成功! article_id: ${result.insertId}`);
                    }
                    connection.release();
                });
            }
        });
    });
};

/**
 * User GET select data
 */
const selectUser = () => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError);
            } else {
                connection.query('SELECT * FROM user', (error, result) => {
                    if (error) {
                        console.log('SQL error', error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                    connection.release();
                });
            }
        });
    });
};

/**
 * User GET select user login
 */
const selectUserLogin = (insertValues) => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError);
            } else {
                connection.query(
                    'SELECT * FROM User WHERE user_mail = ?',
                    insertValues.user_mail, (error, result) => {
                        if (error) {
                            console.error('SQL error: ', error);
                            reject(error);
                        } else if (Object.keys(result).length === 0) {
                            resolve('信箱尚未註冊');
                        } else {
                            const dbHashPassword = result[0].user_password;
                            const userPassword = insertValues.user_password;

                            bcrypt.compare(userPassword, dbHashPassword).then((res) => {
                                if (res) {
                                    resolve('登入成功');
                                } else {
                                    resolve('您輸入的密碼有誤!');
                                }
                            });
                        }
                        connection.release();
                    }
                );
            }
        });
    });
};

/**
 * User PUT update
 */
const modifyUser = (insertValues, userId) => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError);
            } else {
                connection.query('UPDATE user SET ? WHERE user_id = ?',[insertValues, userId] , (error, result) => {
                    if (error) {
                        console.log('SQL error', error);
                        reject(error);
                    } else if (result.affectedRows === 0) {
                        resolve('請確認修改Id！');
                    } else if (result.message.match('Changed: 1')) {
                        resolve('資料修改成功');
                    } else {
                        resolve('資料無異動');
                    }
                    connection.release();
                });
            }
        });
    });
};

/**
 * User DELETE delete
 */
const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError);
            } else {
                connection.query('DELETE FROM user where user_id = ?', userId, (error, result) => {
                    if (error) {
                        console.log('SQL error', error);
                        reject(error);
                    } else if (result.affectedRows === 1) {
                        resolve('刪除成功！');
                    } else {
                        resolve('刪除失敗');
                    }
                    connection.release();
                });
            }
        });
    });
};

export default {
    createUser,
    selectUser,
    selectUserLogin,
    modifyUser,
    deleteUser
}