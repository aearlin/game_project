import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import changePassword from '../../api/user-change-password';
import User from '../../models/user';

const findOneMock = User.findOne as jest.Mock;
const findByIdAndUpdateMock = User.findByIdAndUpdate as jest.Mock;

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('../../models/user');

describe('changePassword function', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      body: {
        email: 'test@example.com',
        oldPassword: 'oldpassword',
        newPassword: 'newpassword',
        confirmPassword: 'newpassword',
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should change the password successfully', async () => {
    const existingUser = {
      _id: 'user_id',
      email: 'test@example.com',
      password: 'hashedPassword',
      level: 1,
    };

    findOneMock.mockResolvedValue(existingUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (bcrypt.hash as jest.Mock).mockResolvedValue('newHashedPassword');
    findByIdAndUpdateMock.mockResolvedValue(existingUser);

    await changePassword(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Password changed',
      user: existingUser,
    });
  });

  it('should handle invalid credentials', async () => {
    findOneMock.mockResolvedValue(null);

    await changePassword(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('should handle password mismatch', async () => {
    const existingUser = {
      _id: 'user_id',
      email: 'test@example.com',
      password: 'hashedPassword',
      level: 1,
    };

    findOneMock.mockResolvedValue(existingUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    mockRequest.body.confirmPassword = 'mismatchedpassword';

    await changePassword(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Passwords do not match' });
  });

  it('should handle errors', async () => {
    const errorMessage = 'Test error message';
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error output

    findOneMock.mockRejectedValue(new Error(errorMessage));

    await changePassword(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
