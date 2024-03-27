import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../models/user';

const signup = async (req: Request, res: Response) => {
  try {
    const { username, password, confirmPassword, email } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User\'s email already exists' });
    }
    existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ email, password: hashedPassword, username });

    res.status(200).json({ message: 'User created' });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default signup;
