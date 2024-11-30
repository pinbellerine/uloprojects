import { createSignal, onCleanup, onMount, For } from 'solid-js';
import './Baru&Populer.css';
import Navbar from '../Navbar/Navbar';
import baru1 from '../../foto/Baru1.svg';
import number1 from '../../foto/numberik1.svg';
import numberr1 from '../../foto/satu.svg';
import numberr2 from '../../foto/dua.svg';
import numberr3 from '../../foto/tiga.svg';
import numberr4 from '../../foto/empat.svg';
import numberr5 from '../../foto/lima.svg';
import akanhadir from '../../foto/akanhadir1.svg';

const Baru_populer = () => {

    let movieBaru;  // Ref for "Rekomendasi untuk Anda"
    let moviePopuler;
    let moviePilihan;
    let movieLayak;
    let movieHadir;
    // Scroll functions for "Rekomendasi untuk Anda"
    const scrollLeftBaru = () => {
        movieBaru.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRightBaru = () => {
        movieBaru.scrollBy({ left: 300, behavior: 'smooth' });
    };

    // Scroll functions for "Film & Acara TV Indonesia"
    const scrollLeftPopuler = () => {
        moviePopuler.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRightPopuler = () => {
        moviePopuler.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const scrollLeftPilihan = () => {
        moviePilihan.scrollBy({ left: -300, behavior: 'smooth' })
    };

    const scrollRightPilihan = () => {
        moviePilihan.scrollBy({ left: 300, behavior: 'smooth' })
    };

    const scrollLeftLayak = () => {
        movieLayak.scrollBy({ left: -300, behavior: 'smooth' })
    };

    const scrollRightLayak = () => {
        movieBaru.scrollBy({ left: 300, behavior: 'smooth' })
    };

    const scrollRightHadir = () =>{
        movieHadir.scrollBy({left: 300, behavior: 'smooth'})
    };

    const scrollLeftHadir = () =>{
        movieHadir.scrollBy({left: -300, behavior: 'smooth'})
    };


    return (
        <div class="container-baru">
            <Navbar />
            <div class="">
                <h2 class="section-title">Baru di Ulo</h2>
                <div class="movie-row">
                    <div class="movie-card-p">
                        <img src={baru1} alt="Movie 1" class="movie-card" />
                    </div>
                    <div class="movie-card-p">
                        <img src={baru1} alt="Movie 1" class="movie-card" />
                    </div>
                    <div class="movie-card-p">
                        <img src={baru1} alt="Movie 1" class="movie-card" />
                    </div>
                    <div class="movie-card-p">
                        <img src={baru1} alt="Movie 1" class="movie-card" />
                    </div><div class="movie-card-p">
                        <img src={baru1} alt="Movie 1" class="movie-card" />
                    </div>
                    <div class="movie-card-p">
                        <img src={baru1} alt="Movie 1" class="movie-card" />
                    </div>
                </div>

                <section class="numbered-section">
                    <h2 class="section-title">10 Film Terpopuler di Ulo Hari Ini</h2>
                    <div class="movie-row">
                        <div class="movie-list">
                            <img src={numberr1} alt="Film 1" class="nomorFilm" />
                            <div class="movie-card-number1">
                                <img src={number1} alt="Popular Movie 1" class="kartu" />
                            </div>
                        </div>
                        <div class="movie-list">
                            <img src={numberr2} alt="Film 2" class="nomorFilm" />
                            <div class="movie-card-number2">
                                <img src={number1} alt="Popular Movie 2" class="kartu" />
                            </div>
                        </div>
                        <div class="movie-list">
                            <img src={numberr3} alt="Film 3" class="nomorFilm" />
                            <div class="movie-card-number3">
                                <img src={number1} alt="Popular Movie 3" class="kartu" />
                            </div>
                        </div>
                        <div class="movie-list">
                            <img src={numberr4} alt="Film 4" class="nomorFilm" />
                            <div class="movie-card-number4">
                                <img src={number1} alt="Popular Movie 4" class="kartu" />
                            </div>
                        </div>
                        <div class="movie-list">
                            <img src={numberr5} alt="Film 5" class="nomorFilm" />
                            <div class="movie-card-number5">
                                <img src={number1} alt="Popular Movie 5" class="kartu" />
                            </div>
                        </div>
                    </div>
                </section>

                <section class="numbered-section">
                    <h2 class="section-title">10 Pilihan pengguna</h2>
                    <div class="movie-row">
                    <div class="movie-list">
                            <img src={numberr1} alt="Film 1" class="nomorFilm" />
                            <div class="movie-card-number1">
                                <img src={number1} alt="Popular Movie 1" class="kartu" />
                            </div>
                        </div>
                        <div class="movie-list">
                            <img src={numberr2} alt="Film 2" class="nomorFilm" />
                            <div class="movie-card-number2">
                                <img src={number1} alt="Popular Movie 2" class="kartu" />
                            </div>
                        </div>
                        <div class="movie-list">
                            <img src={numberr3} alt="Film 3" class="nomorFilm" />
                            <div class="movie-card-number3">
                                <img src={number1} alt="Popular Movie 3" class="kartu" />
                            </div>
                        </div>
                        <div class="movie-list">
                            <img src={numberr4} alt="Film 4" class="nomorFilm" />
                            <div class="movie-card-number4">
                                <img src={number1} alt="Popular Movie 4" class="kartu" />
                            </div>
                        </div>
                        <div class="movie-list">
                            <img src={numberr5} alt="Film 5" class="nomorFilm" />
                            <div class="movie-card-number5">
                                <img src={number1} alt="Popular Movie 5" class="kartu" />
                            </div>
                        </div>
                    </div>
                </section>

                <h2 class="section-title">Akan Hadir Minggu Ini</h2>
                <div class="movie-row">
                    <div class="movie-card-p">
                    <img src={akanhadir} alt="Upcoming Movie 1" />
                    </div>
                    <div class="movie-card-p">
                        <img src={akanhadir} alt="Upcoming Movie 1" />
                    </div>
                    <div class="movie-card-p">
                        <img src={akanhadir} alt="Upcoming Movie 1" />
                    </div>
                    <div class="movie-card-p">
                        <img src={akanhadir} alt="Upcoming Movie 1" />
                    </div>
                    <div class="movie-card-p">
                        <img src={akanhadir} alt="Upcoming Movie 1" />
                    </div>
                </div>

                <section>
                    <h2 class="section-title">Layak Ditunggu</h2>
                    <div class="movie-row">
                        <div class="movie-card-p">
                        <img src={akanhadir} alt="Upcoming Movie 1" />
                        </div>
                        <div class="movie-card-p">
                        <img src={akanhadir} alt="Upcoming Movie 1" />
                        </div>
                        <div class="movie-card-p">
                        <img src={akanhadir} alt="Upcoming Movie 1" />
                        </div>
                        <div class="movie-card-p">
                        <img src={akanhadir} alt="Upcoming Movie 1" />
                        </div>
                        <div class="movie-card-p">
                        <img src={akanhadir} alt="Upcoming Movie 1" />
                        </div>
                        <div class="movie-card-p">
                        <img src={akanhadir} alt="Upcoming Movie 1" />
                        </div>
                        <div class="movie-card-p">
                        <img src={akanhadir} alt="Upcoming Movie 1" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Baru_populer;