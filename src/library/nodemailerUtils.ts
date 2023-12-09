import nodemailer from 'nodemailer';
/**
 * Sends emails for users
 */
export class NodemailerService {
  private static transporter: nodemailer.Transporter;

  /**
   * init
   *
   * Initializes the Nodemailer transport with the SMTP settings from MailTrap.
   */
  public static init(): void {
    NodemailerService.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_APP_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
  }

  /**
   * sendPasswordRecoveryEmail
   *
   * Sends a password recovery email to the specified email address.
   *
   * @param email - The email address to send the password recovery email to.
   * @param recoveryLink - The link to the password recovery page.
   */
  public static async sendPasswordRecoveryEmail(email: string, recoveryLink: string): Promise<void> {
    const mailOptions = {
      from: 'admin',
      to: email,
      subject: 'Recuperação de Senha',
      html: `
        <html>
          <head>
            <title>Recuperação de senha</title>
          </head>
          <body>
            <h3>Olá viajante!</h3> <br>
            <p>Recebemos sua solicitação de recuperação de senha. Para criar uma nova senha clique no botão abaixo:</p> <br>
            <a href="${recoveryLink}"style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Redefinir senha</a>
            <br>
            <br><p><b>Importante:</b> O Link é válido por 24 horas</p><br>
            <p>Após esse tempo, você deverá adicionar um novo, tá bem?!</p>
            <p> Caso não tenha sido você, por favor desconsidere esse email</p>
            <p> Se precisar de ajuda, entre em contato com a gente!</p>
            <br>
            <p>EQUIPE ORION MARTE</p>
          </body>
        </html>
      `
    };

    await NodemailerService.transporter.sendMail(mailOptions);
  }

  /**
   * sendUserRegistrationConfirmationEmail
   *
   * Sends a confirmation email for newly registerer users.
   *
   * @param email - The email address to send the user registration confirmation email to.
   */
  public static async sendUserRegistrationConfirmationEmail(email: string, name: string, token: string): Promise<void> {
    const userName: string = name.split(' ')[0];
    const lowerCaseStr: string = userName.toLowerCase();
    const formattedUserName: string = lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);

    const confirmationLink: string = 'http://localhost:4200';

    const mailOptions = {
      from: 'admin',
      to: email,
      subject: 'ORION MARTE - Cadastro de usuário',
      html: `
        <html>
          <head>
            <title>Recuperação de senha</title>
          </head>
          <body>
            <h3>Olá ${formattedUserName}</h3><br />
            <p>Obrigado por se juntar à nossa comunidade ORION MARTE! </p>
            <p>Para confirmar seu cadastro, clique no link abaixo: </p><br/>
            <a href="${confirmationLink}?confirmationToken=${token}" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Confirme seu cadastro</a><br>
            <br>
            <p><b>Importante:</b> O Link é válido por 24 horas</p>
            <p>Se você não solicitou este e-mail, por favor, ignore-o. Caso</p>
            <p>contrário, esperamos que aproveite a exploração do vasto</p>
            <p>universo de Marte em nosso site.</p><br />
            <p>Em caso de dúvidas ou problemas, nossa equipe de suporte</p>
            <p>está à disposição para ajudar.</p><br />
            <p>Divirta-se explorando!</p><br />
            <p>Atenciosamente,</p><br />
            <p>A Equipe ORION MARTE</p><br />
          </body>
        </html>
      `
    };

    await NodemailerService.transporter.sendMail(mailOptions);
  }
}
