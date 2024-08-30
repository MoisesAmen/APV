import nodemailer from 'nodemailer';
import emailRegistro from '../helpers/emailRegistro';

jest.mock('nodemailer');

describe('emailRegistro', () => {
  it('should send a registration email', async () => {
    const sendMailMock = jest.fn().mockResolvedValue(true);
    nodemailer.createTransport.mockReturnValue({
      sendMail: sendMailMock,
    });

    const datos = {
      email: 'juan@example.com',
      nombre: 'Juan Perez',
      token: 'abc123',
    };

    await emailRegistro(datos);

    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'APV - Administrador de Pacientes de Veterinaria',
      to: 'juan@example.com',
      subject: 'Comprueba tu cuenta en APV',
      text: 'Comprueba tu cuenta en APV',
      html: expect.any(String),
    });
  });
});
