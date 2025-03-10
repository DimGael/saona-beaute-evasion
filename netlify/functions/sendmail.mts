import { Context, Handler } from '@netlify/functions'
const nodemailer = require('nodemailer');
require('dotenv').config();

export default async (req: Request, context: Context) => {
  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const data = await req.json();
    
    const html = 
      '<main><p>Email envoyé via le site Saona Beauté Evasion par le formulaire de contact</p>' +
      '<p><em>Adresse email saisie dans le formulaire de contact par l \'utilisateur : ' + data.email + '</em></p>' +
      '<h2>Objet : '+data.subject+'</h2>' +
      '<h2>Message :</h2><p style="font-size:1.1rem;">'+data.message + '</p></main>';

    const info = await transporter.sendMail({
      from: '<' + data.email + '>',
      to: process.env.GMAIL_USER,
      subject: 'Mail Reçu via le site saona beauté évasion - "' +data.subject+'"',
      html,
    });

    return new Response("Message envoyé !");
  } catch (error) {
    return new Response("Error during the process !");
  }
}
