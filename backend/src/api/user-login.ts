import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../models/user';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    const credentialsCorrect = existingUser && await bcrypt.compare(password, existingUser.password);
    if (!credentialsCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'User logged in' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default login;
