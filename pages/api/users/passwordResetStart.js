import { withMongo } from '../../../lib/mw';

import { randomBytes } from 'crypto';


import { createTransport } from "nodemailer"


async function sendResetRequest(address, uid, secret) {

  const provider = {
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM
  };

  const identifier = address;

  const host = process.env.SITE_URL;
  const url = process.env.SITE_URL + `/internal/passwordResetConfirm?uid=${uid}&secret=${secret}`;

  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Reset password for ${host}`,
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
  return `Reset password for ${host}\n${url}\n\n`
}

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    const user = await withMongo('data', async (db) => {
      const collection = db.collection('users');
      return await collection.findOne({ email: email });
    });


    if (user) {

      if (!('password' in user)) {
        res.status(403).json({ message: 'User does not have password' });
        return;
      }

      var secret = randomBytes(32).toString('hex');

      const updateDoc = {
        $set: {
          passwordResetSecret: secret,
        }
      };

      const result = await withMongo('data', async (db) => {
        const collection = db.collection('users');
        return await collection.updateOne(user, updateDoc, { upsert: false });
      });

      await sendResetRequest(email, user.id, secret);

      res.status(201).json({ message: 'A password reset link has been sent' });
      return;


    } else {
      res.status(404).json({ message: 'User does not exist' });

      return;
    }


  } else {
    res.status(500).json({ message: 'Route not valid' });
  }
}

export default handler;