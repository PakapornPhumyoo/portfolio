'use client';
import { useState, useEffect } from 'react';

// Define the interface for a Student object to ensure type safety.
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  school: string;
  gpa: number;
  faculty: string;
  major: string;
  university: string;
  personalStatement: string;
  talents: string[];
  activities: string[];
  awards: string[];
  portfolio: string[];
}

// Mock student data to demonstrate the component. In a real application, this data would be fetched from Firestore or an API.
const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    firstName: 'สมชาย',
    lastName: 'ยอดเยี่ยม',
    email: 'somchai.y@example.com',
    phone: '081-123-4567',
    dob: '2005-01-15',
    gender: 'ชาย',
    school: 'โรงเรียนเตรียมอุดมศึกษา',
    gpa: 3.95,
    faculty: 'วิศวกรรมศาสตร์',
    major: 'คอมพิวเตอร์',
    university: 'จุฬาลงกรณ์มหาวิทยาลัย',
    personalStatement: 'ผมมีความหลงใหลในการเขียนโปรแกรมและต้องการพัฒนาโปรแกรมที่ช่วยแก้ปัญหาในชีวิตประจำวัน',
    talents: ['เขียนโปรแกรม', 'เล่นกีต้าร์'],
    activities: ['ประธานชมรมคอมพิวเตอร์'],
    awards: ['รางวัลชนะเลิศการแข่งขันเขียนโค้ดระดับประเทศ'],
    portfolio: ['github.com/somchai-dev']
  },
  {
    id: '2',
    firstName: 'สมศรี',
    lastName: 'งามสง่า',
    email: 'somsri.n@example.com',
    phone: '082-987-6543',
    dob: '2005-03-22',
    gender: 'หญิง',
    school: 'โรงเรียนสาธิตจุฬาลงกรณ์มหาวิทยาลัย',
    gpa: 3.88,
    faculty: 'อักษรศาสตร์',
    major: 'ภาษาอังกฤษ',
    university: 'มหาวิทยาลัยธรรมศาสตร์',
    personalStatement: 'ฉันมีความสนใจในวรรณคดีอังกฤษและต้องการศึกษาเชิงลึกเพื่อเป็นนักเขียน',
    talents: ['เขียนบทความ', 'พูดในที่สาธารณะ'],
    activities: ['บรรณาธิการนิตยสารโรงเรียน'],
    awards: ['รางวัลบทความดีเด่น'],
    portfolio: ['somsri-writer.com']
  },
];

export default function StudentDetailPage() {
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);

  useEffect(() => {
    // Read the student ID from the URL hash to simulate dynamic routing
    const handleHashChange = () => {
      const idFromHash = window.location.hash.slice(1);
      setCurrentStudentId(idFromHash || null);
    };

    handleHashChange(); // Initial check
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Find the student from the mock data based on the current ID.
  const student = currentStudentId ? MOCK_STUDENTS.find((s: Student) => s.id === currentStudentId) : undefined;

  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ไม่พบนักเรียน</h1>
          <p className="text-gray-600">ไม่พบข้อมูลสำหรับ ID ที่ระบุ</p>
          <a
            href="#"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
          >
            กลับไปหน้าหลัก (ตัวอย่าง)
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <a 
        href="#"
        className="inline-flex items-center mb-4 text-blue-600 hover:text-blue-800"
      >
        ← กลับไปหน้าหลัก
      </a>
      
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
              <p className="text-sm text-gray-500">อีเมล</p>
              <p className="font-medium">{student.email}</p>
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
              <p className="text-sm text-gray-500">คณะและสาขา</p>
              <p className="font-medium">{student.faculty} - {student.major}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">จดหมายแนะนำตัว</p>
              <p className="font-medium">{student.personalStatement}</p>
            </div>
          </div>
        </div>
        
        {/* ความสามารถพิเศษ */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">ความสามารถพิเศษ</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {student.talents.map((talent: string, index: number) => (
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
              {student.activities.map((activity: string, index: number) => (
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
              {student.awards.map((award: string, index: number) => (
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
              {student.portfolio.map((item: string, index: number) => (
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
