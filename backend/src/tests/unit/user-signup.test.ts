import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../../models/user';
import signup from '../../api/user-signup';

const findOneMock = User.findOne as jest.Mock;
const findByIdAndUpdateMock = User.findByIdAndUpdate as jest.Mock;

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('../../models/user');

describe('signup function', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      body: {
        username: 'test',
        email: 'test@example.com',
        password: 'password',
        confirmPassword: 'password',
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should sign up the user successfully', async () => {
    findOneMock.mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    findByIdAndUpdateMock.mockResolvedValue({ email: 'test@example.com', username: 'test' });
    
    await signup(mockRequest as Request, mockResponse as Response);
    
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User created' });
  });
  
  it('should handle existing email', async () => {
    findOneMock.mockResolvedValue({ email: 'test@example.com' });
    
    await signup(mockRequest as Request, mockResponse as Response);
    
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User\'s email already exists' });
  });
  
  it ('should handle existing username', async () => {
    let findOneMockCalled = 0;

    findOneMock.mockImplementation(async () => {
      if (findOneMockCalled === 0) {
        findOneMockCalled++;
        return null;
      } else {
        return { username: 'test', email: 'test2@example.com' };
      }
    });

    await signup(mockRequest as Request, mockResponse as Response);
    
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Username already exists' });
  });
  
  it('should handle password mismatch', async () => {
    mockRequest.body.confirmPassword = 'password2';
    
    await signup(mockRequest as Request, mockResponse as Response);
    
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Passwords do not match' });
  });

  it('should handle errors', async () => {
    findOneMock.mockRejectedValue(new Error('Test error'));
    
    await signup(mockRequest as Request, mockResponse as Response);
    
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Test error' });
  });
});
