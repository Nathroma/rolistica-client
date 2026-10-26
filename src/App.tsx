import ProtectedRoute from '@/components/protectedRoute/ProtectedRoute';
import CharacterSelectionPage from '@/pages/characterSelectionPage/CharacterSelectionPage';
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
      <Route element={<ProtectedRoute />}>
        <Route path="/selection" element={<CharacterSelectionPage />} />
        <Route path="/sheet" element={<CharacterSheetPage />} />
      </Route>
    </Routes>
  );
}

export default App;
