import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const template = /*html*/`
<p>
  <ngb-progressbar 
    type="warning" 
    textType="white" 
    [value]="progress"
    [striped]="true"
    [height]="height"
    [animated]="true">
    <span class="d-flex justify-content-end">
      <div class="draggableBee">
        <img
          [ngStyle]="beeImgStyle"
          [src]="beeImgSrc"
          alt="bee-progress"
          draggable="false"
        />
      </div>
    </span>
  </ngb-progressbar>
</p>
`

const styles = [/*css*/`

`];

@Component({
  selector: 'app-video-progress-bar',
  template,
  styles
})
export class VideoProgressBarComponent implements OnInit {

  private _progress: number;
  get progress() { return this._progress }
  @Input() set progress(progress: number) { this._progress = progress }
  @Output() progressChange = new EventEmitter<number>();

  beeImg: HTMLElement;

  // TODO implement fowarding through sectionsd

  constructor() { }

  ngOnInit(): void {
    const bee = document.querySelector('.draggableBee') as HTMLElement;
    bee.draggable = true;
    bee.addEventListener("mousedown", (event: MouseEvent) => {
      // TODO implement draggable event
    })
  }

  get beeImgSrc() { return '/assets/bee-short.webp'}
  get height() { return '1.5rem'; }

  get beeImgStyle() {
    return {
      'height': '1.4rem'
    }
  }
}
