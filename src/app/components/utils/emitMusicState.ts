export function emitMusicState(playing: boolean) {
  window.dispatchEvent(new CustomEvent("guide-music-state", { detail: playing }));
}
