// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';

const inter = Inter({ 
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TCAS69 Portfolio System',
  description: 'ระบบจัดการ Portfolio สำหรับสมัคร TCAS69',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-full bg-gradient-to-br from-slate-50 to-blue-50`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-slate-800 text-white py-6 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p>TCAS69 Portfolio System © {new Date().getFullYear()}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}