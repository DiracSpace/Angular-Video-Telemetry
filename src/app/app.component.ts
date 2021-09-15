import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

const template = /*html*/`
<div class="container mt-5">

  <div class="wrapper mb-5">

    <div class="player">

      <video 
        src="/assets/video.mp4" 
        type="video/mp4" #videoPlayer>
      </video>
      
      <!-- user actions overlay -->
      <div class="player-overlay">
        
        <h2 class="player-title">Video</h2>

        <!-- user actions -->
        <div class="player-actions">
          <button 
            class="button backward" 
            (click)="onClickRewind(10)"
            aria-label="Go back 10 seconds" 
            title="backward">
          </button>
          <button 
            class="button play" 
            aria-label="Play"
            (click)="onClickPlay()"
            title="play">
          </button>
          <button 
            class="button pause"
            (click)="onClickPause()"
            aria-label="Pause" 
            title="pause">
          </button>
          <button 
            class="button forward" 
            (click)="onClickFoward(10)"
            aria-label="Go forward 10 seconds" 
            title="forward">
          </button>
        </div>
        <!-- user actions -->

      </div>
      <!-- user actions overlay -->

      <!-- player progress bar -->
      <div class="player-progress">

        <input
          class="slider"
          type="range"
          [value]="progress"
          step="1"
          min="0"
        />
        
      </div>
      <!-- player progress bar -->

    </div>

  </div>

</div>
`

const styles = [/*css*/`
/* buttons css */
.button {
  inline-size: 32px;
  block-size: 32px;
  border: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.button:active {
  transform: scale(.9);
}

.play {
  background-image: url('/assets/play-icon.svg');

}

.pause {
  background-image: url('/assets/pause-icon.svg');
}

.backward {
  background-image: url('/assets/backward-icon.svg');

}

.forward {
  background-image: url('/assets/forward-icon.svg');
}
/* buttons css */

/* player css */
.wrapper {
  max-inline-size: 900px;
  margin: auto;
}

.player {
  margin-block-start: 100px;
  position: relative;
}

.player video {
  inline-size: 100%;
  aspect-ratio: 16/9;
  vertical-align: middle;
  object-fit: cover;
}

.player-title {
  color: white;
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 20px;
}

.player-actions {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.player-progress {
  position: absolute;
  inset-block-end: 0;
  inset-inline: 0;
  display: flex;
  padding: 10px;
}

/* input */
.player-progress input {
  flex: 1;
}

.player-progress input:hover {
  cursor: pointer;
}

input[type=range] {
  -webkit-appearance: none;
  margin: 50px 0;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 0.2px solid #010101;
  border-radius: 1.3px;
  background: #3071a9;
  cursor: pointer;
  height: 8.4px;
  width: 100%;
}

input[type=range]::-webkit-slider-thumb {
  background: url('/assets/bee-short.webp') center center no-repeat;
  background-color: transparent;
  background-size: contain;
  -webkit-appearance: none;
  margin-top: -23px;
  cursor: pointer;
  height: 50px;
  width: 50px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #367ebd;
}

input[type=range]::-moz-range-track {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 0.2px solid #010101;
  border-radius: 1.3px;
  background: #3071a9;
  cursor: pointer;
  height: 8.4px;
  width: 100%;
}
input[type=range]::-moz-range-thumb {
  background: url('/assets/bee-short.webp') center center no-repeat;
  background-color: transparent;
  background-size: contain;
  -webkit-appearance: none;
  border-radius: 3px;
  margin-top: -23px;
  cursor: pointer;
  height: 50px;
  width: 50px;
}

input[type=range]::-ms-track {
  border-color: transparent;
  background: transparent;
  color: transparent;
  cursor: pointer;
  height: 8.4px;
  width: 100%;
}

input[type=range]::-ms-fill-lower {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  background: #2a6495;
}

input[type=range]::-ms-fill-upper {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  background: #3071a9;
}

input[type=range]::-ms-thumb {
  background: url('/assets/bee-short.webp') center center no-repeat;
  background-color: transparent;
  background-size: contain;
  -webkit-appearance: none;
  border-radius: 3px;
  margin-top: -23px;
  cursor: pointer;
  height: 50px;
  width: 50px;
}

input[type=range]:focus::-ms-fill-lower {
  background: #3071a9;
}

input[type=range]:focus::-ms-fill-upper {
  background: #367ebd;
}
/* input */

.player-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  transition: .3s opacity;
  position: absolute;
  opacity: 0;
  inset: 0;
}

.player:hover .player-overlay {
  opacity: 1;
}
/* player css */
`];

@Component({
  selector: 'app-root',
  template,
  styles
})
export class AppComponent implements AfterViewInit {
  title = 'VideoTrackingEvents';

  // needed 
  @ViewChild('videoPlayer', { static: false }) player: ElementRef;
  video: HTMLVideoElement;
  playerTitle: string;
  progress: number = 0;

  // not needed
  status: string;

  constructor(
  ) { }

  ngAfterViewInit(): void {
    this.video = this.player.nativeElement;

    // video event listener functions 
    this.video.onplaying = () => { }
    this.video.onpause = () => { }
    this.video.onreset = () => { }

    this.video.addEventListener("timeupdate", (event) => {
      const events = event.target as HTMLVideoElement;
      const position = 100 * ((Math.round(events.currentTime)) / events.duration);
      this.progress = position;
    })
  }

  onClickPlay() {
    this.status = "playing";
    this.video.play();
  }

  onClickPause() {
    this.status = `paused video at ${this.progress}`;
    this.video.pause();
  }

  onClickRestart() {
    this.status = "Restart";
    this.video.currentTime = 0;
  }

  onClickRewind(value: number) {
    this.status = `rewinding ${value}`;
    this.video.currentTime -= value;
  }

  onClickFoward(value: number) {
    this.status = `fowarding ${value}`;
    this.video.currentTime += value;
  }
}
