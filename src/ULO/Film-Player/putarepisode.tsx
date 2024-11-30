import { Component, createSignal, createEffect, onCleanup } from 'solid-js';
import styles from './putarfilm.module.css';
import ReportDialog from './pop-up/report';
import SubtitleSelector from './pop-up/subtitle';
import EpisodeList from './pop-up/episode';
import NextEpisodePopup from './pop-up/nextepisode';

interface VideoPlayerProps {
  src: string;
  onBack?: () => void;
  onEpisode?: () => void;
  onReport?: () => void;
}

interface EpisodeListProps {
  isOpen: boolean; // Changed from Accessor<boolean> to boolean
  onClose: () => void;
}

  const VideoPlayer: Component<VideoPlayerProps> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);
    const [isPlaying, setIsPlaying] = createSignal(false);
    const [currentTime, setCurrentTime] = createSignal(0);
    const [duration, setDuration] = createSignal(0);
    const [showSubtitles, setShowSubtitles] = createSignal(false);
    const [playbackSpeed, setPlaybackSpeed] = createSignal(1);
    const [isFullscreen, setIsFullscreen] = createSignal(false);
    const [isMuted, setIsMuted] = createSignal(false);
    const [volume, setVolume] = createSignal(1);
    const [isVolumeControlVisible, setIsVolumeControlVisible] = createSignal(false);
    const [showReportDialog, setShowReportDialog] = createSignal(false);
    const [currentSubtitleLang, setCurrentSubtitleLang] = createSignal('en');
    const [showPlaybackSpeedPopup, setShowPlaybackSpeedPopup] = createSignal(false);
    const [activeDotPosition, setActiveDotPosition] = createSignal(2);
    const [progressPosition, setProgressPosition] = createSignal(0);
    const [showControls, setShowControls] = createSignal(true);
    const [showEpisodelist, setShowEpisodelist] = createSignal(false);  
    const [showPopup, setShowPopup] = createSignal(false);
   
    let videoRef: HTMLVideoElement | undefined;
    let containerRef: HTMLDivElement | undefined;
    let volumeControlRef: HTMLDivElement | undefined;
    let progressBarRef: HTMLInputElement | undefined;
    let controlsTimeoutId: number;
    let hideControlsTimeoutId: number;

  createEffect(() => {
    if (videoRef && props.src) {
      videoRef.volume = volume();
    }
  });


  createEffect(() => {
    if (containerRef) {
      containerRef.addEventListener('mousemove', handleMouseMove);
      containerRef.addEventListener('mouseleave', () => {
        if (isFullscreen()) {
          setShowControls(false);
        }
      });
    }

    return () => {
      if (containerRef) {
        containerRef.removeEventListener('mousemove', handleMouseMove);
        containerRef.removeEventListener('mouseleave', () => {});
      }
      clearTimeout(hideControlsTimeoutId);
    };
  });

 const toggleEpisodePopup = () => {
    setIsOpen(!isOpen());
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  
 const handleNextVideo = () => {
    // Logic to redirect to the next video
    console.log("Redirecting to the next video...");
    // Implement your navigation logic here (e.g., using a router)
  };

  const handleSubmit = (reason: string) => {
    console.log('Submitted episode:', reason);
    setIsOpen(false);
  };

  
  const handleMouseMove = () => {
    if (isFullscreen()) {
      setShowControls(true);
      clearTimeout(hideControlsTimeoutId);
      hideControlsTimeoutId = window.setTimeout(() => {
        if (isFullscreen() && !showPlaybackSpeedPopup() && !isVolumeControlVisible()) {
          setShowControls(false);
        }
      }, 3000);
    }
  };

  // Handle video click for play/pause
  const handleVideoClick = (e: MouseEvent) => {
    e.preventDefault();
    if (e.detail === 1) { // Single click
      togglePlay();
      if (isFullscreen()) {
        setShowControls(true);
        clearTimeout(hideControlsTimeoutId);
        hideControlsTimeoutId = window.setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    }
  };

  createEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (document.fullscreenElement) {
        setShowControls(false);
      } else {
        setShowControls(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  });
 
  const handleEpisodesClick = () => {
    setShowEpisodelist(true);
  };
    
  const handleReportClick = () => {
    setShowReportDialog(true);
  };
  
  const handleSubtitleChange = (lang: string) => {
    setCurrentSubtitleLang(lang);
    console.log(`Subtitle language changed to: ${lang}`);
  };

  const handleTimeUpdate = () => {
    if (videoRef) {
      const newTime = videoRef.currentTime;
      setCurrentTime(newTime);
      updateProgressBar(newTime);
    }
  };

  const handleProgressBarClick = (e: MouseEvent) => {
    if (videoRef && progressBarRef) {
      const rect = progressBarRef.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const time = pos * videoRef.duration;
      videoRef.currentTime = time;
      updateProgressBar(time);
    }
  };



  const handleProgressBarChange = (e: Event) => {
    if (videoRef && e.target instanceof HTMLInputElement) {
      const time = parseFloat(e.target.value);
      videoRef.currentTime = time;
      updateProgressBar(time);
    }
  };

  const handleEpisodeSubmit = (reason: string) => {
    console.log('Report submitted:', reason);
    if (props.onReport) {
      props.onReport();
    }
  };


  const handleReportSubmit = (reason: string) => {
    console.log('Report submitted:', reason);
    if (props.onReport) {
      props.onReport();
    }
  };
  const handleSpeedSelection = (speed: number, index: number) => {
    if (videoRef) {
      const prevIndex = playbackSpeedOptions.findIndex(opt => opt.value === playbackSpeed());
      const direction = index > prevIndex ? 1 : -1;
      videoRef.playbackRate = speed;
      setPlaybackSpeed(speed);
      setActiveDotPosition(index);
    }
    setShowPlaybackSpeedPopup(false);
  };

  const updateProgressBar = (time: number) => {
    if (videoRef && progressBarRef) {
      const progress = (time / videoRef.duration) * 100;
      progressBarRef.style.setProperty('--progress-position', `${progress}%`);
      progressBarRef.value = time.toString();
    }
  };
  
  

  const togglePlaybackSpeedPopup = () => {
    setShowPlaybackSpeedPopup(!showPlaybackSpeedPopup());
  };

  const togglePlay = () => {
    if (videoRef) {
      if (isPlaying()) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying());
    }
  };

  const toggleMute = () => {
    if (videoRef) {
      videoRef.muted = !isMuted();
      setIsMuted(!isMuted());
    }
  };
  const playbackSpeedOptions = [
    { label: '0,5x', value: 0.5 },
    { label: '0,75x', value: 0.75 },
    { label: '1x', value: 1 },
    { label: '1,25x', value: 1.25 },
    { label: '1,5x', value: 1.5 }
  ];

  
  const seek = (seconds: number) => {
    if (videoRef) {
      videoRef.currentTime = Math.max(0, Math.min(videoRef.currentTime + seconds, duration()));
    }
  };

  const handleSeeking = (e: Event) => {
    if (videoRef && e.target instanceof HTMLInputElement) {
      const time = parseFloat(e.target.value);
      const duration = videoRef.duration;
      const position = (time / duration) * 100;
      
      // Update the progress position while dragging
      if (videoRef.parentElement) {
        videoRef.parentElement.style.setProperty('--progress-position', `${position}%`);
      }
    }
  };
 

  const handleLoadedMetadata = () => {
    if (videoRef) {
      setDuration(videoRef.duration);
    }
  };



  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const nextEpisode = {
    episodeNumber: 2, // Adjust based on your actual episode logic
    title: "Next Episode Title", // Provide the actual title
    description: "Description for the next episode", // Provide the actual description
    thumbnail: "./src/ULO/Film-Player/images/5e90c4640360708939fa9ee3f03a76c9.jpg", // Provide the actual thumbnail path
  };
  const changePlaybackSpeed = () => {
    const speeds = [0.5, 1, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed());
    const nextIndex = (currentIndex + 1) % speeds.length;
    if (videoRef) {
      videoRef.playbackRate = speeds[nextIndex];
      setPlaybackSpeed(speeds[nextIndex]);
    }
  };
  const handleSeek = (e: Event) => {
    if (videoRef && e.target instanceof HTMLInputElement) {
      const time = parseFloat(e.target.value);
      videoRef.currentTime = time;
      updateProgressBar(time);
    }
  };
  const handleDrag = (e: Event) => {
    if (videoRef && e.target instanceof HTMLInputElement) {
      const time = parseFloat(e.target.value);
      updateProgressBar(time);
    }
  };


  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleVolumeControl = () => {
    setIsVolumeControlVisible(!isVolumeControlVisible());
  };

  const handleVolumeChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (isVolumeControlVisible() && volumeControlRef && !volumeControlRef.contains(e.target as Node)) {
      setIsVolumeControlVisible(false);
    }
  };

  createEffect(() => {
    if (isVolumeControlVisible()) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  return (
    <div 
    ref={containerRef} 
    class={styles.videoContainerFawwaz}
    onMouseMove={handleMouseMove}
  >
     <div class={`${styles.backButtonFawwaz} ${!showControls() && isFullscreen() ? styles.hiddenFawwaz : ''}`} onClick={props.onBack}>
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_b_134_80)">
          <rect width="38" height="38" rx="19" fill="white" fill-opacity="0.12"/>
          <path d="M20.8318 8.75053L12.7469 18.5L20.8318 28.2495L22.835 25.8339L16.7532 18.5L22.835 11.1661L20.8318 8.75053Z" fill="white"/>
        </g>
        <defs>
          <filter id="filter0_b_134_80" x="-26.7" y="-26.7" width="91.4" height="91.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="13.35"/>
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_134_80"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_134_80" result="shape"/>
          </filter>
        </defs>
      </svg>
    </div>
   

    <div class={`${styles.reportButtonFawwaz} ${!showControls() && isFullscreen() ? styles.hiddenFawwaz : ''}`} onClick={handleReportClick}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.0083 2.33333V25.6667" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.0083 4.66667H19.075C22.225 4.66667 22.925 6.41667 20.7083 8.63334L19.3083 10.0333C18.375 10.9667 18.375 12.4833 19.3083 13.3L20.7083 14.7C22.925 16.9167 22.1083 18.6667 19.075 18.6667H6.0083" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <ReportDialog
        isOpen={showReportDialog()}
        onClose={() => setShowReportDialog(false)}
        onSubmit={handleReportSubmit}
      />

    
      <video
         ref={videoRef}
         class={styles.videoFawwaz}
         onTimeUpdate={handleTimeUpdate}
         onLoadedMetadata={handleLoadedMetadata}
         onClick={handleVideoClick}
         src={props.src}
         muted={isMuted()}
      />
      
      <div class={`${styles.controlsFawwaz} ${!showControls() && isFullscreen() ? styles.hiddenFawwaz : ''}`}>
        <div class={styles.progressBarWrapperFawwaz}>
          <input
          ref={progressBarRef}
          type="range"
          class={styles.progressBarFawwaz}
          min="0"
          max={duration()}
          value={currentTime()}
          onInput={handleProgressBarChange}
          onChange={handleProgressBarChange}
          />

<span class={styles.timeDisplayFawwaz}>
            {formatTime(currentTime())} / {formatTime(duration())}
          </span>
        </div>

        <div class={styles.buttonsContainerFawwaz}>
          <div class={styles.leftControlsFawwaz}>
            <button class={styles.controlButtonFawwaz} onClick={togglePlay}>
              {isPlaying() ? (
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5375 20.7025V5.2975C11.5375 3.835 10.92 3.25 9.36 3.25H5.4275C3.8675 3.25 3.25 3.835 3.25 5.2975V20.7025C3.25 22.165 3.8675 22.75 5.4275 22.75H9.36C10.92 22.75 11.5375 22.165 11.5375 20.7025Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22.7499 20.7025V5.2975C22.7499 3.835 22.1324 3.25 20.5724 3.25H16.6399C15.0907 3.25 14.4624 3.835 14.4624 5.2975V20.7025C14.4624 22.165 15.0799 22.75 16.6399 22.75H20.5724C22.1324 22.75 22.7499 22.165 22.7499 20.7025Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.9676 2.16669C6.98761 2.16669 2.13428 7.02002 2.13428 13C2.13428 18.98 6.98761 23.8334 12.9676 23.8334C18.9476 23.8334 23.8009 18.98 23.8009 13C23.8009 7.02002 18.9584 2.16669 12.9676 2.16669ZM16.2176 15.4159L13.0759 17.225C12.6859 17.4525 12.2526 17.5609 11.8301 17.5609C11.3968 17.5609 10.9743 17.4525 10.5843 17.225C9.80428 16.77 9.33844 15.9684 9.33844 15.0584V11.4292C9.33844 10.53 9.80428 9.71752 10.5843 9.26252C11.3643 8.80752 12.2959 8.80752 13.0868 9.26252L16.2284 11.0717C17.0084 11.5267 17.4743 12.3284 17.4743 13.2384C17.4743 14.1484 17.0084 14.9609 16.2176 15.4159Z" fill="white"/>
                </svg>
              )}
            </button>
            
            <button class={styles.controlButtonFawwaz} onClick={() => seek(-10)}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.335 17.2466V11.4617L8.70996 13.2708" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.855 4.84249L13 2.16669" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.31916 8.45001C4.11666 10.0533 3.36914 12.0358 3.36914 14.2025C3.36914 19.5217 7.68082 23.8334 13 23.8334C18.3192 23.8334 22.6308 19.5217 22.6308 14.2025C22.6308 8.88334 18.3192 4.57166 13 4.57166C12.2633 4.57166 11.5483 4.66921 10.855 4.83171" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.1667 11.4617C16.3583 11.4617 17.3333 12.4367 17.3333 13.6283V15.0908C17.3333 16.2825 16.3583 17.2575 15.1667 17.2575C13.975 17.2575 13 16.2825 13 15.0908V13.6283C13 12.4258 13.975 11.4617 15.1667 11.4617Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <button class={styles.controlButtonFawwaz} onClick={() => seek(10)}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.145 4.84249L13 2.16669" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.6808 8.45001C21.8833 10.0533 22.6308 12.0358 22.6308 14.2025C22.6308 19.5217 18.3192 23.8334 13 23.8334C7.68082 23.8334 3.36914 19.5217 3.36914 14.2025C3.36914 8.88334 7.68082 4.57166 13 4.57166C13.7367 4.57166 14.4517 4.66921 15.145 4.83171" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.335 17.2466V11.4617L8.70996 13.2708" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.1667 11.4617C16.3583 11.4617 17.3333 12.4367 17.3333 13.6283V15.0908C17.3333 16.2825 16.3583 17.2575 15.1667 17.2575C13.975 17.2575 13 16.2825 13 15.0908V13.6283C13 12.4258 13.975 11.4617 15.1667 11.4617Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <div class={styles.volumeControlFawwaz}>
              <button class={styles.controlButtonFawwaz} onClick={toggleVolumeControl}>
                {isMuted() ? (
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.2498 9.0675V8.0275C16.2498 4.79916 14.0073 3.56416 11.2773 5.27583L8.114 7.25833C7.76734 7.46416 7.3665 7.58333 6.96567 7.58333H5.4165C3.24984 7.58333 2.1665 8.66666 2.1665 10.8333V15.1667C2.1665 17.3333 3.24984 18.4167 5.4165 18.4167H7.58317" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.2773 20.7242C14.0073 22.4358 16.2498 21.19 16.2498 17.9725V14.0292" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M23.8332 2.16669L2.1665 23.8334" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                ) : (
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.2498 9.0675V8.0275C16.2498 4.79916 14.0073 3.56416 11.2773 5.27583L8.114 7.25833C7.76734 7.46416 7.3665 7.58333 6.96567 7.58333H5.4165C3.24984 7.58333 2.1665 8.66666 2.1665 10.8333V15.1667C2.1665 17.3333 3.24984 18.4167 5.4165 18.4167H7.58317" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.2773 20.7242C14.0073 22.4358 16.2498 21.19 16.2498 17.9725V14.0292" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.3775 10.205C21.3525 12.5342 21.06 15.2534 19.5 17.3334" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22.9124 8.45001C24.5049 12.2308 24.0283 16.6508 21.4824 20.0417" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                )}
              </button>
              {isVolumeControlVisible() && (
                <div ref={volumeControlRef} class={styles.volumeSliderFawwaz}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume()}
                    onInput={handleVolumeChange}
                    class={styles.volumeRangeFawwaz}
                  />
                </div>
              )}
            </div>
          </div>

          <div class={styles.rightControlsFawwaz}>
          <SubtitleSelector
            options={[
              { lang: 'id', label: 'Bahasa Indonesia' },
              { lang: 'en', label: 'English' }
            ]}
            onSelect={handleSubtitleChange}
            currentLang={currentSubtitleLang()}
          />

<div class={styles.iconContainerFawwaz}>
      <button
        class={styles.controlButtonFawwaz}
        onClick={handleNextVideo}
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 10.425V19.575C2.5 21.45 4.53749 22.625 6.16249 21.6875L10.125 19.4125L14.0875 17.125C14.3375 16.975 14.5375 16.8125 14.7 16.6125V13.4125C14.5375 13.2125 14.3375 13.05 14.0875 12.9L10.125 10.6125L6.16249 8.33751C4.53749 7.37501 2.5 8.54999 2.5 10.425Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.7002 10.425V19.575C14.7002 21.45 16.7377 22.625 18.3627 21.6875L22.3252 19.4125L26.2877 17.125C27.9127 16.1875 27.9127 13.85 26.2877 12.9L22.3252 10.6125L18.3627 8.33751C16.7377 7.37501 14.7002 8.54999 14.7002 10.425Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <NextEpisodePopup 
        isVisible={showPopup()} 
        episodeNumber={nextEpisode.episodeNumber} 
        title={nextEpisode.title} 
        description={nextEpisode.description} 
        thumbnail={nextEpisode.thumbnail} 
        
      />
    </div>

    <EpisodeList 
        isOpen={isOpen()} // Call the signal to get its value
        onClose={handleClose}
    />
          
      <button class={styles.controlButtonFawwaz} onClick={toggleEpisodePopup}> 

      <svg width="42" height="33" viewBox="0 0 42 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_217_655)">
<rect x="4.7" y="7.70012" width="26.2004" height="16.6003" rx="5.3" stroke="white" stroke-width="1.4"/>
<path d="M10.5996 4.00006H27.9999C31.3137 4.00006 33.9999 6.68635 33.9999 10.0001V17.5003" stroke="white" stroke-width="1.4"/>
<path d="M13.5996 1H30.9999C34.3137 1 36.9999 3.68629 36.9999 7V14.5002" stroke="white" stroke-width="1.4"/>
</g>
<defs>
<filter id="filter0_d_217_655" x="0" y="0.299988" width="41.7002" height="32.7004" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_217_655"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_217_655" result="shape"/>
</filter>
</defs>
</svg>

      </button>
      
<button class={styles.controlButtonFawwaz} onClick={togglePlaybackSpeedPopup}>
              <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.8808 3.31771C26.5246 7.3485 27.8474 15.2269 23.809 20.8813C22.2377 23.0814 20.015 24.6878 17.3641 25.523C16.8478 25.684 16.2952 25.4016 16.1342 24.8854C15.9733 24.3692 16.2556 23.8165 16.7718 23.6555C19.0128 22.9448 20.8939 21.592 22.2148 19.7426C25.6231 14.9704 24.5144 8.32032 19.7422 4.91198C14.97 1.50364 8.31989 2.61234 4.91155 7.38453C1.50322 12.1567 2.61192 18.8068 7.38411 22.2152C8.00056 22.6555 8.6808 23.0289 9.47488 23.3553C9.96834 23.5633 10.2143 24.1402 10.0063 24.6336C9.79837 25.1271 9.22141 25.3731 8.72795 25.1651C7.80177 24.7765 6.97883 24.3332 6.24546 23.8094C0.60174 19.7787 -0.721104 11.9002 3.31728 6.24589C7.35567 0.591537 15.2371 -0.71309 20.8808 3.31771Z" fill="white"/>
                <circle cx="3.5" cy="3.5" r="3.5" transform="matrix(1 0 0 -1 9 18)" fill="white"/>
                <rect x="16.7896" y="7.95392" width="2.09012" height="5.70978" transform="rotate(42.8919 16.7896 7.95392)" fill="white"/>
              </svg>
            </button>
            {showPlaybackSpeedPopup() && (
      <div class={styles.playbackSpeedPopupFawwaz}>
        <div class={styles.playbackSpeedTitleFawwaz}>Kecepatan Pemutaran</div>
        <div class={styles.speedOptionsFawwaz}>
          {playbackSpeedOptions.map((option, index) => (
            <div 
              class={`${styles.speedOptionFawwaz} ${playbackSpeed() === option.value ? styles.activeSpeedFawwaz : ''}`}
              onClick={() => handleSpeedSelection(option.value, index)}
            >
              <div class={styles.speedDotFawwaz}></div>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    )}
            <button class={styles.controlButtonFawwaz} onClick={toggleFullscreen}>
              {isFullscreen() ? (
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.1665 9.75002V7.04169C2.1665 4.34419 4.344 2.16669 7.0415 2.16669H9.74984" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.25 2.16669H18.9583C21.6558 2.16669 23.8333 4.34419 23.8333 7.04169V9.75002" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M23.8335 17.3333V18.9583C23.8335 21.6558 21.656 23.8333 18.9585 23.8333H17.3335" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.74984 23.8333H7.0415C4.344 23.8333 2.1665 21.6558 2.1665 18.9583V16.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.1665 9.75002V7.04169C2.1665 4.34419 4.344 2.16669 7.0415 2.16669H9.74984" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.25 2.16669H18.9583C21.6558 2.16669 23.8333 4.34419 23.8333 7.04169V9.75002" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M23.8335 17.3333V18.9583C23.8335 21.6558 21.656 23.8333 18.9585 23.8333H17.3335" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.74984 23.8333H7.0415C4.344 23.8333 2.1665 21.6558 2.1665 18.9583V16.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;