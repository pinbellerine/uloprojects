// store.js
import { createStore } from 'solid-js/store';

export const [daftarSaya, setDaftarSaya] = createStore({
  items: JSON.parse(localStorage.getItem('daftarSaya')) || []
});

export const toggleFilmInDaftarSaya = (film) => {
  const isInList = daftarSaya.items.find((item) => item.id === film.id);
  if (isInList) {
    // Remove film if already in the list
    setDaftarSaya("items", (items) => items.filter((item) => item.id !== film.id));
  } else {
    // Add film if not in the list
    setDaftarSaya("items", (items) => [...items, film]);
  }
  // Save to localStorage
  localStorage.setItem('daftarSaya', JSON.stringify(daftarSaya.items));
};

export const isFilmInDaftarSaya = (filmId) => {
  return daftarSaya.items.some((item) => item.id === filmId);
};
