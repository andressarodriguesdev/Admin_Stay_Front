import React from "react";

export default function Header({ onMenuToggle }) {
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-white shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-6" />
        <span className="text-[#1E1E1E] font-semibold text-lg">Admin Stay</span>
      </div>

      {/* Botão hambúrguer aparece só no mobile */}
      <button onClick={onMenuToggle} className="md:hidden focus:outline-none" aria-label="Toggle Menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
}
