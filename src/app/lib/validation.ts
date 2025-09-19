// src/lib/validation.ts
import { z } from 'zod';

export const studentSchema = z.object({
  firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
  lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
  address: z.string().min(1, 'กรุณากรอกที่อยู่'),
  phone: z.string().regex(/^0[0-9]{8,9}$/, 'หมายเลขโทรศัพท์ไม่ถูกต้อง'),
  school: z.string().min(1, 'กรุณากรอกโรงเรียน'),
  gpa: z.number().min(0).max(4.0, 'GPA ต้องอยู่ระหว่าง 0-4.0'),
  talents: z.array(z.string()).nonempty('กรุณากรอกความสามารถพิเศษอย่างน้อย 1 項'),
  reason: z.string().min(10, 'เหตุผลต้องมีความยาวอย่างน้อย 10 ตัวอักษร'),
  faculty: z.string().min(1, 'กรุณาเลือกสาขา'),
  university: z.string().min(1, 'กรุณาเลือกมหาวิทยาลัย'),
  image: z.any().optional(),
  activities: z.array(z.string()).optional(),
  awards: z.array(z.string()).optional(),
  portfolio: z.array(z.string()).optional(),
});

export type StudentFormData = z.infer<typeof studentSchema>;