import { createSignal, onCleanup, onMount } from 'solid-js';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = createSignal(false);

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Attach scroll event listener on mount and clean it up on unmount
  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    onCleanup(() => window.removeEventListener('scroll', handleScroll));
  });

  return (
    <div class="main-Navbar">
      <nav class={`navbar ${scrolled() ? 'scrolled' : ''}`}>
        <div class="leftSection">
          <a href="/beranda-Dekstop" class="logo">ULO.</a>
          <div class="nav-links">
            <a href="/beranda-Dekstop" class="active">Beranda</a>
            <a href="/baru&populer">Baru & Populer</a>
            <a href="/DaftarSaya">Daftar Saya</a>
            <a href="/filter-pencarian" >Filter Pencarian</a>
          </div>
        </div>

        <div class="rightSection">
          <button class="iconButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button class="iconButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <div class="profileButton">
            <img src="src/foto/Profile.png" alt="Profile" class="avatar" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
