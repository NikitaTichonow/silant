import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Main } from "./components/Main/Main";
import Navigation from "./components/Navigation/Navigation";
import { TechnicalData } from "./pages/TechnicalData";
import { TechnicalMaintenance } from "./pages/TechnicalMaintenance";
import { Complaints } from "./pages/Complaints";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/technical-data"
            element={
              <ProtectedRoute>
                <TechnicalData />
              </ProtectedRoute>
            }
          />
          <Route
            path="/maintenance"
            element={
              <ProtectedRoute>
                <TechnicalMaintenance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complaints"
            element={
              <ProtectedRoute>
                <Complaints />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
