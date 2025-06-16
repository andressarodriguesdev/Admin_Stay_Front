import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/Api";

export default function NovoCliente({
  onLogout,
  cliente,
  onVoltar,
  onNavigate,
}) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome || cliente.name || "");
      setCpf(cliente.cpf || "");
      setEmail(cliente.email || "");
      setTelefone(cliente.phone || "");
      setObservacoes(cliente.observacoes || "");
    }
  }, [cliente]);

  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mapeia os campos para os nomes esperados pela API (name, phone)
    const dados = {
      name: nome,
      cpf,
      email,
      phone: telefone,
      observacoes,
    };

    try {
      if (cliente && cliente.id) {
        await api.put(`/customers/${cliente.id}`, dados);
      } else {
        await api.post("/customers", dados);
      }
      onVoltar();
    } catch (erro) {
      console.error("Erro ao salvar cliente:", erro);
      alert("Erro ao salvar cliente. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="flex bg-[#FAF8F5] min-h-screen font-[Poppins]">
      {/* Header mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50">
        <Header onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />
      </div>

      {/* Sidebar desktop fixa */}
      <div className="hidden md:block w-64 fixed top-0 left-0 h-full z-40">
        <Sidebar onLogout={onLogout} onNavigate={onNavigate} />
      </div>

      {/* Sidebar mobile */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-40">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onLogout={onLogout}
            onNavigate={onNavigate}
          />
        </div>
      )}

      {/* Conteúdo principal */}
      <main className="flex justify-center bg-[#FAF8F5] min-h-screen w-full md:ml-1 px-4 mt-24 md:mt-10 lg:mt-6">
        <div className="max-w-2xl w-full">
          <h1 className="text-2xl font-bold tracking-widest text-[#1E1E1E] mb-1">
            Novo cliente
          </h1>
          <hr className="my-4 border-t border-gray-300" />
          <p className="text-sm text-[#333] mb-6">
            Preencha os detalhes abaixo para {cliente ? "editar" : "adicionar"}{" "}
            um cliente
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold text-[#1E1E1E]">
                Nome completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="ex, Maria Joaquina Oliveira"
                required
                className="mt-1 w-full px-4 py-2 rounded-md bg-[#ffff] shadow-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1E1E1E]">
                CPF <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={cpf}
                onChange={handleCpfChange}
                placeholder="000.000.000-00"
                required
                className="mt-1 w-full px-4 py-2 rounded-md bg-[#ffff] shadow-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1E1E1E]">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ex, ana@gmail.com"
                required
                className="mt-1 w-full px-4 py-2 rounded-md bg-[#ffff] shadow-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1E1E1E]">
                Telefone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="ex, (61) 99999-9999"
                required
                className="mt-1 w-full px-4 py-2 rounded-md bg-[#ffff] shadow-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1E1E1E] mb-1">
                Observações:
              </label>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-[#ffff] shadow-md text-[#1E1E1E] focus:outline-none"
              />
            </div>

            <div className="pt-4 space-y-2">
              <button
                type="submit"
                className="w-full py-2 rounded-full bg-gradient-to-r from-[#FF66B2] to-[#FF3380] text-white font-semibold text-base shadow-xl hover:brightness-110 hover:scale-[1.02] transition-all duration-300 animate-pulse"
              >
                {cliente ? "Atualizar Cliente" : "Salvar"}
              </button>
                <button
                type="button"
                onClick={onVoltar}
                className="w-full py-2 text-sm font-medium bg-blue-200 text-blue-800 rounded-full shadow hover:bg-blue-300 hover:text-blue-900 transition-colors duration-300 "
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
