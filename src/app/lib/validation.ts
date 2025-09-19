// src/lib/validation.ts
import { z } from 'zod';

export const studentSchema = z.object({
  firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
  lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
  birthDay: z.string().min(1, 'กรุณาเลือกวันเกิด'),
  birthMonth: z.string().min(1, 'กรุณาเลือกเดือนเกิด'),
  birthYear: z.string().min(1, 'กรุณาเลือกปีเกิด'),
  age: z.number().min(1, 'กรุณากรอกอายุ'),
  gender: z.string().min(1, 'กรุณาเลือกเพศ'),
  address: z.string().min(1, 'กรุณากรอกที่อยู่'),
  phone: z.string().min(1, 'กรุณากรอกหมายเลขโทรศัพท์').regex(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข'),
  school: z.string().min(1, 'กรุณากรอกโรงเรียน'),
  gpa: z.number().min(0).max(4.0, 'GPA ต้องอยู่ระหว่าง 0 ถึง 4.0'),
  reason: z.string().min(1, 'กรุณากรอกเหตุผลในการสมัคร'),
  faculty: z.string().min(1, 'กรุณากรอกคณะ'),
  major: z.string().min(1, 'กรุณากรอกสาขา'),
  university: z.string().min(1, 'กรุณาเลือกมหาวิทยาลัย'),
  talents: z.array(z.string()).optional(),
  image: z.any().optional(),
});

export type StudentFormData = z.infer<typeof studentSchema>;