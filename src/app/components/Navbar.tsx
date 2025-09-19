// src/components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-lg relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-playfair flex items-center">
          <span className="text-blue-300">TCAS</span>
          <span className="text-white bg-blue-500 px-2 py-1 rounded-md ml-2">69</span>
          <span className="ml-2">Portfolio</span>
        </Link>
        <div className="space-x-6">
          <Link href="/" className="hover:text-blue-300 transition-colors duration-200 font-medium relative group">
            แบบฟอร์มสมัคร
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link href="/admin" className="hover:text-blue-300 transition-colors duration-200 font-medium relative group">
            สำหรับอาจารย์
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-200 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;