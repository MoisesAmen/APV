import mongoose from 'mongoose';
import conectarDB from '../config/db';

jest.mock('mongoose');

describe('conectarDB', () => {
  it('should connect to the database', async () => {
    mongoose.connect.mockResolvedValue({
      connection: { host: 'localhost', port: 27017 }
    });

    await conectarDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it('should handle connection errors', async () => {
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    mongoose.connect.mockRejectedValue(new Error('Connection Error'));

    await conectarDB();

    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
