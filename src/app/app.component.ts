import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

const template = /*html*/`
<div class="container mt-5">
  <div class="d-flex justify-content-center align-items-center flex-column">

    <div class="video">

      <video 
        id="video"
        #videoPlayer>
		    <source src="/assets/video.mp4" type='video/mp4' />
	    </video>

      <app-video-progress-bar
        [(progress)]="progress">        
      </app-video-progress-bar>
    </div>

    <div class="btn-group" role="group">
      <button (click)="onClickPlay()" [disabled]="isPlaying" type="button" class="btn btn-primary">play</button>
      <button (click)="onClickPause()" [disabled]="!isPlaying" type="button" class="btn btn-primary">pause</button>
      <button (click)="onClickRestart()" [disabled]="!isPlaying" type="button" class="btn btn-primary">restart</button>
      <button (click)="onClickRewind(5)" [disabled]="!isPlaying" type="button" class="btn btn-primary">rewind</button>
      <button (click)="onClickFoward(5)" [disabled]="!isPlaying" type="button" class="btn btn-primary">foward</button>
    </div>

    <div class="container">
      <p>status: {{ status }}</p>
    </div>

  </div>
</div>
`

const styles = [/*css*/`

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
  isPlaying: boolean = false;
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

    if (!this.isPlaying) {
      this.video.play();
      this.isPlaying = true;
    }
  }

  onClickPause() {
    this.status = `paused video at ${this.progress}`;

    if (this.isPlaying) {
      this.video.pause();
      this.isPlaying = false;
    }
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
