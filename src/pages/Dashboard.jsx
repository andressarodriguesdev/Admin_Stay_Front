import React, { useState, useEffect } from "react";
import { Menu, RefreshCw } from "lucide-react";
import api from "../services/Api";

export default function Dashboard({
  onNovoCliente,
  onNovoQuarto,
  onNovaReserva,
  onListarReservas,
  onToggleMenu,
}) {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalReservations: 0,
      totalRooms: 0,
      totalCustomers: 0,
      availableRooms: 0,
      activeReservations: 0,
      scheduledReservations: 0,
    },
    recentActivities: [],
    activeReservations: [],
    upcomingCheckins: [],
    availableRooms: [],
    activeCustomers: [],
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [
        statsRes,
        activitiesRes,
        activeRes,
        upcomingRes,
        roomsRes,
        customersRes,
      ] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/dashboard/recent-activities"),
        api.get("/dashboard/active-reservations"),
        api.get("/dashboard/upcoming-checkins"),
        api.get("/dashboard/available-rooms"),
        api.get("/dashboard/active-customers"),
      ]);

      setDashboardData({
        stats: statsRes.data,
        recentActivities: activitiesRes.data,
        activeReservations: activeRes.data,
        upcomingCheckins: upcomingRes.data,
        availableRooms: roomsRes.data,
        activeCustomers: customersRes.data,
      });
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("pt-BR");
  const formatDateTime = (dateString) =>
    new Date(dateString).toLocaleString("pt-BR");

  const getStatusColor = (status) => {
    const colors = {
      SCHEDULED: "bg-yellow-100 text-yellow-700",
      IN_USE: "bg-blue-100 text-blue-700",
      FINISHED: "bg-green-100 text-green-700",
      CANCELED: "bg-red-100 text-red-700",
      ABSENCE: "bg-gray-100 text-gray-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const translateStatus = (status) => {
    const map = {
      SCHEDULED: "Agendado",
      IN_USE: "Em Uso",
      FINISHED: "Finalizado",
      CANCELED: "Cancelado",
      ABSENCE: "Ausência",
    };
    return map[status] || status;
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full text-zinc-800">
      <header className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-6" />
          <span className="text-[#1E1E1E] font-semibold text-lg">
            Admin Stay
          </span>
        </div>
        <button onClick={onToggleMenu}>
          <Menu className="w-6 h-6 text-zinc-700" />
        </button>
      </header>

      <main className="px-4 py-6 pt-10 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Painel de <span className="text-[#FF4293]">Gerenciamento</span>
          </h1>
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg disabled:opacity-50 text-sm md:text-base w-auto self-start md:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Atualizar</span>
            <span className="sm:hidden">Atualizar</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4293]"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
              <CardResumo
                cor="purple"
                emoji="📊"
                titulo="Reservas Ativas"
                valor={dashboardData.stats.activeReservations}
              />
              <CardResumo
                cor="pink"
                emoji="📅"
                titulo="Próximos Check-ins"
                valor={dashboardData.upcomingCheckins.length}
              />
              <CardResumo
                cor="yellow"
                emoji="🛏️"
                titulo="Quartos Disponíveis"
                valor={dashboardData.stats.availableRooms}
              />
              <CardResumo
                cor="green"
                emoji="👥"
                titulo="Clientes Ativos"
                valor={dashboardData.activeCustomers.length}
              />
            </div>

            <h2 className="text-lg font-semibold text-zinc-700">
              Ações Rápidas
            </h2>
            <hr className="my-4 border-t border-zinc-200" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              <BotaoAcao
                cor="bg-gradient-to-r from-pink-400 to-pink-500 text-white"
                texto="+ Nova Reserva"
                onClick={onNovaReserva}
              />
              <BotaoAcao
                cor="bg-gradient-to-r from-purple-200 to-purple-400 text-purple-900"
                texto="+ Novo Cliente"
                onClick={onNovoCliente}
              />
              <BotaoAcao
                cor="bg-gradient-to-r from-orange-200 to-orange-300 text-orange-900"
                texto="+ Novo Quarto"
                onClick={onNovoQuarto}
              />
              <BotaoAcao
                cor="bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-700"
                texto="Ver Todas as Reservas"
                onClick={onListarReservas}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-zinc-700 mb-4">
                  Próximos Check-ins (24h)
                </h3>
                {dashboardData.upcomingCheckins.length === 0 ? (
                  <p className="text-zinc-500">
                    Nenhum check-in nas próximas 24 horas
                  </p>
                ) : (
                  <div className="space-y-3">
                    {dashboardData.upcomingCheckins.slice(0, 5).map((r) => (
                      <div
                        key={r.id}
                        className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{r.customer.name}</p>
                          <p className="text-sm text-zinc-600">
                            Quarto {r.room.number}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {formatDateTime(r.checkin)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-zinc-700 mb-4">
                  Quartos Disponíveis
                </h3>
                {dashboardData.availableRooms.length === 0 ? (
                  <p className="text-zinc-500">Nenhum quarto disponível</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {dashboardData.availableRooms.slice(0, 8).map((room) => (
                      <div
                        key={room.id}
                        className="p-2 bg-green-50 rounded text-center"
                      >
                        <p className="font-medium">Quarto {room.number}</p>
                        <p className="text-xs text-zinc-600">{room.type}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-lg font-semibold text-zinc-700">
              Atividades Recentes
            </h2>
            <hr className="my-4 border-t border-zinc-200" />
            <p className="text-sm text-zinc-500 mb-4">
              Última atualização: {formatDateTime(lastUpdate)}
            </p>

            <div className="hidden lg:block overflow-x-auto rounded-xl shadow bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-zinc-100 text-zinc-600">
                  <tr>
                    <th className="px-4 py-3 text-left">Cliente</th>
                    <th className="px-4 py-3 text-left">Quarto</th>
                    <th className="px-4 py-3 text-left">Check-in</th>
                    <th className="px-4 py-3 text-left">Check-out</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Valor Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentActivities.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-8 text-center text-zinc-500"
                      >
                        Nenhuma atividade recente
                      </td>
                    </tr>
                  ) : (
                    dashboardData.recentActivities.map((reservation) => (
                      <tr
                        key={reservation.id}
                        className="border-t border-zinc-100"
                      >
                        <td className="px-4 py-3 font-medium text-zinc-800">
                          {reservation.customer.name}
                        </td>
                        <td className="px-4 py-3">
                          Quarto {reservation.room.number}
                        </td>
                        <td className="px-4 py-3">
                          {formatDate(reservation.checkin)}
                        </td>
                        <td className="px-4 py-3">
                          {formatDate(reservation.checkout)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                              reservation.status
                            )}`}
                          >
                            {translateStatus(reservation.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium">
                          R${" "}
                          {reservation.totalValue
                            ? reservation.totalValue.toFixed(2)
                            : "0,00"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="block lg:hidden space-y-4">
              {dashboardData.recentActivities.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow text-center text-zinc-500">
                  Nenhuma atividade recente
                </div>
              ) : (
                dashboardData.recentActivities.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="bg-white p-4 rounded-xl shadow border border-zinc-100"
                  >
                    <p className="font-semibold text-zinc-800">
                      {reservation.customer.name}
                    </p>
                    <p className="text-zinc-600">
                      Quarto {reservation.room.number}
                    </p>
                    <p className="text-sm text-zinc-500">
                      Check-in: {formatDate(reservation.checkin)}
                    </p>
                    <p className="text-sm text-zinc-500">
                      Check-out: {formatDate(reservation.checkout)}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(
                          reservation.status
                        )}`}
                      >
                        {translateStatus(reservation.status)}
                      </span>
                      <span className="font-medium">
                        R${" "}
                        {reservation.totalValue
                          ? reservation.totalValue.toFixed(2)
                          : "0,00"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function CardResumo({ cor, emoji, titulo, valor }) {
  const bgMap = {
    purple: "bg-purple-100 text-purple-700",
    pink: "bg-pink-100 text-pink-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
  };

  return (
    <div
      className={`flex flex-col justify-center p-4 rounded-2xl shadow hover:shadow-md transition ${bgMap[cor]}`}
    >
      <div className="text-2xl mb-2">{emoji}</div>
      <p className="text-sm text-zinc-700">{titulo}</p>
      <p className="text-xl font-bold text-zinc-900">{valor}</p>
    </div>
  );
}

function BotaoAcao({ cor, texto, onClick }) {
  return (
    <button
      className={`${cor} text-sm font-semibold px-4 py-4 rounded-2xl shadow transition-transform hover:scale-105 hover:shadow-lg`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
}
