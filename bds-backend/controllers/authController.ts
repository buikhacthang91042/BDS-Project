import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  console.log("Received request to /api/auth/register:", req.body);
  const { name, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      console.log("User already exists with phone:", phone);
      return res.status(400).json({ message: "Người dùng đã tồn tại !" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("User registered successfully:", phone);
    return res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    console.error("Lỗi khi đăng ký người dùng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export default { register };
