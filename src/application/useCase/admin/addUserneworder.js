import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const client = twilio(accountSid, authToken);

const sendWhatsAppMessage = async (phone, message) => {
    try {
        // Extract actual phone number from "whatsapp:+919876543210"
        const actualPhoneNumber = phone.replace("whatsapp:", ""); 

        // Validate correct E.164 format
        if (!actualPhoneNumber.startsWith("+") || actualPhoneNumber.length < 10) {
            throw new Error(`Invalid phone number format: ${actualPhoneNumber}`);
        }

       await client.messages.create({
            from: twilioNumber,
            to: phone,
            body: message,
        });

        console.log("WhatsApp message sent to:", phone);
    } catch (error) {
        console.error("Error sending WhatsApp message:", error.message);
    }
};




const addUserneworder = async (products, totalAmount, paymentMethod, billingDetails, paymentStatus, repositories) => {
    try {
        const orderdata = await repositories.createUserneworder(products, totalAmount, paymentMethod, billingDetails, paymentStatus);
        console.log(orderdata);

        const adminPhone = "+918089650271"; // Ensure this is E.164 format
        let userPhone = billingDetails.phone;

        // Ensure userPhone is in E.164 format
        if (!userPhone.startsWith("+")) {
            userPhone = `+${userPhone}`; // Prepend '+' if missing
        }

        // Format numbers for WhatsApp
        const formattedAdminPhone = `whatsapp:${adminPhone}`;
        const formattedUserPhone = `whatsapp:${userPhone}`;

        const adminMessage = `🛒 New Order Received!\nOrder ID: ${orderdata.data.orderId}\nTotal: ₹${totalAmount}\nPayment: ${paymentMethod}\n📌 Please visit MSATrade Store Dashboard for order details.`;

        const userMessage = `✅ Order Placed Successfully!\nOrder ID: ${orderdata.data.orderId}\nTotal: ₹${totalAmount}\nPayment: ${paymentMethod}\n📦 Thank you for shopping with us!`;

        // Send WhatsApp messages
        await sendWhatsAppMessage(formattedAdminPhone, adminMessage);
        await sendWhatsAppMessage(formattedUserPhone, userMessage);
        return { status: true, orderdata };
    } catch (err) {
        return { message: "Error processing order", status: false, err };
    }
};

export default addUserneworder;
