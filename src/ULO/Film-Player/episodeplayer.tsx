import { Component} from 'solid-js';
import VideoPlayer from './putarepisode'; // Pastikan path ini sesuai dengan lokasi VideoPlayer.tsx

const EPS: Component = () => {
  const videoUrl = 'videos/valorant.mp4'; // Path relatif ke video Anda

  return (
    <div>
      <VideoPlayer 
        src={videoUrl}
        onBack={() => console.log('Navigasi kembali')} 
        onReport={() => console.log('Laporan dikirim')} 
      />
    </div>
  );
};

export default EPS;
