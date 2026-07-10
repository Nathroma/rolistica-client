import ProtectedRoute from '@/components/protectedRoute/ProtectedRoute';
import CharacterSheetPage from '@/pages/characterSheetPage/CharacterSheetPage';
import LoginPage from '@/pages/loginPage/LoginPage';
import RegisterPage from '@/pages/registerPage/RegisterPage';
import WelcomePage from '@/pages/welcomePage/WelcomePage';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/sheet"
        element={
          <ProtectedRoute>
            <CharacterSheetPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
