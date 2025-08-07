import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export const login = async (req: Request, res: Response) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (!user)
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ messagge: "Mật khẩu không đúng" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: {
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};
export default { register, login };
