import { createSignal, onCleanup, onMount, For } from 'solid-js';
import './Beranda-Dekstop.css';
import Navbar from '../Navbar/Navbar';
import PopupTrailer from '../Trailer/popupTrailer';
import kiri from '../../foto/kiri.svg';
import kanan from '../../foto/kanan.svg';
import avatar from '../../foto/Avatar-HeroSection.svg';


const Dekstop = () => {

    const [scrolled, setScrolled] = createSignal(false);
    const [showPopup, setShowPopup] = createSignal(false);
    const [currentSlide, setCurrentSlide] = createSignal(0);  // State untuk melacak slide aktif  // State untuk melacak slide aktif
    const [selectedMovieId, setSelectedMovieId] = createSignal(null);

    const handlePopup = (id) => {
        setShowPopup(true);  // Menampilkan popup
        setSelectedMovieId(id);
        document.body.style.overflow = 'hidden';  // Sembunyikan scrollbar
    };

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const closePopup = () => {
        setShowPopup(false);  // Menutup popup
        document.body.style.overflow = 'auto';  // Tampilkan scrollbar kembali
    };

    let movieGridRefRekomendasi;  // Ref for "Rekomendasi untuk Anda"
    let movieGridRefIndo;
    let movieLagaPetualangan       // Ref for "Film & Acara TV Indonesia"

    // Scroll functions for "Rekomendasi untuk Anda"
    const scrollLeftRekomendasi = () => {
        movieGridRefRekomendasi.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRightRekomendasi = () => {
        movieGridRefRekomendasi.scrollBy({ left: 300, behavior: 'smooth' });
    };

    // Scroll functions for "Film & Acara TV Indonesia"
    const scrollLeftIndo = () => {
        movieGridRefIndo.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRightIndo = () => {
        movieGridRefIndo.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const scrollLeftPetualangan = () => {
        movieLagaPetualangan.scrollBy({ left: -300, behavior: 'smooth' })
    };

    const scrollRightPetualangan = () => {
        movieLagaPetualangan.scrollBy({ left: 300, behavior: 'smooth' })
    };

    // Tambahkan array untuk background image
    const slidesData = [
        {
            title: "Avatar: The Way of Water",
            tags: ["PETUALANGAN", "AKSI", "FANTASI"],
            bgImage: "src/foto/Avatar-HeroSection.svg"  // Ganti dengan path gambar yang sesuai
        },
        {
            title: "Spider-Man: No Way Home",
            tags: ["PETUALANGAN", "AKSI", "SUPERHERO"],
            bgImage: "src/foto/spiderman-HeroSection.svg"
        },
        {
            title: "Inception",
            tags: ["FIKSI ILMIAH", "THRILLER", "MISTERI"],
            bgImage: "src/foto/inception-HeroSection.svg"
        }
    ];

    // Fungsi untuk mengganti slide setiap 3 detik
    onMount(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3); // Berpindah antar slide, dari 0 hingga 2
        }, 4000); // Ganti slide setiap 3 detik

        // Event listener untuk scroll
        window.addEventListener("scroll", handleScroll);

        onCleanup(() => {
            clearInterval(interval); // Bersihkan interval saat komponen di-unmount
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = 'auto'; // Kembalikan scrollbar jika popup tertutup
        });
    });
    // State untuk melacak trailer yang aktif
    const [currentTrailer, setCurrentTrailer] = createSignal(0);
    const trailersData = [
        { videoSrc: 'src/foto/avatar3.mp4', posterSrc: 'src/foto/Avatar-HeroSection.svg', title: 'Avatar: The Way of Water', duration: '3:00' },
        { videoSrc: 'src/foto/Spiderman.mp4', posterSrc: 'src/foto/Spiderman-HeroSection.svg', title: 'Spider-Man: No Way Home', duration: '3:00' },
        { videoSrc: 'video2.mp4', posterSrc: 'poster2.jpg', title: 'Film 2', duration: '3:00' },
        // Tambahkan lebih banyak trailer jika perlu
    ];

    let videoRef: HTMLVideoElement | null = null;

    // Event listener ketika video selesai
    const handleVideoEnd = () => {
        // Berpindah ke trailer selanjutnya, ulangi ke awal jika sudah di akhir
        setCurrentTrailer((prev) => (prev + 1) % trailersData.length);
    };

    // Tambahkan event listener untuk video end
    onCleanup(() => {
        if (videoRef) {
            videoRef.removeEventListener('ended', handleVideoEnd);
        }
    });

    return (
        <div class="main-countainer">
            <Navbar />
            <div
                class="hero"
                style={{
                    "background-image": `url(${slidesData[currentSlide()].bgImage})`,
                    "background-size": "cover",
                    "background-position": "center"
                }}>
                <div class="hero-content">
                    <div class="tags">
                        {slidesData[currentSlide()].tags.map(tag => (
                            <span class="tag">{tag}</span>
                        ))}
                    </div>
                    <h1 class="title">{slidesData[currentSlide()].title}</h1>

                    <div class="carousel">
                        <img
                            src="src/foto/carousel1.svg"
                            alt="carousel1"
                            class={currentSlide() === 0 ? 'active-slide' : ''}
                            style={{ filter: currentSlide() === 0 ? 'brightne`ss(100%)' : 'brightness(50%)' }}
                        />
                        <img
                            src="src/foto/carousel1.svg"
                            alt="carousel2"
                            class={currentSlide() === 1 ? 'active-slide' : ''}
                            style={{ filter: currentSlide() === 1 ? 'brightness(100%)' : 'brightness(50%)' }}
                        />
                        <img
                            src="src/foto/carousel1.svg"
                            alt="carousel3"
                            class={currentSlide() === 2 ? 'active-slide' : ''}
                            style={{ filter: currentSlide() === 2 ? 'brightness(100%)' : 'brightness(50%)' }}
                        />
                    </div>

                    <div class="buttons">
                        <button class="btn btn-primary">Putar Sekarang</button>
                        <button class="btn btn-secondary" onClick={handlePopup}>Selengkapnya</button>
                    </div>
                </div>
            </div>

            <section class="section">
                <h2 class="section-title">Rekomendasi untuk Anda</h2>
                <div class="movie-controls">
                    <button class="scroll-button" onClick={scrollLeftRekomendasi}>
                        <img src={kiri} alt="kiri" />
                    </button>
                    <div class="movie-grid" ref={movieGridRefRekomendasi}>
                        <div class="movie-card" onClick={() => handlePopup(6)}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 1" />
                            <div class="movie-info">
                                <h3 class="movie-title">One Piece</h3>
                                <div class="movie-duration">2j 30min</div>
                            </div>
                        </div>
                        <div class="movie-card" onClick={() => handlePopup(1)}>
                            <img src="src\foto\Rekomendasi2.svg" alt="movie 2" />
                            <div class="movie-info">
                                <h3 class="movie-title">Extraction</h3>
                                <div class="movie-duration">2j 15min</div>
                            </div>
                        </div>
                        <div class="movie-card" onClick={() => handlePopup(3)}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 3" />
                            <div class="movie-info">
                                <h3 class="movie-title">The Angry Birds 2</h3>
                                <div class="movie-duration">1j 45min</div>
                            </div>
                        </div>

                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 4" />
                            <div class="movie-info">
                                <h3 class="movie-title">The Angry Birds 2</h3>
                                <div class="movie-duration">1j 45min</div>
                            </div>
                        </div>

                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 5" />
                            <div class="movie-info">
                                <h3 class="movie-title">The Angry Birds 2</h3>
                                <div class="movie-duration">1j 45min</div>
                            </div>
                        </div>
                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 5" />
                            <div class="movie-info">
                                <h3 class="movie-title">The Angry Birds 2</h3>
                                <div class="movie-duration">1j 45min</div>
                            </div>
                        </div>
                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 5" />
                            <div class="movie-info">
                                <h3 class="movie-title">The Angry Birds 2</h3>
                                <div class="movie-duration">1j 45min</div>
                            </div>
                        </div>
                    </div>
                    <button class="scroll-button" onClick={scrollRightRekomendasi}>
                        <img src={kanan} alt="kanan" />
                    </button>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title">Film & Acara TV Indonesia</h2>
                <div class="movie-controls">
                    <button class="scroll-button" onClick={scrollLeftIndo}>
                        <img src={kiri} alt="kiri" />
                    </button>
                    <div class="movie-grid" ref={movieGridRefIndo}>
                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src/foto/Rekomendasi1.svg" alt="movie 4" />
                            <div class="movie-info">
                                <h3 class="movie-title">Dua Hati Biru</h3>
                                <div class="movie-duration">1j 50min</div>
                            </div>
                        </div>

                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 4" />
                            <div class="movie-info">
                                <h3 class="movie-title">Dua Hati Biru</h3>
                                <div class="movie-duration">1j 50min</div>
                            </div>
                        </div>
                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 5" />
                            <div class="movie-info">
                                <h3 class="movie-title">Mariposa</h3>
                                <div class="movie-duration">2j 5min</div>
                            </div>
                        </div>
                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 6" />
                            <div class="movie-info">
                                <h3 class="movie-title">Filosofi Kopi</h3>
                                <div class="movie-duration">1j 55min</div>
                            </div>
                        </div>
                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 7" />
                            <div class="movie-info">
                                <h3 class="movie-title">Dua Hati Biru</h3>
                                <div class="movie-duration">1j 50min</div>
                            </div>
                        </div>
                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 8" />
                            <div class="movie-info">
                                <h3 class="movie-title">Dua Hati Biru</h3>
                                <div class="movie-duration">1j 50min</div>
                            </div>
                        </div>
                    </div>
                    <button class="scroll-button" onClick={scrollRightIndo}>
                        <img src={kanan} alt="kanan" />
                    </button>
                </div>
            </section >

            <section class="section">
                <div class="pembungkus">
                    <h1 class="judul">10 Film Teratas Hari Ini</h1>
                    <div class="pembungkus-slider">
                        <For each={trailersData}>
                            {(trailer, index) => (
                                <div
                                    class={`kartu-video ${index() === currentTrailer() ? 'aktif' : ''}`}
                                    style={{
                                        transform: `translateX(-${currentTrailer() * 100}%)`, // Animasi slide
                                        transition: 'transform 0.5s ease',
                                    }}
                                >
                                    <div class="peringkat">#{index() + 1}</div>
                                    <video
                                        src={trailer.videoSrc}
                                        class="gambar-thumbnail"
                                        ref={el => {
                                            if (index() === currentTrailer()) {
                                                videoRef = el;
                                                videoRef.addEventListener('ended', handleVideoEnd);
                                            }
                                        }}
                                        autoplay
                                        muted
                                        loop={index() !== currentTrailer()} // Loop hanya pada trailer yang tidak aktif
                                    ></video>
                                    <div class="info-video">
                                        <div class="detail-video">
                                            <img src={trailer.posterSrc} alt="Poster film" class="poster-film" />
                                            <div class="teks-video">
                                                <h3 class="judul-video">{trailer.title}</h3>
                                                <p class="durasi-video">{trailer.duration}</p>
                                            </div>
                                        </div>
                                        <div class="kontrol">
                                            <button class="tombol-kontrol tombol-putar">
                                                <img src="src/foto/play.svg" alt="play" />
                                            </button>
                                            <button class="tombol-kontrol" onClick={handlePopup}>
                                                <img src="src/foto/info.svg" alt="info" />
                                            </button>
                                            <button class="tombol-kontrol">
                                                <img src="src/foto/plus.svg" alt="plus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div class="pembungkus-progres">
                                        <div class="bar-progres"></div>
                                    </div>
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title">Film Laga dan Petualangan</h2>
                <div class="movie-controls">
                    <button class="scroll-button" onClick={scrollLeftPetualangan}>
                        <img src={kiri} alt="kiri" />
                    </button>
                    <div class="movie-grid" ref={movieLagaPetualangan}>
                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 1" />
                            <div class="movie-info">
                                <h3 class="movie-title">One Piece</h3>
                                <div class="movie-duration">2j 30min</div>
                            </div>
                        </div>
                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi2.svg" alt="movie 2" />
                            <div class="movie-info">
                                <h3 class="movie-title">Extraction</h3>
                                <div class="movie-duration">2j 15min</div>
                            </div>
                        </div>
                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 3" />
                            <div class="movie-info">
                                <h3 class="movie-title">The Angry Birds 2</h3>
                                <div class="movie-duration">1j 45min</div>
                            </div>
                        </div>

                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 4" />
                            <div class="movie-info">
                                <h3 class="movie-title">The Angry Birds 2</h3>
                                <div class="movie-duration">1j 45min</div>
                            </div>
                        </div>

                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 5" />
                            <div class="movie-info">
                                <h3 class="movie-title">The Angry Birds 2</h3>
                                <div class="movie-duration">1j 45min</div>
                            </div>
                        </div>
                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 5" />
                            <div class="movie-info">
                                <h3 class="movie-title">The Angry Birds 2</h3>
                                <div class="movie-duration">1j 45min</div>
                            </div>
                        </div>
                        <div class="movie-card" onClick={handlePopup}>
                            <img src="src\foto\Rekomendasi1.svg" alt="movie 6" />
                            <div class="movie-info">
                                <h3 class="movie-title">The Angry Birds 2</h3>
                                <div class="movie-duration">1j 45min</div>
                            </div>
                        </div>
                    </div>
                    <button class="scroll-button" onClick={scrollRightPetualangan}>
                        <img src={kanan} alt="kanan" />
                    </button>
                </div>
            </section>

            {selectedMovieId() && showPopup() && (
                <PopupTrailer
                    id={selectedMovieId()}
                    onClose={() => {
                        closePopup();
                        setSelectedMovieId(null);
                    }} // Close PopupTrailer and reset selectedMovieId
                />
            )}


        </div>
    );
};

export default Dekstop;