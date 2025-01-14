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
import NoteView from '@/views//NoteView';
import SignupView from '@/views/SignupView';
import ProtectedRoute from '@/components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <NoteProvider>
        <div id="react-app" className='relative h-screen flex justify-between flex-col'>
          <div>
            <Header />
            <main>
              <Routes>
                <Route path="/welcome" element={<HomeView />} />
                <Route path="/notes/:id" element={<NoteView />} />

                <Route path="/" element={
                  // <ProtectedRoute>
                  <DashboardView />
                  // </ProtectedRoute>
                } />
                <Route path="login" element={<LoginView />} />
                <Route path="signup" element={<SignupView />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </NoteProvider>
    </AuthProvider>
  )
}

export default App
