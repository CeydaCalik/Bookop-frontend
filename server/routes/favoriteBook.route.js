const router = require("express").Router();


const favoriteController = require('../controllers/favorite.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.get(
    "/", authMiddleware,
    favoriteController.getFavorites
);


router.post(
    "/toggle",
    authMiddleware,
    favoriteController.favoriteOne
);

module.exports = router;