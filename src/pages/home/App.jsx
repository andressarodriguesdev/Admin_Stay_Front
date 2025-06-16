import React, { useState, useEffect } from "react";
import Login from "../Login";
import Cadastro from "../Cadastro";
import Dashboard from "../Dashboard";
import NovoCliente from "../NovoCliente";
import ListarClientes from "../ListarClientes";
import NovoQuarto from "../NovoQuarto";
import ListarQuartos from "../ListarQuartos";
import NovaReserva from "../NovaReserva";
import ListarReservas from "../ListarReservas";
import Sidebar from "../../components/Sidebar";

function App() {
  const [page, setPage] = useState("login");
  const [menuAberto, setMenuAberto] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);

  const [quartos, setQuartos] = useState([]);
  const [quartoEditando, setQuartoEditando] = useState(null);

  // Verificar se usuário está logado ao carregar a aplicação
  useEffect(() => {
    const checkAuthStatus = () => {
      // Verificar localStorage primeiro (lembrar usuário)
      const savedUser = localStorage.getItem("user");
      const savedLoginStatus = localStorage.getItem("isLoggedIn");

      if (savedUser && savedLoginStatus === "true") {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
        setPage("dashboard");
        return;
      }

      // Verificar sessionStorage (sessão temporária)
      const sessionUser = sessionStorage.getItem("user");
      const sessionLoginStatus = sessionStorage.getItem("isLoggedIn");

      if (sessionUser && sessionLoginStatus === "true") {
        setUser(JSON.parse(sessionUser));
        setIsLoggedIn(true);
        setPage("dashboard");
        return;
      }

      // Se não há dados de login, manter na tela de login
      setPage("login");
    };

    checkAuthStatus();
  }, []);

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  const navegarPara = (pagina) => {
    setPage(pagina);
    fecharMenu();
  };

  // Função de login
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setPage("dashboard");
  };

  // Função de logout
  const handleLogout = () => {
    // Limpar dados de autenticação
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("isLoggedIn");

    // Resetar estado
    setUser(null);
    setIsLoggedIn(false);
    setPage("login");
    fecharMenu();
  };

  // Clientes
  const salvarCliente = (cliente) => {
    if (clienteEditando) {
      setClientes((prev) =>
        prev.map((c) => (c === clienteEditando ? cliente : c))
      );
      setClienteEditando(null);
    } else {
      setClientes((prev) => [...prev, cliente]);
    }
    setPage("listarClientes");
  };

  const excluirCliente = (cliente) => {
    setClientes((prev) => prev.filter((c) => c !== cliente));
  };

  // Quartos
  const salvarQuarto = (quarto) => {
    if (quartoEditando) {
      setQuartos((prev) =>
        prev.map((q) => (q === quartoEditando ? quarto : q))
      );
      setQuartoEditando(null);
    } else {
      setQuartos((prev) => [...prev, quarto]);
    }
    setPage("listarQuartos");
  };

  const excluirQuarto = (quarto) => {
    setQuartos((prev) => prev.filter((q) => q !== quarto));
  };

  // Reservas
  const salvarReserva = (reserva) => {
    console.log("Reserva salva (mock):", reserva);
    setPage("listarReservas");
  };

  const paginasComSidebar = [
    "dashboard",
    "novoCliente",
    "listarClientes",
    "novoQuarto",
    "listarQuartos",
    "novaReserva",
    "listarReservas",
  ];

  const renderizarSidebar = () => {
    if (!paginasComSidebar.includes(page) || !isLoggedIn) return null;

    return (
      <>
        {/* Sidebar fixo no desktop */}
        <div className="hidden md:block">
          <Sidebar
            isOpen={true}
            onClose={() => {}}
            onLogout={handleLogout}
            onNavigate={navegarPara}
            user={user}
          />
        </div>

        {/* Sidebar mobile com overlay */}
        {menuAberto && (
          <div className="block md:hidden fixed inset-0 z-50 bg-black bg-opacity-40">
            <Sidebar
              isOpen={menuAberto}
              onClose={fecharMenu}
              onLogout={handleLogout}
              onNavigate={navegarPara}
              user={user}
            />
          </div>
        )}
      </>
    );
  };

  const renderizarPagina = () => {
    // Se não estiver logado, mostrar apenas login e cadastro
    if (!isLoggedIn) {
      switch (page) {
        case "login":
          return (
            <Login
              onNavigate={() => setPage("cadastro")}
              onLogin={handleLogin}
            />
          );
        case "cadastro":
          return (
            <Cadastro
              onNavigate={() => setPage("login")}
              onLogin={handleLogin}
            />
          );
        default:
          return (
            <Login
              onNavigate={() => setPage("cadastro")}
              onLogin={handleLogin}
            />
          );
      }
    }

    // Se estiver logado, mostrar páginas do sistema
    switch (page) {
      case "dashboard":
        return (
          <Dashboard
            onLogout={handleLogout}
            onNovoCliente={() => {
              setClienteEditando(null);
              setPage("novoCliente");
            }}
            onNovoQuarto={() => {
              setQuartoEditando(null);
              setPage("novoQuarto");
            }}
            onNovaReserva={() => setPage("novaReserva")}
            onListarReservas={() => setPage("listarReservas")}
            onToggleMenu={toggleMenu}
            user={user}
          />
        );
      case "novoCliente":
        return (
          <NovoCliente
            onSave={salvarCliente}
            cliente={clienteEditando}
            onVoltar={() => setPage("dashboard")}
            onLogout={handleLogout}
            onNavigate={navegarPara}
          />
        );
      case "listarClientes":
        return (
          <ListarClientes
            clientes={clientes}
            onEditar={(cliente) => {
              setClienteEditando(cliente);
              setPage("novoCliente");
            }}
            onExcluir={excluirCliente}
            onVoltar={() => setPage("dashboard")}
            onLogout={handleLogout}
            onNavigate={navegarPara}
            onMenuToggle={toggleMenu}
            onNovoCliente={() => setPage("novoCliente")}
          />
        );
      case "novoQuarto":
        return (
          <NovoQuarto
            quarto={quartoEditando}
            onSave={salvarQuarto}
            onVoltar={() => setPage("dashboard")}
            onLogout={handleLogout}
            onNavigate={navegarPara}
          />
        );
      case "listarQuartos":
        return (
          <ListarQuartos
            quartos={quartos}
            onEditar={(quarto) => {
              setQuartoEditando(quarto);
              setPage("novoQuarto");
            }}
            onExcluir={excluirQuarto}
            onVoltar={() => setPage("dashboard")}
            onLogout={handleLogout}
            onNavigate={navegarPara}
            onMenuToggle={toggleMenu}
            onNovoQuarto={() => setPage("novoQuarto")}
          />
        );
      case "novaReserva":
        return (
          <NovaReserva
            onSalvar={salvarReserva}
            onVoltar={() => setPage("dashboard")}
            onLogout={handleLogout}
            onNavigate={navegarPara}
          />
        );
      case "listarReservas":
        return (
          <ListarReservas
            onVoltarDashboard={() => setPage("dashboard")}
            onLogout={handleLogout}
            onNavigate={navegarPara}
            onMenuToggle={toggleMenu}
            onNovaReserva={() => setPage("novaReserva")}
          />
        );
      default:
        return (
          <Dashboard
            onLogout={handleLogout}
            onNovoCliente={() => {
              setClienteEditando(null);
              setPage("novoCliente");
            }}
            onNovoQuarto={() => {
              setQuartoEditando(null);
              setPage("novoQuarto");
            }}
            onNovaReserva={() => setPage("novaReserva")}
            onListarReservas={() => setPage("listarReservas")}
            onToggleMenu={toggleMenu}
            user={user}
          />
        );
    }
  };

  return (
    <div className="flex bg-[#FAF8F5] min-h-screen relative">
      {renderizarSidebar()}
      <div className="flex-1 w-full">{renderizarPagina()}</div>
    </div>
  );
}

export default App;
