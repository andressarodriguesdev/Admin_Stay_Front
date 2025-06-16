import React, { useState } from "react";
import api from "../services/Api";

export default function Login({ onNavigate, onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Limpar erro quando usuário começar a digitar
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validação básica
    if (!formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        // Salvar dados do usuário no localStorage se "lembrar" estiver marcado
        if (formData.rememberMe) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("isLoggedIn", "true");
        } else {
          // Usar sessionStorage para sessão temporária
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          sessionStorage.setItem("isLoggedIn", "true");
        }

        // Chamar callback de login bem-sucedido
        onLogin(response.data.user);
      } else {
        setError(response.data.message || "Erro no login");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro de conexão. Verifique se o servidor está rodando.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1edf9] px-4 relative z-0 overflow-hidden">
      {/* Fundo decorativo - apenas para DESKTOP */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <div className="absolute -left-40 -top-32 w-[400px] h-[400px] bg-[#ffb2d4] rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute -bottom-40 left-[50%] transform -translate-x-1/2 w-[600px] h-[600px] bg-[#d9ffc3] rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute -right-40 -top-20 w-[400px] h-[400px] bg-[#fff5b8] rounded-full opacity-30 blur-2xl"></div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden w-[330px] rounded-[28px] bg-[#f8f8f8] shadow-lg p-6 pt-10 text-center relative overflow-hidden z-10">
        <img
          src="/texture.png"
          alt="Textura"
          className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none rounded-[28px]"
        />
        <div className="relative z-10">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 mx-auto mb-2" />
          <h1 className="font-bold text-xl text-black">Admin Stay</h1>
          <p className="text-[13px] text-[#212121] opacity-60 mb-8">
            Tecnologia que hospeda soluções.
          </p>

          <h2 className="tracking-[0.2em] text-[#212121] text-sm font-semibold mb-4">
            LOGIN
          </h2>

          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow">
              <img src="/icon.png" alt="Usuário" className="w-4 h-4 mr-3 opacity-60" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-MAIL"
                className="text-xs bg-transparent w-full focus:outline-none text-[#212121] placeholder-[#A49A9A]"
                disabled={loading}
              />
            </div>
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow">
              <img src="/cadeado.png" alt="Senha" className="w-4 h-4 mr-3 opacity-60" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="**********"
                className="text-xs bg-transparent w-full focus:outline-none text-[#212121] placeholder-[#A49A9A]"
                disabled={loading}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] mt-2 px-2">
              <label className="text-[#212121] opacity-60">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-1"
                  disabled={loading}
                />
                Lembrar meu usuário
              </label>
              <a href="#" className="text-[#FF5C8A]">Esqueceu a senha?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-[#FF5C8A] text-white py-2 rounded-full shadow-md font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="mt-4 text-[12px] text-[#212121] opacity-60">
            Não tem uma conta?{" "}
            <button
              onClick={onNavigate}
              className="text-[#FF5C8A] font-semibold"
              disabled={loading}
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:flex w-full max-w-[1000px] md:h-[700px] flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden relative z-10">
        {/* Lado esquerdo */}
        <div className="w-[45%] bg-[#ede4f5] flex flex-col justify-center items-center p-10">
          <div className="flex flex-col items-center text-center gap-6">
            <img src="/logo.png" alt="Logo" className="w-13 h-13" />

            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#FF5C8A] to-[#A45CFF] text-transparent bg-clip-text">
              Admin Stay
            </h1>

            <p className="text-[#212121] text-sm opacity-70 max-w-[200px]">
              Tecnologia que hospeda soluções.
            </p>

            <button
              onClick={onNavigate}
              disabled={loading}
              className="mt-4 px-6 py-2 bg-[#FF5C8A] text-white text-sm font-semibold rounded-full shadow-md hover:brightness-105 transition-all disabled:opacity-50"
            >
              Cadastre-se
            </button>
          </div>
        </div>

        {/* Divisória */}
        <div className="w-[1px] bg-[#E0E0E0]"></div>

        {/* Lado direito - Login */}
        <div className="w-1/2 flex flex-col justify-center px-12 relative overflow-hidden">
          <img
            src="/texture.png"
            alt="Textura"
            className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
          />
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-[#212121] mb-10 text-center">LOGIN</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow">
                <img src="/icon.png" alt="Usuário" className="w-4 h-4 mr-3 opacity-60" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-MAIL"
                  className="text-sm bg-transparent w-full focus:outline-none text-[#212121] placeholder-[#A49A9A]"
                  disabled={loading}
                />
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow">
                <img src="/cadeado.png" alt="Senha" className="w-4 h-4 mr-3 opacity-60" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="**********"
                  className="text-sm bg-transparent w-full focus:outline-none text-[#212121] placeholder-[#A49A9A]"
                  disabled={loading}
                />
              </div>

              <div className="flex justify-between items-center text-xs mt-2 px-1">
                <label className="text-[#212121] opacity-60">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-1"
                    disabled={loading}
                  />
                  Lembrar meu usuário
                </label>
                <a href="#" className="text-[#FF5C8A]">Esqueceu a senha?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-[#FF5C8A] text-white py-2 rounded-full shadow-md font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <p className="mt-4 text-[12px] text-[#212121] opacity-60 text-center w-full">
              Não tem uma conta?{" "}
              <button
                onClick={onNavigate}
                disabled={loading}
                className="text-[#FF5C8A] font-semibold disabled:opacity-50"
              >
                Cadastre-se
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

