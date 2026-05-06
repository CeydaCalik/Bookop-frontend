import Reviews from "../models/Reviews";

export const createReview = async (req, res) => {
    try {
        const review = await Reviews.create({
            userId: req.user.id,
            ...req.body
        });

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json(err);
    }
};


export const getReviews = async (req, res) => {
    try {
        const reviews = await Reviews.find({
            bookId: req.params.bookId
        }).populate('userId', 'username');

        res.json(reviews);
    } catch (err) {
        res.status(500).json(err);
    }
}