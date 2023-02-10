const nodemailer = require("nodemailer");

const sendEmail = async (
  from_name,
  to_email,
  address,
  city,
  country,
  total_price,
  item_name,
  quantity
) => {
  const htmlTemplate = `
  <h2>Order Confirmation</h2>
  <p>Dear ${from_name},</p>
  <p>Thank you for your order!</p>
  <p>
    Here is a summary of your order:
    <ul>
      <li>Item Name: ${item_name}</li>
      <li>Quantity: ${quantity}</li>
      <li>Total Price: ${total_price}</li>
    </ul>
  </p>
  <p>
    The item(s) will be shipped to:
    <ul>
      <li>Address: ${address}</li>
      <li>City: ${city}</li>
      <li>Country: ${country}</li>
    </ul>
  </p>
  <p>If you have any questions, please reply to this email.</p>
  <p>Best regards,</p>
  <p>The Team</p>
`;

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "eleazar92@ethereal.email",
      pass: "d9RPbcpyHqCEr4UptY",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${from_name}`,
    to: `${to_email}`,
    subject: "Order details",
    html: htmlTemplate,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;
