const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.register = async (req, res) => {
  console.log("Received request to /api/auth/register:", req.body); // Thêm log
  const { name, phone, password } = req.body;
  if (!name || !phone || !password) {
    console.log("Missing fields:", { name, phone, password }); // Thêm log
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin !" });
  }
  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      console.log("User already exists with phone:", phone); // Thêm log
      return res.status(400).json({ message: "Người dùng đã tồn tại !" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("User registered successfully:", phone); // Thêm log
    return res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    console.error("Lỗi khi đăng ký người dùng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};