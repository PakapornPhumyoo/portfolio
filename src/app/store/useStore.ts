// src/store/useStore.ts
import { create } from 'zustand';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  age: number;
  gender: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  reason: string;
  faculty: string;
  major: string;
  university: string;
  talents: string[];
  activities: string[];
  awards: string[];
  portfolio: string[];
  image?: File;
}

interface StudentStore {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  removeStudent: (id: string) => void;
}

export const useStore = create<StudentStore>((set) => ({
  students: [],
  addStudent: (student) =>
    set((state) => ({
      students: [
        ...state.students,
        {
          ...student,
          id: Math.random().toString(36).substr(2, 9),
        },
      ],
    })),
  removeStudent: (id) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
    })),
}));