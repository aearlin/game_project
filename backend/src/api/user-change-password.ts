import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../models/user';

const changePassword = async (req: Request, res: Response) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });
    const credentialsCorrect = existingUser && await bcrypt.compare(oldPassword, existingUser.password);
    if (!credentialsCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatedUser = await User.findByIdAndUpdate(existingUser._id, { password: hashedPassword }, { new: true });

    res.status(200).json({ message: 'Password changed', user: updatedUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default changePassword;
