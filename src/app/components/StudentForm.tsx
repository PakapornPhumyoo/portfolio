// src/components/StudentForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StudentFormData, studentSchema } from '../lib/validation';
import { useStore } from '../store/useStore';
import { useState, useEffect } from 'react';

const universities = [
  'จุฬาลงกรณ์มหาวิทยาลัย',
  'มหาวิทยาลัยธรรมศาสตร์',
  'มหาวิทยาลัยมหิดล',
  'มหาวิทยาลัยแม่โจ้',
  'มหาวิทยาลัยเชียงใหม่',
  // เพิ่มมหาวิทยาลัยอื่นๆ ตามต้องการ
];

const genders = [
  { value: 'male', label: 'ชาย' },
  { value: 'female', label: 'หญิง' },
  { value: 'other', label: 'อื่นๆ' },
];

const months = [
  { value: '01', label: 'มกราคม' },
  { value: '02', label: 'กุมภาพันธ์' },
  { value: '03', label: 'มีนาคม' },
  { value: '04', label: 'เมษายน' },
  { value: '05', label: 'พฤษภาคม' },
  { value: '06', label: 'มิถุนายน' },
  { value: '07', label: 'กรกฎาคม' },
  { value: '08', label: 'สิงหาคม' },
  { value: '09', label: 'กันยายน' },
  { value: '10', label: 'ตุลาคม' },
  { value: '11', label: 'พฤศจิกายน' },
  { value: '12', label: 'ธันวาคม' },
];

const StudentForm = () => {
  const { addStudent } = useStore();
  const [talents, setTalents] = useState<string[]>([]);
  const [currentTalent, setCurrentTalent] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [currentActivity, setCurrentActivity] = useState('');
  const [awards, setAwards] = useState<string[]>([]);
  const [currentAward, setCurrentAward] = useState('');
  const [portfolio, setPortfolio] = useState<string[]>([]);
  const [currentPortfolio, setCurrentPortfolio] = useState('');
  const [age, setAge] = useState<number | ''>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  const watchBirthDate = watch('birthDay');
  const watchBirthMonth = watch('birthMonth');
  const watchBirthYear = watch('birthYear');

  // คำนวณอายุอัตโนมัติเมื่อวันเกิดเปลี่ยนแปลง
  useEffect(() => {
    if (watchBirthDate && watchBirthMonth && watchBirthYear) {
      const birthDate = new Date(
        parseInt(watchBirthYear),
        parseInt(watchBirthMonth) - 1,
        parseInt(watchBirthDate)
      );
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      setAge(calculatedAge);
      setValue('age', calculatedAge);
    } else {
      setAge('');
      setValue('age', 0);
    }
  }, [watchBirthDate, watchBirthMonth, watchBirthYear, setValue]);

  const onSubmit = (data: StudentFormData) => {
    addStudent({
      ...data,
      talents,
      activities,
      awards,
      portfolio,
    });
    reset();
    setTalents([]);
    setActivities([]);
    setAwards([]);
    setPortfolio([]);
    setAge('');
    alert('ส่งแบบฟอร์มสำเร็จแล้ว!');
  };

  const addItem = (type: 'talent' | 'activity' | 'award' | 'portfolio') => {
    let currentValue, setCurrent, items, setItems;
    
    switch (type) {
      case 'talent':
        currentValue = currentTalent;
        setCurrent = setCurrentTalent;
        items = talents;
        setItems = setTalents;
        break;
      case 'activity':
        currentValue = currentActivity;
        setCurrent = setCurrentActivity;
        items = activities;
        setItems = setActivities;
        break;
      case 'award':
        currentValue = currentAward;
        setCurrent = setCurrentAward;
        items = awards;
        setItems = setAwards;
        break;
      case 'portfolio':
        currentValue = currentPortfolio;
        setCurrent = setCurrentPortfolio;
        items = portfolio;
        setItems = setPortfolio;
        break;
    }

    if (currentValue.trim() && !items.includes(currentValue)) {
      setItems([...items, currentValue]);
      if (type === 'talent') {
        setValue('talents', [...items, currentValue]);
      }
      setCurrent('');
    }
  };

  const removeItem = (type: 'talent' | 'activity' | 'award' | 'portfolio', item: string) => {
    let items, setItems;
    
    switch (type) {
      case 'talent':
        items = talents;
        setItems = setTalents;
        setValue('talents', items.filter(i => i !== item));
        break;
      case 'activity':
        items = activities;
        setItems = setActivities;
        break;
      case 'award':
        items = awards;
        setItems = setAwards;
        break;
      case 'portfolio':
        items = portfolio;
        setItems = setPortfolio;
        break;
    }

    setItems(items.filter(i => i !== item));
  };

  // สร้างตัวเลือกปี (ตั้งแต่ พ.ศ. 2540 ถึงปัจจุบัน)
  const currentYear = new Date().getFullYear() + 543; // แปลงเป็น พ.ศ.
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">แบบฟอร์มสมัคร Portfolio TCAS69</h2>
      
      {/* ส่วนข้อมูลส่วนตัว */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ชื่อ</label>
          <input 
            {...register('firstName')} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">นามสกุล</label>
          <input 
            {...register('lastName')} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* ข้อมูลวันเกิดและเพศ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">วันเกิด</label>
          <select 
            {...register('birthDay')} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            <option value="">วัน</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
              <option key={day} value={day.toString().padStart(2, '0')}>
                {day}
              </option>
            ))}
          </select>
          {errors.birthDay && <p className="text-red-500 text-sm">{errors.birthDay.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">เดือนเกิด</label>
          <select 
            {...register('birthMonth')} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            <option value="">เดือน</option>
            {months.map(month => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          {errors.birthMonth && <p className="text-red-500 text-sm">{errors.birthMonth.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ปีเกิด (พ.ศ.)</label>
          <select 
            {...register('birthYear')} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            <option value="">ปี</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.birthYear && <p className="text-red-500 text-sm">{errors.birthYear.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">อายุ</label>
          <input 
            type="number"
            value={age}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2 border"
          />
          <input type="hidden" {...register('age', { valueAsNumber: true })} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">เพศ</label>
          <select 
            {...register('gender')} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            <option value="">เลือกเพศ</option>
            {genders.map(gender => (
              <option key={gender.value} value={gender.value}>
                {gender.label}
              </option>
            ))}
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">หมายเลขโทรศัพท์</label>
          <input 
            {...register('phone')} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">ที่อยู่</label>
        <textarea 
          {...register('address')} 
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">โรงเรียน</label>
        <input 
          {...register('school')} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
        {errors.school && <p className="text-red-500 text-sm">{errors.school.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">GPA</label>
        <input 
          type="number" 
          step="0.01"
          min="0"
          max="4.0"
          {...register('gpa', { valueAsNumber: true })} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
        {errors.gpa && <p className="text-red-500 text-sm">{errors.gpa.message}</p>}
      </div>

      {/* ความสามารถพิเศษ */}
      <div>
        <label className="block text-sm font-medium text-gray-700">ความสามารถพิเศษ</label>
        <div className="flex mt-1">
          <input 
            value={currentTalent}
            onChange={(e) => setCurrentTalent(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="กรอกความสามารถพิเศษ"
          />
          <button 
            type="button"
            onClick={() => addItem('talent')}
            className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            เพิ่ม
          </button>
        </div>
        {errors.talents && <p className="text-red-500 text-sm">{errors.talents.message}</p>}
        
        <div className="mt-2 flex flex-wrap gap-2">
          {talents.map((talent, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {talent}
              <button 
                type="button"
                onClick={() => removeItem('talent', talent)}
                className="ml-1.5 rounded-full flex-shrink-0 h-4 w-4 inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* เหตุผลในการสมัคร */}
      <div>
        <label className="block text-sm font-medium text-gray-700">เหตุผลในการสมัครเข้าเรียน</label>
        <textarea 
          {...register('reason')} 
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          placeholder="อธิบายเหตุผลที่ต้องการสมัครเข้าศึกษาต่อ"
        />
        {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
      </div>

      {/* สาขาและมหาวิทยาลัย - แยกเป็นช่องอิสระ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">คณะ</label>
          <input 
            {...register('faculty')} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="กรอกชื่อคณะ"
          />
          {errors.faculty && <p className="text-red-500 text-sm">{errors.faculty.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">สาขา</label>
          <input 
            {...register('major')} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="กรอกชื่อสาขา"
          />
          {errors.major && <p className="text-red-500 text-sm">{errors.major.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">มหาวิทยาลัย</label>
        <select 
          {...register('university')} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        >
          <option value="">เลือกมหาวิทยาลัย</option>
          {universities.map((university, index) => (
            <option key={index} value={university}>{university}</option>
          ))}
        </select>
        {errors.university && <p className="text-red-500 text-sm">{errors.university.message}</p>}
      </div>

      {/* กิจกรรม (optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">กิจกรรมที่เข้าร่วม (optional)</label>
        <div className="flex mt-1">
          <input 
            value={currentActivity}
            onChange={(e) => setCurrentActivity(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="กรอกกิจกรรม"
          />
          <button 
            type="button"
            onClick={() => addItem('activity')}
            className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            เพิ่ม
          </button>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {activities.map((activity, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {activity}
              <button 
                type="button"
                onClick={() => removeItem('activity', activity)}
                className="ml-1.5 rounded-full flex-shrink-0 h-4 w-4 inline-flex items-center justify-center text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* รางวัล (optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">รางวัลที่เคยได้รับ (optional)</label>
        <div className="flex mt-1">
          <input 
            value={currentAward}
            onChange={(e) => setCurrentAward(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="กรอกรางวัล"
          />
          <button 
            type="button"
            onClick={() => addItem('award')}
            className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            เพิ่ม
          </button>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {awards.map((award, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {award}
              <button 
                type="button"
                onClick={() => removeItem('award', award)}
                className="ml-1.5 rounded-full flex-shrink-0 h-4 w-4 inline-flex items-center justify-center text-yellow-400 hover:bg-yellow-200 hover:text-yellow-500 focus:outline-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* ผลงาน (optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">ผลงาน (optional)</label>
        <div className="flex mt-1">
          <input 
            value={currentPortfolio}
            onChange={(e) => setCurrentPortfolio(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            placeholder="กรอกผลงาน"
          />
          <button 
            type="button"
            onClick={() => addItem('portfolio')}
            className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            เพิ่ม
          </button>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {portfolio.map((item, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {item}
              <button 
                type="button"
                onClick={() => removeItem('portfolio', item)}
                className="ml-1.5 rounded-full flex-shrink-0 h-4 w-4 inline-flex items-center justify-center text-purple-400 hover:bg-purple-200 hover:text-purple-500 focus:outline-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* อัพโหลดรูปภาพ (optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">รูปภาพนักเรียน (optional)</label>
        <input 
          type="file" 
          accept="image/*"
          {...register('image')}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium"
      >
        ส่งแบบฟอร์ม
      </button>
    </form>
  );
};

export default StudentForm;