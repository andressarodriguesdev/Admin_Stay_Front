import React from 'react';
import Sidebar from './Sidebar';

const LayoutInterno = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f7f4eb] text-gray-800 relative">
      
      <main className="relative z-10 p-4">{children}</main>
    </div>
  );
};

export default LayoutInterno;
