import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/Api"; // Importar a instância do axios configurada

export default function NovaReserva({ onVoltar, onLogout, onNavigate }) {
  const [reserva, setReserva] = useState({
    clienteId: "",
    numeroQuarto: "",
    checkIn: "",
    checkOut: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [quartos, setQuartos] = useState([]); // Novo estado para quartos
  const [loadingClientes, setLoadingClientes] = useState(true);
  const [loadingQuartos, setLoadingQuartos] = useState(true);

  // Efeito para buscar clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/customers");
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        alert("Erro ao buscar clientes. Verifique se o backend está rodando.");
      } finally {
        setLoadingClientes(false);
      }
    };

    fetchClientes();
  }, []);

  // Efeito para buscar quartos disponíveis
  useEffect(() => {
    const fetchQuartos = async () => {
      try {
        const response = await api.get("/rooms"); 
        console.log("Dados de quartos recebidos:", response.data); // Log para depuração
        // Filtrar quartos com status 'FREE' ou 'DISPONIVEL'
        const quartosDisponiveis = response.data.filter(room => 
          room.status === 'FREE' || room.status === 'DISPONIVEL'
        );
        setQuartos(quartosDisponiveis);
      } catch (error) {
        console.error("Erro ao buscar quartos:", error);
        alert("Erro ao buscar quartos. Verifique se o backend está rodando.");
      } finally {
        setLoadingQuartos(false);
      }
    };

    fetchQuartos();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateTimeForBackend = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Função para lidar com navegação do sidebar
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica de campos
    if (!reserva.clienteId || !reserva.numeroQuarto || !reserva.checkIn || !reserva.checkOut) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validação de datas
    const checkInDate = new Date(reserva.checkIn);
    const checkOutDate = new Date(reserva.checkOut);
    if (checkOutDate <= checkInDate) {
      alert("A data de check-out deve ser posterior à data de check-in.");
      return;
    }

    const payload = {
      customerId: parseInt(reserva.clienteId),
      roomNumber: reserva.numeroQuarto,
      checkin: formatDateTimeForBackend(reserva.checkIn),
      checkout: formatDateTimeForBackend(reserva.checkOut),
    };

    try {
      const response = await api.post("/reservations", payload);
      console.log("Reserva criada com sucesso:", response.data);
      
      alert("Reserva criada com sucesso!");
      onNavigate("listarReservas"); // ✅ CORRIGIDO: "listarReservas" com R maiúsculo
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      // Melhor tratamento de erro para Axios
      const errorMessage = error.response?.data?.message || error.message || "Erro desconhecido";
      alert("Erro ao criar reserva: " + errorMessage);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F9F6EF] font-[Poppins] flex flex-col md:flex-row relative">
      {/* Sidebar para desktop */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50">
            <Header onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />
          </div>
    
          {/* Sidebar desktop fixa */}
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

      <div
        className={`flex-1 w-full px-6 md:px-10 lg:px-20 ${
          isDesktop ? "pt-12" : "pt-24"
        } flex justify-center`}
      >
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-semibold mb-1 text-[#1E1E1E]">
            Nova reserva
          </h1>
          <hr className="my-4 border-t border-gray-300" />
          <p className="text-sm md:text-base mb-6 text-gray-600">
            Preencha os detalhes abaixo para adicionar uma nova reserva ao
            sistema
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-bold block mb-1">
                Cliente <span className="text-red-500">*</span>
              </label>
              <select
                name="clienteId"
                value={reserva.clienteId}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-lg shadow bg-[#e8e4f4] focus:outline-none"
                disabled={loadingClientes}
              >
                <option value="">{loadingClientes ? "Carregando clientes..." : "Selecione o cliente"}</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.name} (ID: {cliente.id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold block mb-1">
                Número do Quarto <span className="text-red-500">*</span>
              </label>
              <select
                name="numeroQuarto"
                value={reserva.numeroQuarto}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-lg shadow bg-[#e8e4f4] focus:outline-none"
                disabled={loadingQuartos}
              >
                <option value="">{loadingQuartos ? "Carregando quartos..." : "Selecione o quarto"}</option>
                {quartos.map((quarto) => (
                  <option key={quarto.id} value={quarto.number}>
                    {quarto.number} - {quarto.type} (R$ {quarto.dailyRate.toFixed(2)}/diária)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold block mb-1">
                Check-in <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="checkIn"
                value={reserva.checkIn}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-lg shadow bg-[#e8e4f4] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">
                Check-out <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="checkOut"
                value={reserva.checkOut}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-lg shadow bg-[#e8e4f4] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <button
                type="submit"
                className="w-full py-2 rounded-full bg-gradient-to-r from-[#FF66B2] to-[#FF3380] text-white font-semibold text-base shadow-xl hover:brightness-110 hover:scale-[1.02] transition-all duration-300 animate-pulse"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={onVoltar}
                className="w-full text-sm py-2 font-medium text-[#666] bg-[#F1EDF8] rounded-full hover:bg-[#e2dbee] transition duration-300 shadow"
              >
                Cancelar / Voltar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

