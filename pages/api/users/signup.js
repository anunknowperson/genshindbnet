import { withMongo } from '../../../lib/mw';

import { createTransport } from "nodemailer"

import { hash } from 'bcryptjs';

import { randomUUID, randomBytes } from 'crypto';
import log from '../../../lib/logging';

async function sendVerificationRequest(address, uid, secret, redirect) {

  const provider = {
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM
  };

  const identifier = address;

  const host = process.env.SITE_URL;
  const url = process.env.SITE_URL + `/api/users/confirm?uid=${uid}&secret=${secret}&redirect=${redirect}`;

  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host }),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  }
}

function html(params) {
  const { url, host } = params

  const escapedHost = host.replace(/\./g, "&#8203;.")

  const brandColor = "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  }

  return `
  <body style="background: ${color.background};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Sign in to <strong>${escapedHost}</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                  in</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }) {
  return `Sign in to ${host}\n${url}\n\n`
}

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === 'POST') {
    //Getting email and password from body
    const { email, password, name, redirect } = req.body;

    const checkExisting = await withMongo('data', async (db) => {
      const collection = db.collection('users');
      return await collection.findOne({ email: email });
    });

    //Send error response if duplicate user is found
    if (checkExisting) {
      res.status(422).json({ message: 'User already exists' });
      return;
    }
    //Hash password

    var userId = randomUUID();
    var secret = randomBytes(10).toString('hex');


    log('User registered. Name: ' + name + ' id: ' + userId);

    const status = await withMongo('data', async (db) => {
      return await db.collection('users').insertOne({
        id: userId,
        email,
        password: await hash(password, 12),
        name,
        needVerification: true,
        verificationSecret: secret,
      });
    });


    sendVerificationRequest(email, userId, secret, redirect);

    //Send success response
    res.status(201).json({ message: 'User created', ...status });

  } else {
    //Response for other than POST method
    res.status(500).json({ message: 'Route not valid' });
  }
}

export default handler;