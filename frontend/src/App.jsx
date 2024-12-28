import '@/assets/css/index.css';
import '@/utils/axiosConfig';

import { Routes, Route } from "react-router-dom";

import { AuthProvider } from '@/contexts/AuthContext';
import { NoteProvider } from '@/contexts/NoteContext';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeView from '@/views/HomeView';
import DashboardView from '@/views/DashboardView';
import LoginView from '@/views/LoginView';
import SignupView from '@/views/SignupView';

const App = () => {
  return (
    <AuthProvider>
      <div id="react-app" className='relative h-screen flex justify-between flex-col'>
        <div>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="dashboard/*" element={
                <NoteProvider>
                  <DashboardView />
                </NoteProvider>
              } />
              <Route path="login" element={<LoginView />} />
              <Route path="signup" element={<SignupView />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
