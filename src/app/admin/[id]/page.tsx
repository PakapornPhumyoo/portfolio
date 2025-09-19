'use client'; // บังคับให้เป็น Client Component

import { useStore } from '../../store/useStore';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

export default function StudentDetailPage({ params }: Props) {
  // Your code...
}