//              ARTICLE ROUTES
// GET /articles        get all articles
// GET /articles/:id    get one article
// POST /articles       create article
// PUT /articles/:id    edit article
// DELETE /articles/:id delete article

const express = require('express');
const router = express.Router();

const articles = require('../controllers/articles');
const catchAsync = require('../utils/catchAsync');
const { validateArticle, authenticateMiddleware } = require('../middleware');

router
  .route('/')
  .get(catchAsync(articles.index))
  .post(validateArticle, catchAsync(articles.createArticle));

// send get to /articles/secret to test authentication
router.route('/secret').get(authenticateMiddleware, articles.index);

router
  .route('/:id')
  .get(catchAsync(articles.showArticle))
  .put(validateArticle, catchAsync(articles.updateArticle))
  .delete(catchAsync(articles.deleteArticle));

module.exports = router;
