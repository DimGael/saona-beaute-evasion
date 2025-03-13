import { Context } from '@netlify/functions'
const nodemailer = require('nodemailer');
const { verify } = require('hcaptcha');
require('dotenv').config();

interface giftcardDTO {
  giftvalue: number | undefined;
  email: string;
  phone: string | undefined;
  description: string | undefined;
  firstname: string;
  lastname: string;
  adress: string;
  zipcode: string;
  city: string;
  "h-captcha-response": string;
  "g-recaptcha-response": string;
}

const IGNORE_DATA_KEYS_FOR_EMAIL = ["description", "email", "h-captcha-response", "g-recaptcha-response"];

export default async (req: Request, context: Context) => {
  try {
    const data: giftcardDTO = await req.json();

    const secret = process.env.CAPTCHA_KEY;
    const token = data['h-captcha-response'];

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

    const buildHtmlListElements = (data: giftcardDTO) => {
      let result = "<ul>";

      for (const key in data) {
        if (!IGNORE_DATA_KEYS_FOR_EMAIL.includes(key))
          result += "<li><strong>" + key + ": </strong>" + data[key] + "</li>";
      }

      return result + "</ul>";
    }

    const html =
      '<main><p>Email envoyé via le site Saona Beauté Evasion pour une demande de carte cadeau</p>' +
      '<p><em>Demande de carte cadeau effectuée par l\'utilisateur : ' + data.email + '</em></p>' +
      '<h2>Message :</h2><p style="font-size:1.1rem;">' + data.description + '</p></main>' +
      '<h2>Détails de la demande</h2>' +
      buildHtmlListElements(data) + 
      '<footer>Créer un lien de paiement sur SumUP : <a target="_blank" href="https://me.sumup.com/fr-fr/payment-links">ICI</a></footer>'
      ;

    await transporter.sendMail({
      from: '<' + process.env.GMAIL_USER + '>',
      to: process.env.MAIL_GIFTCARD_RECIPIENT,
      subject: '[SBE] Demande de carte cadeau via le site pour "' + data.firstname + ' ' + data.lastname + '" <' + data.email + '>',
      html,
    });
    return new Response("", {
      status: 200,
      statusText: "ok"
    });
  } catch(error) {
    console.error("Error during sending the email from the giftcard form", error)
    return new Response("Error during the process", {
      status: 400,
      statusText: error
    });
  }
}