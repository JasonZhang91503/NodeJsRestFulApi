import express from 'express';
import validate from 'express-validation';
import articleCtrl from '../controllers/article.controller';
import paramValidation from '../../config/param-validation'

const router = express.Router();

router.route('/')
    .get(articleCtrl.articleGet)
    .post(validate(paramValidation.createArticle),articleCtrl.articlePost);


router.route('/:article_id')
    .put(articleCtrl.articlePut)
    .delete(articleCtrl.articleDelete);

export default router;