import React from "react";
import { LogOut, Home, Users, BedDouble, CalendarDays } from "lucide-react";

export default function Sidebar({ isOpen, onClose, onLogout, onNavigate }) {
  return (
    <>
      {/* Fundo escuro ao abrir no mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
          md:static
          absolute md:relative
          top-0 left-0
          w-64 
          bg-white 
          shadow-xl 
          rounded-r-3xl 
          z-50 
          transition-transform duration-300 
          flex flex-col
          min-h-full
        `}
      >
        {/* Topo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-6 h-6" />
            <h1 className="text-xl font-bold text-[#FF4293]">Admin Stay</h1>
          </div>
        </div>

        {/* Navegação */}
        <nav className="flex flex-col gap-2 p-4 text-gray-700 font-medium text-sm">
          <SidebarButton icon={<Home size={18} />} text="Painel" onClick={() => onNavigate("dashboard")} />
          <SidebarButton icon={<Users size={18} />} text="Clientes" onClick={() => onNavigate("listarClientes")} />
          <SidebarButton icon={<BedDouble size={18} />} text="Quartos" onClick={() => onNavigate("listarQuartos")} />
          <SidebarButton icon={<CalendarDays size={18} />} text="Reservas" onClick={() => onNavigate("listarReservas")} />
        </nav>

        {/* Sair */}
        <div className="mt-auto px-4 py-6 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium transition"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}

function SidebarButton({ icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-[#F4F1FD] transition w-full text-left"
    >
      {icon}
      {text}
    </button>
  );
}
