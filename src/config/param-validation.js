import Joi from 'joi';

export default {
    createArticle: {
        body: {
            user_id: Joi.number().required(),
            article_title: Joi.string().required(),
            article_tag: Joi.string().required(),
            article_content: Joi.string().min(20).required()
        }
    },
    createUser: {
        body: {
            user_name: Joi.string().required(),
            user_mail: Joi.string().email().trim().required(),  //Trim 移除多於空白
            user_password: Joi.string().regex(/[a-zA-Z0-9]{6,30}$/).required()
        }
    }
};