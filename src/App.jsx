import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { FontScaleProvider } from './context/FontScaleContext'
import { AuthProvider } from './context/AuthContext'
import { WalletProvider } from './context/WalletContext'
import { SubscriptionProvider } from './context/SubscriptionContext'
import { ToastProvider } from './context/ToastContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Subscriptions from './pages/Subscriptions'
import RegionalServices from './pages/RegionalServices'
import Funds from './pages/Funds'
import BundleOffers from './pages/BundleOffers'
import Settings from './pages/Settings'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <FontScaleProvider>
        <AuthProvider>
          <ToastProvider>
            <WalletProvider>
              <SubscriptionProvider>
                <Router>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <Layout />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<Dashboard />} />
                      <Route path="subscriptions" element={<Subscriptions />} />
                      <Route path="regional-services" element={<RegionalServices />} />
                      <Route path="funds" element={<Funds />} />
                      <Route path="bundle-offers" element={<BundleOffers />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Router>
              </SubscriptionProvider>
            </WalletProvider>
          </ToastProvider>
        </AuthProvider>
      </FontScaleProvider>
    </ThemeProvider>
  )
}

export default App
