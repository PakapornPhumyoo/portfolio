// src/app/admin/[id]/page.tsx
'use client';

import { use } from 'react';
import { useStore } from '../../store/useStore';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export default function StudentDetailPage({ params }: Props) {
  // ใช้ React.use() เพื่อ unwrap params Promise
  const unwrappedParams = use(params);
  const { students } = useStore();

  // ใช้ id จาก params ที่ unwrapped แล้ว
  const student = students.find(s => s.id === unwrappedParams.id);

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
        {/* ส่วนหัวพร้อมรูปภาพ */}
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0 mr-4">
            {student.image ? (
              <img
                className="h-24 w-24 rounded-full object-cover border-4 border-blue-100"
                src={student.image}
                alt={`${student.firstName} ${student.lastName}`}
                onError={(e) => {
                  // หากรูปภาพโหลดไม่สำเร็จ ให้แสดง fallback
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.nextSibling instanceof HTMLElement) {
                    target.nextSibling.style.display = 'flex';
                  }
                }}
              />
            ) : null}
            {!student.image && (
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-100">
                <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {student.firstName} {student.lastName}
            </h1>
            <p className="text-gray-600">{student.age} ปี</p>
            <p className="text-gray-600">{student.school}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ข้อมูลพื้นฐาน */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">ข้อมูลส่วนตัว</h2>

            <div>
              <p className="text-sm text-gray-500">ชื่อ-นามสกุล</p>
              <p className="font-medium">{student.firstName} {student.lastName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">วันเกิด</p>
              <p className="font-medium">
                {student.birthDay && student.birthMonth && student.birthYear
                  ? `${student.birthDay}/${student.birthMonth}/${student.birthYear}`
                  : 'ไม่มีข้อมูล'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">อายุ</p>
              <p className="font-medium">{student.age || 'ไม่มีข้อมูล'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">เพศ</p>
              <p className="font-medium">
                {student.gender === 'male' ? 'ชาย' :
                  student.gender === 'female' ? 'หญิง' :
                    student.gender === 'other' ? 'อื่นๆ' : 'ไม่มีข้อมูล'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">โทรศัพท์</p>
              <p className="font-medium">{student.phone || 'ไม่มีข้อมูล'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">ที่อยู่</p>
              <p className="font-medium">{student.address || 'ไม่มีข้อมูล'}</p>
            </div>
          </div>

          {/* ข้อมูลการศึกษา */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">ข้อมูลการศึกษา</h2>

            <div>
              <p className="text-sm text-gray-500">โรงเรียน</p>
              <p className="font-medium">{student.school || 'ไม่มีข้อมูล'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">GPA</p>
              <p className="font-medium">{student.gpa ? student.gpa.toFixed(2) : 'ไม่มีข้อมูล'}</p>
            </div>

            <h2 className="text-lg font-semibold text-gray-700">ข้อมูลการสมัคร</h2>
            <div>
              <p className="text-sm text-gray-500">มหาวิทยาลัย</p>
              <p className="font-medium">{student.university || 'ไม่มีข้อมูล'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">คณะ</p>
              <p className="font-medium">{student.faculty || 'ไม่มีข้อมูล'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">สาขา</p>
              <p className="font-medium">{student.major || 'ไม่มีข้อมูล'}</p>
            </div>
          </div>
        </div>

        {/* เหตุผลในการสมัคร */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">เหตุผลในการสมัครเข้าเรียน</h2>
          <p className="mt-2 p-4 bg-gray-50 rounded-lg">
            {student.reason || 'ไม่มีข้อมูล'}
          </p>
        </div>

        {/* ความสามารถพิเศษ */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">ความสามารถพิเศษ</h2>
          {student.talents && student.talents.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {student.talents.map((talent, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {talent}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">ไม่มีข้อมูล</p>
          )}
        </div>

        {/* กิจกรรม (ถ้ามี) */}
        {student.activities && student.activities.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">กิจกรรม</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {student.activities.map((activity, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
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
              {student.awards.map((award, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
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
              {student.portfolio.map((item, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
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