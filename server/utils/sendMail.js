import { transporter } from "../config/nodemailer.js";

export const orderMail = async (to, order) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Shoplix - Order Placed Successfully",
      html: `
            <h2>Order Confirmed!!</h2>

      <p>\n\n\nYour order has been placed successfully.\n</p>

      <p>\nTotal Amount: ₹${order.amount}</p>

      <p>\nStatus: ${order.status}</p>`,
    });
    console.log("Message sent:", info.messageId);
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};
