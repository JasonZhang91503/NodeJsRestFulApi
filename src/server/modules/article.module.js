import mysql from 'mysql'
import config from '../../config/config';

const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
});

/**
 * Article GET select data
 */
const selectArticle = () => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError);
            } else {
                connection.query(`SELECT * FROM article`, (error, result) => {
                    if (error) {
                        console.log('SQL error: ', error);
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
 * Article POST insert
 */
const createArticle = (insertValues) => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError);
            } else {
                connection.query(
                    'INSERT INTO article SET ?', 
                    insertValues, 
                    (error, result) => {
                        if (error) {
                            console.log('SQL error: ', error);
                            reject(error);
                        } else {
                            resolve(`新增成功! article_id: ${result.insertId}`);
                        }
                        connection.release();
                });
            }
        });
    });
};

/**
 * Article PUT alert
 */
const modifyArticle = (insertValues, userId) => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError);
            } else {
                connection.query('UPDATE Article SET ? WHERE article_id = ?', [insertValues, userId], (error, result) => {
                    if (error) {
                        console.log('SQL error: ', error);
                    } else if (result.affectedRows === 0) { // 寫入發現無該資料
                        resolve('請確認修改Id!');
                    } else if (result.message.match('Changed: 1')) { // 代表寫入成功了
                        resolve('資料庫修改成功');
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
 * Article DELETE delete
 */
const deleteArticle = (userId) => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError);
            } else {
                connection.query('DELETE FROM article WHERE article_id = ?', userId, (error, result) => {
                    if (error) {
                        console.log('SQL error: ', error);
                        reject(error);
                    } else if (result.affectedRows === 1) {
                        resolve('刪除成功!');
                    } else {
                        resolve('刪除失敗!');
                    }
                    connection.release();
                });
            }
        });
    });
};

export default {
    createArticle,
    selectArticle,
    modifyArticle,
    deleteArticle
};
