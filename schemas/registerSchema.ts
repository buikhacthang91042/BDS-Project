import { z } from "zod";
export const RegisterSchema = z.object({
    name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    phone: z
        .string()
        .regex(/^0\d{9}$/, "Số điện thoại không hợp lệ"),
    password: z.string().min(3, "Mật khẩu phải có ít nhất 3 ký tự"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message:"Mật khẩu xác nhận không khớp",
    path:["confirmPassword"],
});
export type RegisterInput = z.infer<typeof RegisterSchema>;

