import { Request, Response } from 'express';
import { MAX_LETTER_START, MAX_STRING_START, MIN_LETTER } from '../constants/string-constants';
const getLetters = async (req: Request, res: Response) => {
  try {
    const lettersArray: string[] = [];
    for (let i = 0; i < MAX_STRING_START; i++) {
      lettersArray.push(getRandomLetter(MIN_LETTER, MAX_LETTER_START));
    }
    res.status(200).json({ lettersArray });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

function getRandomLetter(min: number, max: number): string {
  const randomNum: number = Math.floor(Math.random() * (max - min + 1)) + min;
  return String.fromCharCode('a'.charCodeAt(0) + randomNum);
}

export default getLetters;
