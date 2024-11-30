import { Show } from 'solid-js';
import './nexepisode.css';

interface NextEpisodePopupProps {
  isVisible: boolean;
  episodeNumber: number;
  title: string;
  description: string;
  thumbnail: string;
}


function NextEpisodePopup(props: NextEpisodePopupProps) {
  return (
    <Show when={props.isVisible}>
      <div class="next-episode-popupFawwaz">
        <div class="popup-headerFawwaz">
          Episode berikutnya
        </div>
        <div class="popup-contentFawwaz">
          <img 
            src={props.thumbnail} 
            alt={`Episode ${props.episodeNumber}`} 
            class="thumbnailFawwaz"
          />
          <div class="episode-infoFawwaz">
            <div class="episode-titleFawwaz">
              <span class="episode-numberFawwaz">{props.episodeNumber}.</span>
              <span>Episode {props.episodeNumber}</span>
            </div>
            <p class="episode-descriptionFawwaz">
              {props.description}
            </p>
          </div>
        </div>
      </div>
    </Show>
  );
}

export default NextEpisodePopup;