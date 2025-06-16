import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../services/Api";

export default function ListarClientes({
  onVoltar,
  onEditar,
  onMenuToggle,
}) {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarClientes() {
      try {
        const resposta = await api.get("/customers");
        setClientes(resposta.data);
      } catch (erro) {
        console.error("Erro ao carregar clientes:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarClientes();
  }, []);

  const excluirCliente = async (cliente) => {
    if (window.confirm(`Deseja excluir ${cliente.name}?`)) {
      try {
        await api.delete(`/customers/${cliente.id}`);
        setClientes((prev) => prev.filter((c) => c.id !== cliente.id));
      } catch (erro) {
        console.error("Erro ao excluir cliente:", erro);
        alert("Erro ao excluir cliente.");
      }
    }
  };

  return (
    <div className="flex-1 bg-[#FAF8F5] min-h-screen">
      {/* Header mobile */}
      <div className="md:hidden">
        <Header onMenuToggle={onMenuToggle} />
      </div>

      <div className="p-4 sm:p-6 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-[#1E1E1E] mb-6 tracking-widest">
          Clientes cadastrados
        </h1>
        <hr className="my-4 border-t border-gray-300" />

        {carregando ? (
          <p className="text-[#555]">Carregando clientes...</p>
        ) : clientes.length === 0 ? (
          <p className="text-[#555]">Nenhum cliente cadastrado.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {clientes.map((cliente, index) => (
              <div
                key={index}
                className="bg-white shadow p-4 rounded-xl text-[#1E1E1E] break-words max-w-full"
              >
                <p className="break-words">
                  <strong>Nome:</strong> {cliente.name}
                </p>
                <p className="break-words">
                  <strong>CPF:</strong> {cliente.cpf}
                </p>
                <p className="break-words">
                  <strong>Email:</strong> {cliente.email}
                </p>
                <p className="break-words">
                  <strong>Telefone:</strong> {cliente.phone}
                </p>
                {cliente.observacoes && (
                  <p className="break-words">
                    <strong>Obs:</strong> {cliente.observacoes}
                  </p>
                )}
                <div className="flex flex-wrap gap-3 mt-3">
                  <button
                    onClick={() => onEditar(cliente)}
                    className="px-3 py-1 bg-[#C8BFE7] text-[#1E1E1E] rounded-full text-sm hover:bg-[#b5a8db]"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirCliente(cliente)}
                    className="px-3 py-1 bg-[#F7C8D9] text-[#1E1E1E] rounded-full text-sm hover:bg-[#eab0c5]"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
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
