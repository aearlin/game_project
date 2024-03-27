import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import login from '../../api/user-login';
import User from '../../models/user';

const findOneMock = User.findOne as jest.Mock;
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

jest.mock('../../models/user');

describe('login function', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      body: {
        email: 'test@example.com',
        password: 'password',
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should log the user in successfully', async () => {
    const existingUser = {
      email: 'test@example.com',
      password: 'hashedPassword',
    };

    findOneMock.mockResolvedValue(existingUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await login(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User logged in' });
  });

  it('should fail when given the wrong password', async () => {
    const existingUser = {
      email: 'test@example.com',
      password: 'hashedPassword',
    };

    findOneMock.mockResolvedValue(existingUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await login(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('should fail when the user does not exist', async () => {
    findOneMock.mockResolvedValue(null);

    await login(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('should handle errors properly', async () => {
    const errorMessage = 'Test error message';
    findOneMock.mockRejectedValue(new Error(errorMessage));

    await login(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
