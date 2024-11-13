import MailjetManager from '@@/services/mailjet';
import { createChangePasswordToken } from '@@/services/jwt';

export const sendResetPasswordEmail = async (user: SH.User) => {
  const changePasswordToken = createChangePasswordToken({
    id: user.id,
    email: user.email,
    phone: user.phone,
  });
  const link = `${process.env.FRONT_URL}/change-password?token=${changePasswordToken}`;

  await MailjetManager.sendEmail({
    From: {
      Email: 'no-reply@superhelo.fr',
      Name: 'SUPERHELO',
    },
    To: [
      {
        Email: user.email,
        Name: `${user.firstName} ${user.lastName}`,
      },
    ],
    Subject: `[SUPERHELO] - Demande de changement de mot de passe`,
    HTMLPart: `
      <div>
        <p>Bonjour ${user.firstName},</p>
        <p>Veuillez cliquer sur le <a href=${link}>lien suivant</a> pour changer votre mot de passe</p>
        <p>${link}</p>
        <p>Ce lien reste valable 5 minutes.</p>
        <br />
        <p>Bien à vous,</p>
        <p>L'équipe SUPERHELO</p>
      </div>
    `,
  });
};
