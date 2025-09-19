// src/store/useStore.ts
import { create } from 'zustand';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  talents: string[];
  reason: string;
  faculty: string;
  university: string;
  image?: string;
  activities?: string[];
  awards?: string[];
  portfolio?: string[];
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