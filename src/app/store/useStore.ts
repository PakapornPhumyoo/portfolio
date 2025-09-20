// src/store/useStore.ts
import { create } from 'zustand';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  age?: number;
  gender?: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  faculty?: string;
  major?: string;
  talents: string[];
  reason: string;
  university: string;
  activities?: string[];
  awards?: string[];
  portfolio?: string[];
  image?: string;
}

interface Store {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  removeStudent: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  students: [],
  addStudent: (student) => 
    set((state) => ({
      students: [...state.students, { ...student, id: Date.now().toString() }]
    })),
  removeStudent: (id) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== id)
    })),
}));