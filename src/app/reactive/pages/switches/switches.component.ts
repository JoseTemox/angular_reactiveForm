import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-switches',
  imports: [JsonPipe],
  templateUrl: './switches.component.html',
})
export class SwitchesComponent {}
