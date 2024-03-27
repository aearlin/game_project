import { Request, Response } from 'express';
import getLetters from '../../api/get-letters';
import { MAX_STRING_START } from '../../constants/string-constants';

const mockRequest: Request = {} as Request;
const mockResponse: Response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe('getLetters function', () => {
  it('should return an array of letters', async () => {
    await getLetters(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      lettersArray: expect.any(Array),
    });

    const { lettersArray } = (mockResponse.json as jest.Mock).mock.calls[0][0];
    expect(lettersArray.length).toBe(MAX_STRING_START);

    // Check if each element in the array is a letter
    lettersArray.forEach((letter: string) => {
      expect(letter).toMatch(/[a-z]/i);
    });
  });

  it('should handle errors properly', async () => {
    const errorMessage = 'Test error message';
    jest.spyOn(global.Math, 'random').mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await getLetters(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
