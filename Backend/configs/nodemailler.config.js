const nodemailer = require("nodemailer");

const emailAccount = {
    secret: "this-is-my-secrect",
    secure: false,
    requireTLS: true,
    user: 'hoangvm.hiephoa@gmail.com',
    password: 'vominhhoang',
}


const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: emailAccount.user,
        pass: emailAccount.password,
    },
});


module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    transport.sendMail({
        from: emailAccount.user,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for signing up. Please confirm your email by clicking on the following link</p>
          <form action=${`http://localhost:4000/api/user/confirm/${confirmationCode}`} method="post">
            <button type="submit">Xác nhận</button>
            </form>
          </div>`,  
    }).catch(err => console.log(err));
};