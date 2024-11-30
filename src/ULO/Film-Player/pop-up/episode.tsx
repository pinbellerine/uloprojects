import { createSignal, For, Show } from 'solid-js';
import './episode.css';

interface Episode {
  number: number;
  title: string;
  description: string;
  image?: string;
}

interface EpisodeListProps {
  isOpen: boolean;
  onClose: () => void;
}

function EpisodeList(props: EpisodeListProps) {
  const [selectedEpisode, setSelectedEpisode] = createSignal<number | null>(null);

  const handleEpisodeClick = (episodeNumber: number) => {
    setSelectedEpisode(current => current === episodeNumber ? null : episodeNumber);
  };

  const handleOverlayClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('overlay')) {
      props.onClose();
    }
  };

  const episodes: Episode[] = [
    {
      number: 1,
      title: 'Episode 1',
      description: 'Eun-gyeol dan keluarganya pindah ke lingkungan baru. Dia bertemu dengan seorang pria yang menawarkan untuk mengajarinya cara bermain gitar, dan Eun-gyeol bekerja keras untuk mempelajarinya.',
      image: 'src/ULO/Film-Player/images/5e90c4640360708939fa9ee3f03a76c9.jpg',
    },
    {
      number: 2,
      title: 'Episode 2',
      description: '...',
    },
    {
      number: 3,
      title: 'Episode 3',
      description: '...',
    },
    {
      number: 4,
      title: 'Episode 4',
      description: '...',
    },
    {
      number: 5,
      title: 'Episode 5',
      description: '...',
    },
  ];

  return (
    <Show when={props.isOpen}>
      <div class="overlayFawwaz" onClick={handleOverlayClick}>
        <div class="episode-listFawwaz">
          <For each={episodes}>
            {(episode) => {
              const isSelected = () => selectedEpisode() === episode.number;
              
              return (
            
                <div class="episodeFawwaz">
                  
                  <div 
                    class="episode-headerFawwaz" 
                    onClick={() => handleEpisodeClick(episode.number)}
                  >
                    <div class="episode-number-titleFawwaz">
                      <span class="episode-numberFawwaz">{episode.number}.</span>
                      <span class="episode-titleFawwaz">Episode {episode.number}</span>
                    </div>
                    <svg
                      class={`chevronFawwaz ${isSelected() ? 'expandedFawwaz' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  <div class={`episode-contentFawwaz ${isSelected() ? 'expandedFawwaz' : ''}`}>
                    {episode.image && (
                      <img 
                        src={episode.image} 
                        alt={`Episode ${episode.number}`} 
                        class="episode-imageFawwaz"
                      />
                    )}
                    <p class="episode-descriptionFawwaz">{episode.description}</p>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </Show>
  );
}

export default EpisodeList;