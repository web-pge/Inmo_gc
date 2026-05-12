import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@inmobiliaria.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-2xl p-8">
        <h2 className="font-serif text-3xl text-center mb-2 text-dark">
          Admin <span className="text-brand">Login</span>
        </h2>
        <p className="text-center text-muted text-sm mb-6">
          Ingresá al panel de administración
        </p>

        {error && (
          <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 text-dark placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 text-dark placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
          />
          <button
            type="submit"
            className="w-full bg-brand hover:bg-brand/90 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-xs text-muted text-center mt-6">
          Demo: admin@inmobiliaria.com / admin123
        </p>
      </div>
    </div>
  );
}