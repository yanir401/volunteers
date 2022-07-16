import nodemailer from "nodemailer";
import { EMAIL_KEY } from "../config/config.js";
export const sendEmail = async (event, user) => {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "yaniritzhak1@gmail.com",
      pass: EMAIL_KEY,
    },
  });
  let info = await transporter.sendMail({
    from: 'Volunteer Notification"yaniritzhak1@gmail.com"', // sender address
    to: "yanir401@gmail.com", // list of receivers
    subject: "אירוע התנדבות חדש באזורך", // Subject line
    text: `${event.eventName}`,
    html: `

    <h1>שלום ${user.name}</h1>
    <h2>נמצאה התנדבות שיכולה להתאים לך: </h2>
    
    <h2>פרטי ההתנדבות: </h2>
    <h2>${event.eventName}</h2>
    <p>${event.address}</p>
    <p>${event.dateString}</p>
    <p>${event.time}</p>
  
    <a style="cursor:pointer" href=http://localhost:3000/event/${event._id}><button style="color:#fff;background:#1b2430; border-radius:6px; padding:0.5rem;font-size:1.25rem">פרטים נוספים</button></a>
  
    `,
    // html: `<div style="text-align:center> <p>${event.eventName}</p>
    // <p> ${event.summary} ${event} {events} </p>
    // <p>מתי:</p>
    // <p>בתאריך: ${event.date.toDateString()}</p>
    // <p>בשעה: ${event.time}</p>

    // <a style="cursor:pointer" href=http://localhost:3000/event/${
    //   event._id
    // }><button style="color:#fff;background:#1b2430; border-radius:6px; padding:0.5rem;font-size:1.25rem">פרטים נוספים</button></a>
    // </div>
    // `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

// let info = await transporter.sendMail({
//   from: 'Volunteer Notification"yaniritzhak1@gmail.com"', // sender address
//   to: "yanir401@gmail.com", // list of receivers
//   subject: "אירוע התנדבות חדש באזורך", // Subject line
//   text: `${event.eventName}`,
//   html: `

//   <h1>שלום ${user.name}</h1>
//   <h2>נמצאה התנדבות שיכולה להתאים לך: </h2>

//   <h2>פרטי ההתנדבות: </h2>
//   <h2>${event.eventName}</h2>
//   <p>${event.address}</p>
//   <p>${event.dateString}</p>
//   <p>${event.time}</p>

//   <a style="cursor:pointer" href=http://localhost:3000/event/${event._id}><button style="color:#fff;background:#1b2430; border-radius:6px; padding:0.5rem;font-size:1.25rem">פרטים נוספים</button></a>

//   `,
