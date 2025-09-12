import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, "Please enter a valid email"], // Basic email validation
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5, // Ratings should be between 1 and 5
    },
    review: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
    },
    basePrice: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    discount: {
        type: Number, // Percentage discount (e.g., 10 for 10% off)
        default: 0,
    },
    discountType: {
        type: String,
        enum: ["Chinese New Year Discount", "Black Friday", "Seasonal Sale"],
    },
    sizes: {
        type: [String], // Array of sizes (e.g., ["S", "M", "L"])
        enum: ["XS", "S", "M","L" ,"XL", "XXL"],
    },
    images: {
        type: [String], // Array of image URLs
        validate: [(val) => val.length <= 5, "Cannot upload more than 5 images"],
    },
    tags: {
        type: [String], // Array of tags (for search/filtering)
    },

    reviews: [reviewSchema], // Embeds the reviewSchema
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = model("Product", productSchema);
export default Product;
