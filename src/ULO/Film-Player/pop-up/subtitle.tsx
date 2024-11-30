import { createSignal, For, Show } from 'solid-js';
import styles from '../putarfilm.module.css';

interface SubtitleOption {
  lang: string;
  label: string;
}

interface SubtitleSelectorProps {
  options: SubtitleOption[];
  onSelect: (lang: string) => void;
  currentLang: string;
}

const SubtitleSelector = (props: SubtitleSelectorProps) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const togglePopup = () => setIsOpen(!isOpen());

  return (
    <div class={styles.subtitleSelectorFawwaz}>
      <button
        class={`${styles.controlButtonFawwaz} ${styles.subtitleButtonFawwaz}`}
        onClick={togglePopup}
        aria-label="Select subtitle language"
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.74984 23.8334H16.2498C21.6665 23.8334 23.8332 21.6667 23.8332 16.25V9.75002C23.8332 4.33335 21.6665 2.16669 16.2498 2.16669H9.74984C4.33317 2.16669 2.1665 4.33335 2.1665 9.75002V16.25C2.1665 21.6667 4.33317 23.8334 9.74984 23.8334Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.9583 18.5034H16.9541" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.0507 18.5034H7.0415" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.9581 14.43H12.9673" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.0423 14.43H7.0415" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <Show when={isOpen()}>
        <div class={styles.subtitlePopupFawwaz}>
          <For each={props.options}>
            {(option) => (
              <button
                class={`${styles.subtitleOptionFawwaz} ${
                  props.currentLang === option.lang ? styles.active : ''
                }`}
                onClick={() => {
                  props.onSelect(option.lang);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default SubtitleSelector;