import { Request, Response } from 'express';

const getLetters = async (req: Request, res: Response) => {
  try {
    const lettersArray: string[] = [];
    for (let i = 0; i < 10; i++) {
      lettersArray.push(String.fromCharCode('a'.charCodeAt(0) + i));
    }
    res.status(200).json({ lettersArray });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default getLetters;