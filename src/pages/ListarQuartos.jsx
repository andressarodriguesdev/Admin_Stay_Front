import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListarQuartos({
  onVoltar,
  onEditar,
  onMenuToggle,
}) {
  const [quartos, setQuartos] = useState([]);

  useEffect(() => {
    buscarQuartos();
  }, []);

  const buscarQuartos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/rooms");
      setQuartos(response.data);
    } catch (error) {
      console.error("Erro ao buscar quartos:", error);
      alert("Erro ao carregar os quartos.");
    }
  };

  const excluirQuarto = async (id) => {
    const confirmar = window.confirm("Deseja excluir este quarto?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:8080/rooms/${id}`);
      buscarQuartos(); // Recarrega a lista após exclusão
    } catch (error) {
      console.error("Erro ao excluir quarto:", error);
      alert("Erro ao excluir o quarto.");
    }
  };

  return (
    <div className="flex-1 bg-[#FAF8F5] min-h-screen w-full">
      {/* Header mobile */}
      <div className="bg-white flex items-center justify-between px-4 py-4 shadow md:hidden">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-5 h-5" />
          <span className="text-[#1E1E1E] font-semibold text-lg tracking-wide">
            Admin Stay
          </span>
        </div>
        <button onClick={onMenuToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#1E1E1E]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Conteúdo principal */}
      <div className="px-4 md:px-8 lg:px-16 py-6 max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-bold tracking-widest text-[#1E1E1E] mb-4 text-center md:text-left">
          Quartos
        </h1>

        <hr className="my-4 border-t border-gray-300" />

        {quartos.length === 0 ? (
          <p className="text-sm text-[#333] text-center">
            Nenhum quarto cadastrado.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {quartos.map((quarto) => (
              <li
                key={quarto.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
              >
                <div>
                  <p className="text-[#1E1E1E] font-semibold mb-1">
                    Quarto {quarto.number}
                  </p>
                  <p className="text-sm text-[#555]">Tipo: {quarto.type}</p>
                  <p className="text-sm text-[#555]">
                    Valor diária: R$ {quarto.dailyRate.toFixed(2)}
                  </p>
                  <p className="text-sm text-[#555]">
                    Status: {quarto.status}
                  </p>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => onEditar(quarto)}
                    className="flex-1 px-4 py-2 rounded-full text-sm font-medium bg-[#D2C3F5] text-[#1E1E1E] shadow hover:bg-[#c3b2eb]"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirQuarto(quarto.id)}
                    className="flex-1 px-4 py-2 rounded-full text-sm font-medium bg-[#FFD4D4] text-[#1E1E1E] shadow hover:bg-[#ffc2c2]"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="pt-10 flex justify-center">
          <button
            onClick={onVoltar}
            className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300"
          >
            Voltar para o Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
