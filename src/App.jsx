import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PropertiesProvider } from './context/PropertiesContext';
import Navbar from './components/common/NavBar';  
import Footer from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import CatalogPage from './pages/CatalogPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminPropertyForm from './pages/AdminPropertyForm';
import ProtectedRoute from './pages/ProtectedRoute';


export default function App() {
  return (
    <AuthProvider>
      <PropertiesProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/property/:id" element={<PropertyDetailPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute><AdminDashboard /></ProtectedRoute>
                } />
                <Route path="/admin/add" element={
                  <ProtectedRoute><AdminPropertyForm /></ProtectedRoute>
                } />
                <Route path="/admin/edit/:id" element={
                  <ProtectedRoute><AdminPropertyForm /></ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </PropertiesProvider>
    </AuthProvider>
  );
}