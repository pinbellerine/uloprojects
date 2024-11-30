/* @refresh reload */
import './index.css';

import { render } from 'solid-js/web';
import { Router, Route, Routes, useNavigate } from '@solidjs/router';
import './fonts.css'


import Dekstop from './ULO/Beranda/Beranda-Dekstop';
import Filter from './ULO/Filter Pencarian/FilterPencarian';
import Login_Register from './ULO/Login & Register/Login_Register';
import LupaPass from './ULO/Lupa Password/lupapass';
import Baru_populer from './ULO/Baru&popup/Baru&Populer';
import DaftarSaya from './ULO/Daftar Saya/DaftarSaya';
import App from './ULO/Film-Player/videoplayer';
import EPS from './ULO/Film-Player/episodeplayer';



const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <Router>
    
      <Routes>
        <Route path="/Beranda-Dekstop" element={<Dekstop />} />
        <Route path="/filter-pencarian" element={<Filter />} />
        <Route path="/Baru&Populer" element={<Baru_populer />} />
        <Route path="/login" element={<Login_Register />} />
        <Route path="/lupapass" element={<LupaPass />} />
        <Route path="/DaftarSaya" element={<DaftarSaya />} />
        <Route path="/VidPlayer" element={<App />} />
        <Route path="/VidEps" element={<EPS />} />
      </Routes>
    </Router>
  ),
  root,
);
