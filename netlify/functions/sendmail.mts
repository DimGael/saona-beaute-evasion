import { Context } from '@netlify/functions'
const nodemailer = require('nodemailer');
const { verify } = require('hcaptcha');
require('dotenv').config();

export default async (req: Request, context: Context) => {
  try {
    const data = await req.json();

    const secret = process.env.CAPTCHA_KEY;
    const token = data["h-captcha-response"];

    if (!token) {
      throw new Error('Captcha was not solved !');
    }

    const captchaData = await verify(secret, token).catch((error) => {
      throw new Error(error);
    })
    if (captchaData.success !== true) {
      console.log('verification failed');
      throw new Error("Error during captcha validation");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });


    const html =
      '<main><p>Email envoyé via le site Saona Beauté Evasion par le formulaire de contact</p>' +
      '<p><em>Adresse email saisie dans le formulaire de contact par l\'utilisateur : ' + data.email + '</em></p>' +
      '<h2>Objet : ' + data.subject + '</h2>' +
      '<h2>Message :</h2><p style="font-size:1.1rem;">' + data.message + '</p></main>';

    await transporter.sendMail({
      from: '<' + data.email + '>',
      to: process.env.GMAIL_USER,
      subject: '[SBE] Mail Reçu via le site saona beauté évasion - "' + data.subject + '"',
      html,
    });

    return new Response("", {
      status: 200,
      statusText: "ok"
    });
  } catch (error) {
    console.error("Error during sending the email from the contact form", error)
    return new Response("Error during the process", {
      status: 400,
      statusText: error
    });
  }
}
