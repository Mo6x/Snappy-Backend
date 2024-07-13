import { Request, Response } from "express";
import User from "../models/User";


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
