import { Schema, model } from "mongoose";

// Function to generate orderId with "MSAt" prefix and a unique number
const generateOrderId = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
    return `MSAt${randomNumber}`;
};

const orderItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
});

const orderSchema = new Schema({
    orderId: {
        type: String,
        default: generateOrderId, // Generates custom order ID
        unique: true,
    },
    products: [orderItemSchema], // List of ordered products
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["Credit Card", "PayPal", "Cash on Delivery", "UPI"],
        required: true,
    },
    billingDetails: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        company: { type: String },
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        postCode: { type: String, required: true },
        email: { type: String, required: true, match: [/.+@.+\..+/, "Please enter a valid email"] },
        phone: { type: String, required: true },
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = model("Order", orderSchema);
export default Order;
