// src/app/admin/page.tsx
import StudentTable from '../components/StudentTable';

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <StudentTable />
    </div>
  );
}