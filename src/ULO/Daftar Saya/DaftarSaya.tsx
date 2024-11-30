import { daftarSaya } from '../../../Store/store';
import './Daftarsaya.css';
import Navbar from '../Navbar/Navbar';

const DaftarSaya = () => {
  return (
    <div class="daftar-saya-container">
      <Navbar />
      <div class="daftar-saya-header">Daftar Saya</div>
      <div class="daftar-saya-grid">
        {daftarSaya.items.map((film) => (
          <div class="daftar-saya-card">
            <img src={`data:image/png;base64,${film.thumbnail}`} alt={film.title} />
            <div class="film-info">
              <p>{film.title}</p>
              <p>{film.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaftarSaya;
