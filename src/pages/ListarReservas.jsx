import React, { useState, useEffect } from "react";
import HeaderMobile from "../components/Header";
import api from "../services/Api";

export default function ListarReservas({
  onVoltarDashboard,
  onMenuToggle,
  onNovaReserva,
}) {
  const [reservas, setReservas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 900px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 900px)");
    const handleResize = () => setIsDesktop(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    async function carregarReservas() {
      try {
        const response = await api.get("/reservations");
        setReservas(response.data);
      } catch (error) {
        console.error("Erro ao carregar reservas:", error);
        setErro(
          "Erro ao carregar reservas. Verifique se o backend está rodando."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarReservas();
  }, []);

  const handleExcluir = async (id) => {
    if (window.confirm("Deseja realmente excluir esta reserva?")) {
      try {
        await api.delete(`/reservations/${id}`);
        setReservas((prev) => prev.filter((r) => r.id !== id));
        setReservaSelecionada(null);
        alert("Reserva excluída com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir reserva:", error);
        alert(
          "Erro ao excluir reserva: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  const formatDateTime = (dateString) =>
    new Date(dateString).toLocaleString("pt-BR");

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStatusColor = (status) => {
    const colors = {
      SCHEDULED: "bg-yellow-100 text-yellow-700",
      IN_USE: "bg-blue-100 text-blue-700",
      FINISHED: "bg-green-100 text-green-700",
      CANCELED: "bg-red-100 text-red-700",
      ABSENCE: "bg-gray-100 text-gray-700",
    };
    return colors[status?.toUpperCase()] || "bg-gray-100 text-gray-700";
  };

  const translateStatus = (status) => {
    const map = {
      SCHEDULED: "Agendado",
      IN_USE: "Em Uso",
      FINISHED: "Finalizado",
      CANCELED: "Cancelado",
      ABSENCE: "Ausência",
    };
    return map[status?.toUpperCase()] || status;
  };

  if (carregando) {
    return (
      <main className="flex-1 bg-[#FAF8F5] min-h-screen font-[Poppins] flex items-center justify-center">
        <p className="text-[#555]">Carregando reservas...</p>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="flex-1 bg-[#FAF8F5] min-h-screen font-[Poppins] flex items-center justify-center">
        <p className="text-red-600">{erro}</p>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#FAF8F5] min-h-screen font-[Poppins] pb-16">
      <div className="md:hidden sticky top-0 z-50 bg-[#FAF8F5]">
        <HeaderMobile title="Reservas" onMenuToggle={onMenuToggle} />
      </div>

      <div className="px-4 pt-6 max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-[#4B3CA4]">Reservas</h1>
            <button
              onClick={onNovaReserva}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300"
            >
              + Nova Reserva
            </button>
          </div>
          
          <hr className="my-4 border-t border-gray-300" />
        </div>

        {reservas.length === 0 ? (
          <p className="text-gray-500 text-center">
            Nenhuma reserva cadastrada.
          </p>
        ) : (
          <>
            {/* TABELA */}
            {isDesktop && (
              <div className="overflow-x-auto rounded-xl shadow bg-white">
                <table className="min-w-full text-left">
                  <thead className="bg-[#DDD3FA] text-[#4B3CA4] text-sm">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Cliente</th>
                      <th className="px-4 py-3">Quarto</th>
                      <th className="px-4 py-3">Check-in</th>
                      <th className="px-4 py-3">Check-out</th>
                      <th className="px-4 py-3">Valor Total</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservas.map((reserva, index) => (
                      <tr
                        key={reserva.id}
                        onClick={() => setReservaSelecionada(reserva)}
                        className={`cursor-pointer hover:bg-purple-50 text-sm ${
                          index % 2 === 0 ? "bg-[#F4F0FF]" : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-3">{reserva.id}</td>
                        <td className="px-4 py-3">
                          {reserva.customer?.name ||
                            `ID: ${reserva.customer?.id}`}
                        </td>
                        <td className="px-4 py-3">
                          {reserva.room?.number || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          {formatDateTime(reserva.checkin)}
                        </td>
                        <td className="px-4 py-3">
                          {formatDateTime(reserva.checkout)}
                        </td>
                        <td className="px-4 py-3">
                          {formatCurrency(reserva.totalValue)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                              reserva.status
                            )}`}
                          >
                            {translateStatus(reserva.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExcluir(reserva.id);
                            }}
                            className="text-red-500 hover:text-red-700 underline"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* CARDS */}
            {!isDesktop && (
              <div className="space-y-4 mt-2">
                {reservas.map((reserva) => (
                  <div
                    key={reserva.id}
                    className="bg-white p-4 rounded-xl shadow"
                    onClick={() => setReservaSelecionada(reserva)}
                  >
                    <p className="text-sm">
                      <strong>ID:</strong> {reserva.id}
                    </p>
                    <p className="text-sm">
                      <strong>Cliente:</strong>{" "}
                      {reserva.customer?.name || `ID: ${reserva.customer?.id}`}
                    </p>
                    <p className="text-sm">
                      <strong>Quarto:</strong> {reserva.room?.number || "N/A"}
                    </p>
                    <p className="text-sm">
                      <strong>Check-in:</strong>{" "}
                      {formatDateTime(reserva.checkin)}
                    </p>
                    <p className="text-sm">
                      <strong>Check-out:</strong>{" "}
                      {formatDateTime(reserva.checkout)}
                    </p>
                    <p className="text-sm">
                      <strong>Valor Total:</strong>{" "}
                      {formatCurrency(reserva.totalValue)}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <strong>Status:</strong>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          reserva.status
                        )}`}
                      >
                        {translateStatus(reserva.status)}
                      </span>
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExcluir(reserva.id);
                      }}
                      className="mt-3 text-red-600 text-sm underline hover:text-red-800"
                    >
                      Excluir
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Detalhes */}
            {reservaSelecionada && (
              <div className="mt-8 p-6 bg-white rounded-xl shadow max-w-2xl mx-auto">
                <h2 className="text-lg font-semibold mb-4 text-[#4B3CA4]">
                  Detalhes da Reserva
                </h2>
                <p>
                  <strong>ID:</strong> {reservaSelecionada.id}
                </p>
                <p>
                  <strong>Cliente:</strong>{" "}
                  {reservaSelecionada.customer?.name ||
                    `ID: ${reservaSelecionada.customer?.id}`}
                </p>
                {reservaSelecionada.customer?.cpf && (
                  <p>
                    <strong>CPF:</strong> {reservaSelecionada.customer.cpf}
                  </p>
                )}
                {reservaSelecionada.customer?.telefone && (
                  <p>
                    <strong>Telefone:</strong>{" "}
                    {reservaSelecionada.customer.telefone}
                  </p>
                )}
                {reservaSelecionada.customer?.email && (
                  <p>
                    <strong>E-mail:</strong> {reservaSelecionada.customer.email}
                  </p>
                )}
                <hr className="my-3" />
                <p>
                  <strong>Quarto:</strong>{" "}
                  {reservaSelecionada.room?.number || "N/A"}
                </p>
                <p>
                  <strong>Tipo:</strong>{" "}
                  {reservaSelecionada.room?.type || "N/A"}
                </p>
                <p>
                  <strong>Valor Diária:</strong>{" "}
                  {formatCurrency(reservaSelecionada.room?.dailyRate)}
                </p>
                <p>
                  <strong>Check-in:</strong>{" "}
                  {formatDateTime(reservaSelecionada.checkin)}
                </p>
                <p>
                  <strong>Check-out:</strong>{" "}
                  {formatDateTime(reservaSelecionada.checkout)}
                </p>
                <p>
                  <strong>Valor Total:</strong>{" "}
                  {formatCurrency(reservaSelecionada.totalValue)}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      reservaSelecionada.status
                    )}`}
                  >
                    {translateStatus(reservaSelecionada.status)}
                  </span>
                </p>
                <p>
                  <strong>Criado em:</strong>{" "}
                  {formatDateTime(reservaSelecionada.createAt)}
                </p>

                <button
                  onClick={() => setReservaSelecionada(null)}
                  className="mt-4 text-sm underline text-gray-600 hover:text-gray-800"
                >
                  Fechar detalhes
                </button>
              </div>
            )}
          </>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={onVoltarDashboard}
            className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300"
          >
            Voltar para o Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
