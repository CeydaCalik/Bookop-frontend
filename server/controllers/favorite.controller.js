const User = require("../models/User");

exports.favoriteOne = async (req, res) => {

    try {

        const userId = req.user.id;

        const { bookId } = req.body;

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                message : "Utilisateur introuvable"
            });
        }

        const alreadyFavorite = user.favorites.includes(bookId);

        if(alreadyFavorite) {

            user.favorites = user.favorites.filter(
                id => id !== bookId );

        } else {
            user.favorites.push(bookId);
        }

        await user.save();

        res.json({
            favorites: user.favorites
        });

    } catch (err) {
        res.status(500).json({
            message : err.message
        });

    }
} 

exports.getFavorites = async (req, res) => {
    const user = await User.findById(req.user.id);

    res.json({
        favorites: user.favorites
    })
}