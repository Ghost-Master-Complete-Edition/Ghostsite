import { Component, ElementRef, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '(mousemove)' : 'onMouseMove($event)'
    }
})

export class App {
  constructor(private el: ElementRef){
  }
  

    /*Add div back in app.html for cursor glow*/
    
    onMouseMove = (event: MouseEvent) => {
    const mouseX = event.clientX - 15;
    const mouseY = event.clientY - 15;
    const elem = this.el.nativeElement.querySelector('.cursor-glow');
    elem.style.left = mouseX + 'px';
    elem.style.top = mouseY + 'px';
  }
}
