const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route to handle order placement
app.post("/place-order", async (req, res) => {
  const { customerName, customerEmail, cartItems, totalPrice } = req.body;

  try {
    // Example: Send an email notification to the seller
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "tanvi.kapurwan22@gmail.com", // Replace with your email
        pass: "your-email-password", // Replace with your email password
      },
    });

    const emailContent = `
      <h1>New Order Received</h1>
      <p><strong>Customer Name:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <h2>Order Details:</h2>
      <ul>
        ${cartItems
          .map(
            (item) => `
            <li>
              ${item.name} - $${item.price.toFixed(2)}
            </li>`
          )
          .join("")}
      </ul>
      <h3>Total Price: $${totalPrice.toFixed(2)}</h3>
    `;

    await transporter.sendMail({
      from: "your-email@gmail.com",
      to: "tanvi.kapurwan22@gmail.com", // Your email
      subject: "New Order Received",
      html: emailContent,
    });

    res.status(200).send("Order placed and seller notified!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to place the order. Try again.");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
