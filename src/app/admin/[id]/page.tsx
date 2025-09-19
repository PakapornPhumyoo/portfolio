// src/app/admin/[id]/page.tsx
'use client';
import { useStore } from '../../store/useStore';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

interface Props {
  params: {
    id: string;
  };
}

export default function StudentDetailPage({ params }: Props) {
  const { students } = useStore();
  const student = students.find((s: { id: string; }) => s.id === params.id);

  if (!student) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Link 
        href="/admin"
        className="inline-flex items-center mb-4 text-blue-600 hover:text-blue-800"
      >
        ← กลับไปหน้ารายชื่อ
      </Link>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          รายละเอียด Portfolio: {student.firstName} {student.lastName}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ข้อมูลพื้นฐาน */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">ข้อมูลส่วนตัว</h2>
            
            <div>
              <p className="text-sm text-gray-500">ชื่อ-นามสกุล</p>
              <p className="font-medium">{student.firstName} {student.lastName}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">ที่อยู่</p>
              <p className="font-medium">{student.address}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">โทรศัพท์</p>
              <p className="font-medium">{student.phone}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">โรงเรียน</p>
              <p className="font-medium">{student.school}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">GPA</p>
              <p className="font-medium">{student.gpa.toFixed(2)}</p>
            </div>
          </div>
          
          {/* ข้อมูลการสมัคร */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">ข้อมูลการสมัคร</h2>
            
            <div>
              <p className="text-sm text-gray-500">มหาวิทยาลัย</p>
              <p className="font-medium">{student.university}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">สาขา</p>
              <p className="font-medium">{student.faculty}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">เหตุผลในการสมัคร</p>
              <p className="font-medium">{student.reason}</p>
            </div>
          </div>
        </div>
        
        {/* ความสามารถพิเศษ */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">ความสามารถพิเศษ</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {student.talents.map((talent: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
              <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {talent}
              </span>
            ))}
          </div>
        </div>
        
        {/* กิจกรรม (ถ้ามี) */}
        {student.activities && student.activities.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">กิจกรรม</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {student.activities.map((activity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {activity}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* รางวัล (ถ้ามี) */}
        {student.awards && student.awards.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">รางวัล</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {student.awards.map((award: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {award}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* ผลงาน (ถ้ามี) */}
        {student.portfolio && student.portfolio.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">ผลงาน</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {student.portfolio.map((item: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}