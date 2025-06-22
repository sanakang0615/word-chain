// Sound utility for the word chain game
class SoundManager {
  constructor() {
    this.fleeSound = new Audio('/mp3/undertale-flee.mp3');
    this.selectSound = new Audio('/mp3/undertale-select-sound.mp3');
    this.correctSound = new Audio('/mp3/undertale-sound-effect-attack-hit.mp3');
    this.incorrectSound = new Audio('/mp3/undertale-slash.mp3');
    this.hintSound = new Audio('/mp3/phone_ring.mp3');
    this.typingSound = new Audio('/mp3/sans-talking-short.mp3');
    this.soulShatterSound = new Audio('/mp3/undertale-soul-shatter.mp3');
    this.backgroundMusic = new Audio('/mp3/gasters-theme.mp3');
    this.gasterVanishSound = new Audio('/mp3/gaster-vanish.mp3');
    
    // Configure background music for looping
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3; // Set volume to 30%
    
    // Set typing sound volume to 50%
    this.typingSound.volume = 0.5;
    
    // Preload sounds
    this.fleeSound.load();
    this.selectSound.load();
    this.correctSound.load();
    this.incorrectSound.load();
    this.hintSound.load();
    this.typingSound.load();
    this.soulShatterSound.load();
    this.backgroundMusic.load();
    this.gasterVanishSound.load();
  }

  playFleeSound() {
    this.fleeSound.currentTime = 0;
    this.fleeSound.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  }

  playSelectSound() {
    this.selectSound.currentTime = 0;
    this.selectSound.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  }

  playCorrectSound() {
    this.correctSound.currentTime = 0;
    this.correctSound.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  }

  playIncorrectSound() {
    this.incorrectSound.currentTime = 0;
    this.incorrectSound.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  }

  playHintSound() {
    this.hintSound.currentTime = 0;
    this.hintSound.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  }

  playTypingSound() {
    this.typingSound.currentTime = 0;
    this.typingSound.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  }

  playSoulShatterSound() {
    this.soulShatterSound.currentTime = 0;
    this.soulShatterSound.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  }

  playGasterVanishSound() {
    this.gasterVanishSound.currentTime = 0;
    this.gasterVanishSound.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
  }

  startBackgroundMusic() {
    this.backgroundMusic.play().catch(error => {
      console.log('Background music playback failed:', error);
    });
  }

  stopBackgroundMusic() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  toggleBackgroundMusic() {
    if (this.backgroundMusic.paused) {
      this.startBackgroundMusic();
    } else {
      this.stopBackgroundMusic();
    }
  }

  isBackgroundMusicPlaying() {
    return !this.backgroundMusic.paused;
  }
}

// Create a singleton instance
const soundManager = new SoundManager();

export default soundManager; 