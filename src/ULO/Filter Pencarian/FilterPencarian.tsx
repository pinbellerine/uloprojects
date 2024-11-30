import { createSignal } from "solid-js";
import styles from './FilterPencarian.module.css';
import Navbar from "../Navbar/Navbar";

// Gambar
import One_Piece from '../../foto/One-Piece.png';
import Extraction_2 from '../../foto/Extraction-2.png';
import TAOL from '../../foto/The-Architecture-of-Love.png';
import Angry_Birds from '../../foto/The-Angry-Birds-Movie-2.png';
import Titanic from '../../foto/Titanic.png';
import Dua_Hati_Biru from '../../foto/Dua-Hati-Biru.png';
import Mariposa from '../../foto/Mariposa.png';
import Filosofi_Kopi from '../../foto/Filosofi-Kopi-The-Series.png';
import Ratu_Ilmu_Hitam from '../../foto/Ratu-Ilmu-Hitam.png';
import Rumah_Masa_Depan from '../../foto/Rumah-Masa-Depan.png';
import Godzila_Minus_One from '../../foto/Godzila-Minus-One.png';
import Dumbledore from '../../foto/The-Secrets-of-Dumbledore.png';
import Heart_Of_Stone from '../../foto/Heart-of-Stone.png';
import John_Wick from '../../foto/John-Wick.png';
import Menjelang_Ajal from '../../foto/Menjelang-Ajal.png';
import Gifted from '../../foto/Gifted.png';

const FilterPencarian = () => {
    const [bahasa, setBahasa] = createSignal("Bahasa");
    const [genre, setGenre] = createSignal("Genre");
    const [urutan, setUrutan] = createSignal("Urutkan");

    const movies = [
        { title: "One Piece", image: One_Piece, genre: "Action", bahasa: "Japanese", urutan: "Populer" },
        { title: "Extraction 2", image: Extraction_2, genre: "Action", bahasa: "English", urutan: "Terbaru" },
        { title: "The Architecture of Love", image: TAOL, genre: "Drama", bahasa: "Indonesia", urutan: "Saran" },
        { title: "The Angry Birds Movie 2", image: Angry_Birds, genre: "Comedy", bahasa: "English", urutan: "Terbaru" },
        { title: "Titanic", image: Titanic, genre: "Drama", bahasa: "English", urutan: "Populer" },
        { title: "Dua Hati Biru", image: Dua_Hati_Biru, genre: "Drama", bahasa: "Indonesia", urutan: "Saran" },
        { title: "Mariposa", image: Mariposa, genre: "Drama", bahasa: "Indonesia", urutan: "Terbaru" },
        { title: "Filosofi Kopi", image: Filosofi_Kopi, genre: "Drama", bahasa: "Indonesia", urutan: "Terbaru" },
        { title: "Ratu Ilmu Hitam", image: Ratu_Ilmu_Hitam, genre: "Horror", bahasa: "Indonesia", urutan: "Saran" },
        { title: "Rumah Masa Depan", image: Rumah_Masa_Depan, genre: "Drama", bahasa: "Indonesia", urutan: "Populer" },
        { title: "Godzilla Minus One", image: Godzila_Minus_One, genre: "Action", bahasa: "Japanese", urutan: "Saran" },
        { title: "The Secrets of Dumbledore", image: Dumbledore, genre: "Action", bahasa: "English", urutan: "Populer" },
        { title: "Heart of Stone", image: Heart_Of_Stone, genre: "Action", bahasa: "English", urutan: "Terbaru" },
        { title: "John Wick", image: John_Wick, genre: "Action", bahasa: "English", urutan: "Terbaru" },
        { title: "Menjelang Ajal", image: Menjelang_Ajal, genre: "Horror", bahasa: "Indonesia", urutan: "Populer" },
        { title: "Gifted", image: Gifted, genre: "Drama", bahasa: "English", urutan: "Saran" },
    ];

    // Filter movie list based on selected genre and bahasa
    const filteredMovies = () => {
        const selectedGenre = genre();
        const selectedBahasa = bahasa();
        const selectedUrutan = urutan();

        return movies.filter(movie => {
            const matchGenre = selectedGenre === "Genre" || movie.genre === selectedGenre;
            const matchBahasa = selectedBahasa === "Bahasa" || movie.bahasa === selectedBahasa;
            const matchUrutan = selectedUrutan === "Urutkan" || movie.urutan === selectedUrutan;
            return matchGenre && matchBahasa && matchUrutan;
        });
    };

    return (
        <div class={styles.container}>
            <Navbar />

            <div class={styles.filterSection}>
                <div class={styles.filterGroup}>
                    <span class={styles.filterLabel}>Pilih Preferensimu</span>
                    <div class={styles.selectGroup}>
                        <select
                            class={styles.select}
                            value={bahasa()}
                            onChange={(e) => setBahasa(e.currentTarget.value)}
                        >
                            <option value="Bahasa">Bahasa</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="English">English</option>
                            <option value="Japanese">Japanese</option>
                        </select>
                    </div>
                </div>

                <span class={styles.filterLabel}>Pilih genre</span>
                <div class={styles.selectGroup}>
                    <select
                        class={styles.select}
                        value={genre()}
                        onChange={(e) => setGenre(e.currentTarget.value)}
                    >
                        <option value="Genre">Genre</option>
                        <option value="Action">Action</option>
                        <option value="Drama">Drama</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Horror">Horror</option>
                        <option value="Documentary">Documentary</option>
                    </select>
                </div>

                <span class={styles.filterLabel}>Urut Berdasarkan</span>
                <div class={styles.selectGroup}>
                    <select
                        class={styles.select}
                        value={urutan()}
                        onChange={(e) => setUrutan(e.currentTarget.value)}
                    >
                        <option value="Urutkan">Urutkan</option>
                        <option value="Saran">Saran</option>
                        <option value="Populer">Populer</option>
                        <option value="Terbaru">Terbaru</option>
                    </select>
                </div>
            </div>

            <div class={styles.movieGrid}>
                {filteredMovies().map((movie) => (
                    <div class={styles.movieCard}>
                        <div class={styles.imageWrapper}>
                            <img src={movie.image} alt={movie.title} class={styles.movieImage} />
                            <div class={styles.overlay}>
                                <h3 class={styles.movieTitle}>{movie.title}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterPencarian;
