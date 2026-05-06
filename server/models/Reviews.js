import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    bookId: String,
    content: String,
    reting: Number
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);