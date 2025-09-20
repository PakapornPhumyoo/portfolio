// src/lib/validation.ts
import { z } from 'zod';

export const studentSchema = z.object({
  firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
  lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
  birthDay: z.string().optional(),
  birthMonth: z.string().optional(),
  birthYear: z.string().optional(),
  age: z.number().min(1, 'กรุณากรอกอายุ').max(100, 'อายุต้องไม่เกิน 100 ปี').optional(),
  gender: z.string().optional(),
  address: z.string().min(1, 'กรุณากรอกที่อยู่'),
  phone: z.string().regex(/^0[0-9]{8,9}$/, 'หมายเลขโทรศัพท์ไม่ถูกต้อง'),
  school: z.string().min(1, 'กรุณากรอกโรงเรียน'),
  gpa: z.number().min(0).max(4.0, 'GPA ต้องอยู่ระหว่าง 0-4.0'),
  faculty: z.string().optional(),
  major: z.string().optional(),
  talents: z.array(z.string()).nonempty('กรุณากรอกความสามารถพิเศษอย่างน้อย 1 項'),
  reason: z.string().min(10, 'เหตุผลต้องมีความยาวอย่างน้อย 10 ตัวอักษร'),
  university: z.string().min(1, 'กรุณาเลือกมหาวิทยาลัย'),
  image: z.any().optional(),
  activities: z.array(z.string()).optional(),
  awards: z.array(z.string()).optional(),
  portfolio: z.array(z.string()).optional(),
});

export type StudentFormData = z.infer<typeof studentSchema>;