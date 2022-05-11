import { Routes, Route } from 'react-router-dom'

import Main from 'pages/Main'
import Rating from 'pages/Rating';
import Settings from 'pages/Settings';
import Admin from 'pages/Admin';
import Header from 'components/Header';
import RegisterForm from 'components/auth/RegisterForm'
import LoginForm from 'components/auth/LoginForm'
import Protected from 'hoc/Protected';
import PersistLogin from 'hoc/PersistLogin';

import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PersistLogin />}>
        <Route path="/" element={<Header />} >
          <Route index element={(
            <Protected>
              <Main />
            </Protected>
          )}/>
          <Route path="rating" element={(
            <Protected>
              <Rating />
            </Protected>
          )}/>
          <Route path="advantages" element={(
            <Protected>
              <h2>Avdantages</h2>
            </Protected>
          )}/>
          <Route path="settings" element={(
            <Protected>
              <Settings />
            </Protected>
          )}/>
          <Route path="edit" element={(
            <Protected role="admin">
              <Admin />
            </Protected>
          )}/>
        </Route>
        
        <Route path="register" element={<RegisterForm />} />
        <Route path="login" element={<LoginForm />} />
      </Route>
    </Routes> 
  );
}

export default App;
