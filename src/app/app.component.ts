import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

const template = /*html*/`
<div class="container mt-5">
  <div class="d-flex justify-content-center align-items-center flex-column">

    <div class="video">
      <video 
        id="video"
        #videoPlayer>

		    <source src="/assets/video.mp4" type='video/mp4' />

	    </video>
    </div>

    <div class="btn-group" role="group" aria-label="Basic example">
      <button (click)="onClickPlay()" type="button" class="btn btn-primary">play</button>
      <button (click)="onClickPause()" type="button" class="btn btn-primary">pause</button>
      <button (click)="onClickRestart()" type="button" class="btn btn-primary">restart</button>
      <button (click)="onClickRewind(-10)" type="button" class="btn btn-primary">rewind</button>
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
  @ViewChild('videoPlayer', { static: false }) player: ElementRef;

  title = 'VideoTrackingEvents';
  isPlaying: boolean = false;
  userStartedVideo: boolean = false;

  constructor(
  ) { }

  ngAfterViewInit(): void {
    const video: HTMLVideoElement = this.player.nativeElement;
    
    video.onplaying = () => {
      console.log("user clicked play");
    }

    video.onpause = () => {
      console.log("user clicked pause");
    }

    video.onreset = () => {
      console.log("user reset video");
    }
  }

  onClickPlay() {
    console.log("play");
    const video: any = document.getElementById('video');
    if (!this.isPlaying) {
      video.play();
      this.isPlaying = true;
    }
  }

  onClickPause() {
    console.log("pause");
    const video: any = document.getElementById('video');
    if (this.isPlaying) {
      video.pause();
      this.isPlaying = false;
    }
  }

  onClickRestart() {
    console.log("restart");
    const video: any = document.getElementById('video');
    video.currentTime = 0;
  }

  onClickRewind(value: number) {
    console.log("rewind");
    const video: any = document.getElementById('video');
    video.currentTime += value;
  }
}
