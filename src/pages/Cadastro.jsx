import React, { useState } from "react";
import api from "../services/Api";

export default function Cadastro({ onNavigate, onLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpar mensagens quando usuário começar a digitar
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validação básica
    if (!formData.name || !formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess("Usuário cadastrado com sucesso!");
        
        // Salvar dados do usuário e fazer login automático
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("isLoggedIn", "true");

        // Aguardar um pouco para mostrar a mensagem de sucesso
        setTimeout(() => {
          onLogin(response.data.user);
        }, 1500);
      } else {
        setError(response.data.message || "Erro no cadastro");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
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
    <div className="min-h-screen flex items-center justify-center bg-[#E5E2F5] px-4">
      <div className="w-[360px] rounded-[28px] bg-[#f8f8f8] shadow-lg p-6 pt-10 text-center relative overflow-hidden">
        {/* Textura dentro do card */}
        <img
          src="/texture.png"
          alt="Textura"
          className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
        />

        {/* Conteúdo acima da textura */}
        <div className="relative z-10 flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-12 h-12 mb-3"
          />

          {/* Título com degradê */}
          <h1 className="text-xl font-extrabold bg-gradient-to-r from-[#8E44AD] to-[#FF5C8A] text-transparent bg-clip-text">
            Admin Stay
          </h1>
          <p className="text-[13px] text-[#212121] opacity-60 mb-6 mt-1">
            Tecnologia que hospeda soluções.
          </p>

          <h2 className="tracking-[0.2em] text-[#212121] text-sm font-semibold mb-6">
            CADASTRE-SE
          </h2>

          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-xs">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded text-xs">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 w-full px-2">
            {/* Nome */}
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow">
              <img src="/icon.png" alt="Usuário" className="w-4 h-4 mr-3 opacity-60" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="NOME COMPLETO"
                className="text-xs bg-transparent w-full focus:outline-none text-[#212121] placeholder-[#A49A9A]"
                disabled={loading}
              />
            </div>

            {/* E-mail */}
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow">
              <img src="/email.png" alt="Email" className="w-4 h-4 mr-3 opacity-60" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="EMAIL"
                className="text-xs bg-transparent w-full focus:outline-none text-[#212121] placeholder-[#A49A9A]"
                disabled={loading}
              />
            </div>

            {/* Senha */}
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow">
              <img src="/cadeado.png" alt="Senha" className="w-4 h-4 mr-3 opacity-60" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="SENHA (mín. 6 caracteres)"
                className="text-xs bg-transparent w-full focus:outline-none text-[#212121] placeholder-[#A49A9A]"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="mt-6 w-full bg-[#FF5C8A] text-white py-2 rounded-full shadow-md font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Cadastrando..." : success ? "Redirecionando..." : "Cadastrar"}
            </button>
          </form>

          <p className="mt-4 text-[12px] text-[#212121] opacity-60">
            Já tem uma conta?{" "}
            <button
              onClick={onNavigate}
              disabled={loading || success}
              className="text-[#FF5C8A] font-semibold disabled:opacity-50"
            >
              Fazer Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

