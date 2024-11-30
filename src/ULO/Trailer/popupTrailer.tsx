import { createSignal, onMount } from 'solid-js';
import './popupTrailer.css';
import { toggleFilmInDaftarSaya, isFilmInDaftarSaya } from '../../../Store/store';
import close from '../Trailer/assets/close.svg';
import audio from '../Trailer/assets/audioJudul.svg';
import hd from '../Trailer/assets/hdJudul.svg';
import add from '../Trailer/assets/plus.svg';
import putar from '../Trailer/assets/play.svg';
import like from '../Trailer/assets/like.svg';
import like2 from '../Trailer/assets/likeActive.svg';
import suara from '../Trailer/assets/suaraNyala.svg';
import suara2 from '../Trailer/assets/suaraMati.svg';
import delapanbelas from '../Trailer/assets/18Tentang.svg';


const PopupTrailer = (props) => {
    const [isPopupVisiblePlus, setIsPopupVisiblePlus] = createSignal(false);
    const [isPopupVisibleLike, setIsPopupVisibleLike] = createSignal(false);
    const [isPlusActive, setIsPlusActive] = createSignal(false);
    const [isLikeActive, setIsLikeActive] = createSignal(false);
    const [isVolumeMuted, setIsVolumeMuted] = createSignal(false);
    const [isVideoPause, setIsVideoPause] = createSignal(false);
    const [isVideoVisible, setIsVideoVisible] = createSignal(false);
    const [isVideoLoaded, setIsVideoLoaded] = createSignal(false);
    const [currentTime, setCurrentTime] = createSignal(0);
    const [duration, setDuration] = createSignal(0);
    const [isExpanded, setIsExpanded] = createSignal(false);
    let videoRef;
    let progressBarRef;
    let isDragging = false;

    // Fungsi untuk menutup popup
    const handleClose = () => {
        if (props.onClose) {
            props.onClose(); // Panggil fungsi onClose yang dikirim dari parent (Beranda-Dekstop.tsx)
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded());
    };

    onMount(() => {
        setIsPlusActive(isFilmInDaftarSaya(props.id)); // Set initial state based on stored data
    });

    const handlePlusClick = () => {
        const film = {
            id: props.id,
            thumbnail: filmData()?.thumbnail,
            title: filmData()?.nama,
            duration: filmData()?.durasi
        };
        toggleFilmInDaftarSaya(film);
        setIsPlusActive(!isPlusActive());
    };

    onMount(() => {
        const likedFilms = JSON.parse(localStorage.getItem('likedFilms')) || {};
        setIsLikeActive(likedFilms[props.id] || false);
    });

    const handleLikeClick = async () => {
        try {
            const response = await fetch('http://localhost:8080/film-like', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ film_id: props.id }),
            });

            if (response.ok) {
                const data = await response.json();
                const newLikeStatus = !isLikeActive();
                setIsLikeActive(newLikeStatus);

                // Update localStorage with the new like status
                const likedFilms = JSON.parse(localStorage.getItem('likedFilms')) || {};
                likedFilms[props.id] = newLikeStatus;
                localStorage.setItem('likedFilms', JSON.stringify(likedFilms));

                console.log(data.message); // Log the server response
            } else {
                console.error("Error liking/unliking film:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleVolumeClick = () => {
        if (videoRef) {
            videoRef.muted = !videoRef.muted;
            setIsVolumeMuted(!isVolumeMuted());
        }
    };

    const resetVideoState = () => {
        setIsVideoPause(false);
        setCurrentTime(0);
        if (videoRef) {
            videoRef.currentTime = 0;
            videoRef.play()
                .catch((error) => {
                    console.error("Error replaying video:", error);
                });
        }
    };

    const handlePauseClick = () => {
        if (videoRef) {
            if (videoRef.paused) {
                videoRef.play()
                    .then(() => {
                        setIsVideoPause(false);
                    })
                    .catch((error) => {
                        console.error("Error playing video:", error);
                    });
            } else {
                videoRef.pause();
                setIsVideoPause(true);
            }
        }
    };

    const updateProgressPosition = (event) => {
        if (!progressBarRef) return;

        const rect = progressBarRef.getBoundingClientRect();
        const pos = (event.clientX - rect.left) / rect.width;
        const newTime = pos * duration();

        if (newTime >= 0 && newTime <= duration()) {
            videoRef.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    // Handle mouse down on progress bar
    const handleProgressMouseDown = (event) => {
        isDragging = true;
        updateProgressPosition(event);
    };

    // Handle mouse move while dragging
    const handleProgressMouseMove = (event) => {
        if (isDragging) {
            updateProgressPosition(event);
        }
    };

    // Handle mouse up anywhere in the document
    const handleProgressMouseUp = () => {
        isDragging = false;
    };

    onMount(() => {
        // Add global mouse event listeners
        document.addEventListener('mousemove', handleProgressMouseMove);
        document.addEventListener('mouseup', handleProgressMouseUp);

        if (videoRef) {
            videoRef.muted = isVolumeMuted();
        }

        setTimeout(() => {
            setIsVideoVisible(true);
            if (videoRef && !isVideoPause()) {
                videoRef.play()
                    .catch((error) => {
                        console.error("Error auto-playing video:", error);
                    });
            }
        }, 2000);

        // Cleanup event listeners
        return () => {
            document.removeEventListener('mousemove', handleProgressMouseMove);
            document.removeEventListener('mouseup', handleProgressMouseUp);
        };
    });

    const setupVideoEvents = (element) => {
        if (element) {
            videoRef = element;

            // Handle video load events
            videoRef.addEventListener('loadedmetadata', () => {
                setDuration(videoRef.duration);
            });

            videoRef.addEventListener('canplay', () => {
                if (!isVideoLoaded()) {
                    setIsVideoLoaded(true);
                    if (!isVideoPause()) {
                        videoRef.play()
                            .catch((error) => {
                                console.error("Error auto-playing video:", error);
                            });
                    }
                }
            });

            videoRef.addEventListener('timeupdate', () => {
                setCurrentTime(videoRef.currentTime);
            });

            videoRef.addEventListener('ended', () => {
                resetVideoState();  // Reset and replay the video
            });

            videoRef.addEventListener('error', (e) => {
                console.error("Video error:", e);
            });
        }
    };

    // Calculate progress bar width based on current time
    const getProgressWidth = () => {
        if (duration() === 0) return '0';
        const progress = (currentTime() / duration()) * 200; // 200px is max width
        return `${progress}px`;
    };
    //DATABASE
    const [filmData, setFilmData] = createSignal(null);

    onMount(async () => {
        try {
            const response = await fetch(`http://localhost:8080/films/${props.id}`); // Fetch by ID
            const data = await response.json();
            setFilmData(data); // Set the film data directly
        } catch (error) {
            console.error("Error fetching film data:", error);
        }
    });

    return (
        <div class='popup-overlay'>
            <div class='popup-scroll'>
                <div class='popup-content' style={{ height: isExpanded() ? '3650px' : '2425px' }}>
                    <img src={close} alt="close" class='closeIcon' onClick={handleClose} />
                    {isVideoVisible() ? (
                        <iframe class="vid" src={`${filmData()?.trailer}?autoplay=($id)`} 
                            allow="autoplay">
                        </iframe>
                    ) : (
                        <img
                            src={`data:image/png;base64,${filmData()?.thumbnail}`}
                            alt="Thumbnail"
                            class={`thumbnail ${isVideoVisible() ? 'fade-out' : ''}`}
                        />

                    )}
                    <div class='gradasi'></div>
                    <div class='content1'>
                        <div class='kiri'>
                            <div class='kategori'>
                                <p class='kategoriDeskripsi'>PETUALANGAN</p>
                                <div class='batas'></div>
                                <p class='kategoriDeskripsi'>LAGA</p>
                                <div class='batas'></div>
                                <p class='kategoriDeskripsi'>GANGSTER</p>
                            </div>
                            <h1 class='judulTrailer'>{filmData()?.nama}</h1>
                            <div class='aksi'>
                                <button class='aksi1'>
                                    <p class='textPutar'>Putar Sekarang</p>
                                    <img src={putar} alt="Putar Sekarang" class='playButton' />
                                </button>
                                <button
                                    class='aksi2'
                                    onClick={handlePlusClick}
                                >
                                    <img
                                        src={isPlusActive()
                                            ? "src/ULO/Trailer/assets/check.svg"
                                            : "src/ULO/Trailer/assets/plus.svg"}
                                        alt={isPlusActive() ? "Added" : "Add"}
                                        class='plusButton'
                                    />
                                    {isFilmInDaftarSaya(props.id) && (
                                        <div class='popup-tambah-daftar'>
                                            <img src="src/ULO/Trailer/assets/tambahDaftar.svg" alt="Added Popup" class='tambahDaftar' />
                                        </div>
                                    )}
                                </button>
                                <button
                                    class='aksi3'
                                    onClick={handleLikeClick}
                                    onMouseEnter={() => setIsPopupVisibleLike(true)}
                                    onMouseLeave={() => setIsPopupVisibleLike(false)}
                                >
                                    <img
                                        src={isLikeActive()
                                            ? "src/ULO/Trailer/assets/likeActive.svg"
                                            : "src/ULO/Trailer/assets/like.svg "}
                                        alt={isLikeActive()
                                            ? "Like Film"
                                            : "Like Film Active"}
                                        class='likeButton'
                                    />
                                    {isPopupVisibleLike() && (
                                        <div class='popup-liked'>
                                            <img src="src/ULO/Trailer/assets/sayaSuka.svg" alt="Liked Popup" class='sayaSuka' />
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div class='kanan'>
                            <div onClick={handleVolumeClick}>
                                <img
                                    src={isVolumeMuted()
                                        ? "src/ULO/Trailer/assets/suaraMati.svg"
                                        : "src/ULO/Trailer/assets/suaraNyala.svg"}
                                    alt={isVolumeMuted()
                                        ? "Suara Mati"
                                        : "Suara Nyala"}
                                    class='suara'
                                />
                            </div>
                            <div class='controlVideo'>
                                <div onClick={handlePauseClick}>
                                    <img
                                        src={isVideoPause()
                                            ? "src/ULO/Trailer/assets/playVideo.svg"
                                            : "src/ULO/Trailer/assets/pauseVideo.svg"}
                                        alt={isVideoPause()
                                            ? "Suara Mati"
                                            : "Suara Nyala"}
                                        class='pauseVideo'
                                    />
                                </div>
                                <div
                                    class='durasiVideo'
                                    ref={progressBarRef}
                                    onMouseDown={handleProgressMouseDown}
                                >
                                    <div class='durasiTotal'></div>
                                    <div
                                        class='durasiActive'
                                        style={{ width: getProgressWidth() }}
                                    ></div>
                                </div>
                                <p class='keteranganAngka'>03:39</p>
                            </div>
                        </div>
                    </div>
                    <div class='content2'>
                        <div class='kiri2'>
                            <div class='informasi1'>
                                <p class='tanggalRilis'>{filmData()?.durasi}</p>
                                <img src={hd} alt="HD Judul" class='hdJudul' />
                                <img src={audio} alt="Audio Judul" class='audioJudul' />
                            </div>
                            <div class='informasi2'>
                                <img src={delapanbelas} alt="18 Judul" class='judul18' />
                                <p class='kekerasan'>{filmData()?.keterangan_rating}</p>
                            </div>
                            <p class='deskripsiFilm'>{filmData()?.sinopsis}</p>
                        </div>
                        <div class='kanan2'>
                            <div class="sectionTrailer">
                                <span class="label">Pemeran:</span>
                                <span class="value">{filmData()?.pemeran}</span>
                            </div>

                            <div class="sectionTrailer">
                                <span class="label">Genre:</span>
                                <span class="value">{filmData()?.genre}</span>
                            </div>

                            <div class="sectionTrailer">
                                <span class="label">Film ini:</span>
                                <span class="value">{filmData()?.film_ini}</span>
                            </div>
                        </div>
                    </div>
                    <div class='content5' style={{ "margin-top": isExpanded() ? '150px' : '50px' }}>
                        <h1 class='textTentang'>Tentang Extraction 2</h1>
                        <div class='kiri3'>
                            <div class="sectionTentang">
                                <span class="title">Sutradara:</span>
                                <span class="isi">{filmData()?.sutradara}</span>
                            </div>

                            <div class="sectionTentang">
                                <span class="title">Pemeran:</span>
                                <span class="isi">{filmData()?.pemeran}</span>
                            </div>

                            <div class="sectionTentang">
                                <span class="title">Penulis:</span>
                                <span class="isi">{filmData()?.penulis}</span>
                            </div>

                            <div class="sectionTentang">
                                <span class="title">Genre:</span>
                                <span class="isi">{filmData()?.genre}</span>
                            </div>

                            <div class="sectionTentang">
                                <span class="title">Film ini:</span>
                                <span class="isi">{filmData()?.film_ini}</span>
                            </div>

                            <div class="sectionRating">
                                <span class="title">Rating usia:</span>
                                <img src={delapanbelas} alt="18 Tentang" class='tentang18' />
                                <span class="isi">{filmData()?.keterangan_rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupTrailer;