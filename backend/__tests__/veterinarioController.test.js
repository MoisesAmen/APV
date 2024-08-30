import { registrar, autenticar } from '../controllers/veterinarioController';
import Veterinario from '../models/Veterinario';
import generarJWT from '../helpers/generarJWT';
import emailRegistro from '../helpers/emailRegistro';

jest.mock('../models/Veterinario');
jest.mock('../helpers/generarJWT');
jest.mock('../helpers/emailRegistro');

describe('Veterinario Controller', () => {
  describe('registrar', () => {
    it('should register a new user', async () => {
      const req = {
        body: {
          nombre: 'Juan Perez',
          email: 'juan@example.com',
          password: '123456',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Veterinario.findOne.mockResolvedValue(null);
      Veterinario.prototype.save = jest.fn().mockResolvedValue({
        _id: '123',
        nombre: 'Juan Perez',
        email: 'juan@example.com',
        token: 'abc123',
      });

      await registrar(req, res);

      expect(res.json).toHaveBeenCalledWith({
        _id: '123',
        nombre: 'Juan Perez',
        email: 'juan@example.com',
        token: 'abc123',
      });
      expect(emailRegistro).toHaveBeenCalledWith({
        email: 'juan@example.com',
        nombre: 'Juan Perez',
        token: 'abc123',
      });
    });

    it('should return error if user already exists', async () => {
      const req = {
        body: {
          email: 'juan@example.com',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Veterinario.findOne.mockResolvedValue(true);

      await registrar(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Usuario ya registrado' });
    });
  });

  describe('autenticar', () => {
    it('should authenticate an existing user', async () => {
      const req = {
        body: {
          email: 'juan@example.com',
          password: '123456',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockVeterinario = {
        _id: '123',
        nombre: 'Juan Perez',
        email: 'juan@example.com',
        password: '123456',
        confirmado: true,
        comprobarPassword: jest.fn().mockResolvedValue(true),
      };

      Veterinario.findOne.mockResolvedValue(mockVeterinario);
      generarJWT.mockReturnValue('token123');

      await autenticar(req, res);

      expect(res.json).toHaveBeenCalledWith({
        _id: '123',
        nombre: 'Juan Perez',
        email: 'juan@example.com',
        token: 'token123',
      });
    });

    it('should return an error if the account is not confirmed', async () => {
        const req = {
          body: {
            email: 'juan@example.com',
            password: 'wrongpassword',
          },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
      
        const mockVeterinario = {
          confirmado: false,  // Aquí indicamos que la cuenta no está confirmada
          comprobarPassword: jest.fn().mockResolvedValue(false),
        };
      
        Veterinario.findOne.mockResolvedValue(mockVeterinario);
      
        await autenticar(req, res);
      
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Tu Cuenta no ha sido confirmada' });  // Cambia el mensaje esperado
    });      

    it('should return error if password is incorrect', async () => {
        const req = {
          body: {
            email: 'juan@example.com',
            password: 'wrongpassword',
          },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
      
        const mockVeterinario = {
          confirmado: true,  // Simulamos que la cuenta está confirmada
          comprobarPassword: jest.fn().mockResolvedValue(false),  // Pero la contraseña es incorrecta
        };
      
        Veterinario.findOne.mockResolvedValue(mockVeterinario);
      
        await autenticar(req, res);
      
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ msg: 'El Password es incorrecto' });  // Ahora esperamos este mensaje
    });      
  });
});
