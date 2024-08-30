import {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
  } from '../controllers/pacienteController';
  import Paciente from '../models/Paciente';
  
  jest.mock('../models/Paciente');
  
  describe('Paciente Controller', () => {
    
    // Prueba para agregarPaciente
    describe('agregarPaciente', () => {
      it('should create a new patient', async () => {
        const req = {
          body: {
            nombre: 'Firulais',
            propietario: 'Juan Perez',
            email: 'juan@example.com',
            fecha: '2023-08-29',
            sintomas: 'Tos',
          },
          veterinario: { _id: 'veterinarioId' },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        Paciente.prototype.save = jest.fn().mockResolvedValue({
          ...req.body,
          veterinario: 'veterinarioId',
        });
  
        await agregarPaciente(req, res);
  
        expect(res.json).toHaveBeenCalledWith({
          ...req.body,
          veterinario: 'veterinarioId',
        });
      });
    });
  
    // Prueba para obtenerPacientes
    describe('obtenerPacientes', () => {
      it('should return a list of patients', async () => {
        const req = {
          veterinario: { _id: 'veterinarioId' },
        };
        const res = {
          json: jest.fn(),
        };
  
        Paciente.find.mockReturnValue({
          where: jest.fn().mockReturnThis(),
          equals: jest.fn().mockResolvedValue([
            {
              nombre: 'Firulais',
              propietario: 'Juan Perez',
              email: 'juan@example.com',
              fecha: '2023-08-29',
              sintomas: 'Tos',
              veterinario: 'veterinarioId',
            },
          ]),
        });
  
        await obtenerPacientes(req, res);
  
        expect(res.json).toHaveBeenCalledWith([
          {
            nombre: 'Firulais',
            propietario: 'Juan Perez',
            email: 'juan@example.com',
            fecha: '2023-08-29',
            sintomas: 'Tos',
            veterinario: 'veterinarioId',
          },
        ]);
      });
    });
  
    // Prueba para obtenerPaciente
    describe('obtenerPaciente', () => {
      it('should return a patient by ID', async () => {
        const req = {
          params: { id: 'pacienteId' },
          veterinario: { _id: 'veterinarioId' },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        Paciente.findById.mockResolvedValue({
          _id: 'pacienteId',
          nombre: 'Firulais',
          propietario: 'Juan Perez',
          email: 'juan@example.com',
          fecha: '2023-08-29',
          sintomas: 'Tos',
          veterinario: { _id: 'veterinarioId' },
        });
  
        await obtenerPaciente(req, res);
  
        expect(res.json).toHaveBeenCalledWith({
          _id: 'pacienteId',
          nombre: 'Firulais',
          propietario: 'Juan Perez',
          email: 'juan@example.com',
          fecha: '2023-08-29',
          sintomas: 'Tos',
          veterinario: { _id: 'veterinarioId' },
        });
      });
  
      it('should return 404 if patient is not found', async () => {
        const req = {
          params: { id: 'pacienteId' },
          veterinario: { _id: 'veterinarioId' },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        Paciente.findById.mockResolvedValue(null);
  
        await obtenerPaciente(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ msg: 'No Encontrado' });
      });
  
      it('should return 403 if veterinarian does not match', async () => {
        const req = {
          params: { id: 'pacienteId' },
          veterinario: { _id: 'veterinarioId' },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        Paciente.findById.mockResolvedValue({
          _id: 'pacienteId',
          veterinario: { _id: 'anotherVeterinarioId' },
        });
  
        await obtenerPaciente(req, res);
  
        expect(res.json).toHaveBeenCalledWith({ msg: 'Accion no válida' });
      });
    });
  
    // Prueba para actualizarPaciente
    describe('actualizarPaciente', () => {
      it('should update a patient', async () => {
        const req = {
          params: { id: 'pacienteId' },
          body: { nombre: 'Nuevo Nombre' },
          veterinario: { _id: 'veterinarioId' },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        const mockPaciente = {
          _id: 'pacienteId',
          nombre: 'Firulais',
          propietario: 'Juan Perez',
          email: 'juan@example.com',
          fecha: '2023-08-29',
          sintomas: 'Tos',
          veterinario: { _id: 'veterinarioId' },
          save: jest.fn().mockResolvedValue({
            _id: 'pacienteId',
            nombre: 'Nuevo Nombre',
          }),
        };
  
        Paciente.findById.mockResolvedValue(mockPaciente);
  
        await actualizarPaciente(req, res);
  
        expect(mockPaciente.save).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
          _id: 'pacienteId',
          nombre: 'Nuevo Nombre',
        });
      });
  
      it('should return 404 if patient is not found', async () => {
        const req = {
          params: { id: 'pacienteId' },
          veterinario: { _id: 'veterinarioId' },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        Paciente.findById.mockResolvedValue(null);
  
        await actualizarPaciente(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ msg: 'No Encontrado' });
      });
  
      it('should return 403 if veterinarian does not match', async () => {
        const req = {
          params: { id: 'pacienteId' },
          body: { nombre: 'Nuevo Nombre' },
          veterinario: { _id: 'veterinarioId' },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        const mockPaciente = {
          _id: 'pacienteId',
          veterinario: { _id: 'anotherVeterinarioId' },
        };
  
        Paciente.findById.mockResolvedValue(mockPaciente);
  
        await actualizarPaciente(req, res);
  
        expect(res.json).toHaveBeenCalledWith({ msg: 'Accion no válida' });
      });
    });
  
    // Prueba para eliminarPaciente
    describe('eliminarPaciente', () => {
      it('should delete a patient', async () => {
        const req = {
          params: { id: 'pacienteId' },
          veterinario: { _id: 'veterinarioId' },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        const mockPaciente = {
          _id: 'pacienteId',
          veterinario: { _id: 'veterinarioId' },
          deleteOne: jest.fn().mockResolvedValue(true),
        };
  
        Paciente.findById.mockResolvedValue(mockPaciente);
  
        await eliminarPaciente(req, res);
  
        expect(mockPaciente.deleteOne).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ msg: 'Paciente Eliminado' });
      });
  
      it('should return 404 if patient is not found', async () => {
        const req = {
          params: { id: 'pacienteId' },
          veterinario: { _id: 'veterinarioId' },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        Paciente.findById.mockResolvedValue(null);
  
        await eliminarPaciente(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ msg: 'No Encontrado' });
      });
  
      it('should return 403 if veterinarian does not match', async () => {
        const req = {
          params: { id: 'pacienteId' },
          veterinario: { _id: 'veterinarioId' },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        const mockPaciente = {
          _id: 'pacienteId',
          veterinario: { _id: 'anotherVeterinarioId' },
        };
  
        Paciente.findById.mockResolvedValue(mockPaciente);
  
        await eliminarPaciente(req, res);
  
        expect(res.json).toHaveBeenCalledWith({ msg: 'Accion no válida' });
      });
    });
  
  });
  