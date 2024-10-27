import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Main } from "./components/Main/Main";
import Navigation from "./components/Navigation/Navigation";
import { TechnicalData } from "./pages/TechnicalData";
import { TechnicalMaintenance } from "./pages/TechnicalMaintenance";
import { Complaints } from "./pages/Complaints";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import { CarDetails } from "./components/Details/CarDetails";
import { TypeMaintenance } from "./components/Details/DataTypeMaintenance";
import { Organization } from "./components/Details/DataOrganizationMaintenance";
import { RecoveryMethod } from "./components/Details/DataRecoveryMethod";
import { FailureNode } from "./components/Details/DataFailureNode";

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
          <Route
            path="/car/:id"
            element={
              <ProtectedRoute>
                <CarDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/car/datatypeofmaintenance/:name"
            element={
              <ProtectedRoute>
                <TypeMaintenance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/car/dataorganizationofmaintenance/:name"
            element={
              <ProtectedRoute>
                <Organization />
              </ProtectedRoute>
            }
          />
          <Route
            path="/car/datarecoverymethod/:name"
            element={
              <ProtectedRoute>
                <RecoveryMethod />
              </ProtectedRoute>
            }
          />
          <Route
            path="/car/datafailurenode/:name"
            element={
              <ProtectedRoute>
                <FailureNode />
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
