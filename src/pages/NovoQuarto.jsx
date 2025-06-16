import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/Api";

export default function NovoQuarto({ onLogout, onNavigate, quarto }) {
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (quarto) {
      setNumero(quarto.number || "");
      setTipo(quarto.type || "");
      setValor(quarto.dailyRate?.toString() || "");
    } else {
      setNumero("");
      setTipo("");
      setValor("");
    }
  }, [quarto]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosQuarto = {
      id: quarto?.id || 0,
      number: numero,
      type: tipo.toUpperCase(),
      dailyRate: parseFloat(valor),
      status: "DISPONIVEL",
    };

    try {
      if (quarto && quarto.id) {
        await api.put(`/rooms/${quarto.id}`, dadosQuarto);
        alert("Quarto atualizado com sucesso!");
      } else {
        await api.post("/rooms", dadosQuarto);
        alert("Quarto cadastrado com sucesso!");
      }

      onNavigate("listarQuartos");
    } catch (error) {
      console.error("Erro ao salvar quarto:", error.response?.data || error);
      alert("Erro ao salvar o quarto. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="flex bg-[#F9F6EF] min-h-screen font-[Poppins]">
      {/* Header mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50">
        <Header onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />
      </div>

      {/* Sidebar desktop */}
      <div className="hidden md:block w-64 fixed top-0 left-0 h-full z-40">
        <Sidebar onLogout={onLogout} onNavigate={onNavigate} />
      </div>

      {/* Sidebar mobile */}
      <div className="md:hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={onLogout}
          onNavigate={onNavigate}
        />
      </div>

      <main className="flex items-start justify-center bg-[#FAF8F5] min-h-screen pt-6 md:pt-12 w-full md:ml-1 px-4">
        <div className="w-full max-w-2xl mx-auto px-6">
          <h1 className="text-2xl font-bold tracking-widest text-[#1E1E1E] mb-1">
            {quarto ? "Editar quarto" : "Novo quarto"}
          </h1>
          <hr className="my-4 border-t border-gray-300" />
          <p className="text-sm text-[#333] mb-6">
            Preencha os detalhes abaixo para {quarto ? "editar" : "adicionar"} um quarto
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-bold text-[#1E1E1E] mb-1">
                Número do quarto <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="ex, 101"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#E5E2F5] shadow-md placeholder:text-[#888] text-[#1E1E1E] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[#1E1E1E] mb-1">
                Valor da diária <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="ex, 150.00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#E5E2F5] shadow-md placeholder:text-[#888] text-[#1E1E1E] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[#1E1E1E] mb-1">
                Tipo do quarto <span className="text-red-500">*</span>
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#E5E2F5] shadow-md text-[#1E1E1E] focus:outline-none"
                required
              >
                <option value="">Selecione o tipo de quarto</option>
                <option value="PRATA">PRATA</option>
                <option value="OURO">OURO</option>
                <option value="DIAMANTE">DIAMANTE</option>
                <option value="PRESIDENCIAL">PRESIDENCIAL</option>
              </select>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <button
                type="submit"
                className="w-full py-2 rounded-full bg-gradient-to-r from-[#FF66B2] to-[#FF3380] text-white font-semibold text-base shadow-xl hover:brightness-110 hover:scale-[1.02] transition-all duration-300"
              >
                {quarto ? "Salvar alterações" : "Salvar"}
              </button>
              <button
                type="button"
                onClick={() => onNavigate("dashboard")}
                className="w-full text-sm py-2 font-medium text-[#666] bg-[#F1EDF8] rounded-full hover:bg-[#e2dbee] transition duration-300 shadow"
              >
                Cancelar / Voltar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
