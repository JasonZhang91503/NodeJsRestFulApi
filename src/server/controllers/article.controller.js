import articleModule from '../modules/article.module';

/**
 * Article GET select data
 */
const articleGet = (req, res) => {
    articleModule.selectArticle().then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
}

/**
 * Article POST insert
 */
const articlePost = (req, res) => {
    const insertValues = req.body;
    articleModule
        .createArticle(insertValues)
        .then((result) => {
            res.send(result);
        }).catch((err) => { return res.send(err); });
};

/**
 * Article PUT alert
 */
const articlePut = (req, res) => {
    const userId = req.params.article_id;
    const insertValues = req.body;
    articleModule.modifyArticle(insertValues, userId).then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
};

/**
 * Article DELETE delete
 */
const articleDelete = (req, res) => {
    const userId = req.params.article_id;
    articleModule.deleteArticle(userId).then((result) => {
        res.send(result);
    }).catch((err) => { return res.send(err); });
};

export default {
    articlePost,
    articleGet,
    articlePut,
    articleDelete
};