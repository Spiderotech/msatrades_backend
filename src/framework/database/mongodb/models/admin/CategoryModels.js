import { Schema, model } from "mongoose";

const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL or path to subcategory image
        required: true,
    },
    description: {
        type: String,
    },
});

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String, // URL or path to category image
        required: true,
    },
    description: {
        type: String,
    },
    subcategories: [subcategorySchema], // Array of subcategory objects
});

const Category = model("Category", categorySchema);
export default Category;
