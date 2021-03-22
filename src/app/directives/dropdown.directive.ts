import {
    Directive,
    ElementRef,
    Renderer2,
    HostBinding,
    HostListener,
} from '@angular/core';

@Directive({
    selector: '[appDropdown]',
    exportAs: 'appDropDown'
})
export class DropdownDirective {


    private wasInside = false;
  
    @HostBinding("class.show") isOpen = false;
  
    @HostListener("click") toggleOpen() {
      this.isOpen = !this.isOpen;
      this.wasInside = true;
    }
  
    // https://stackoverflow.com/a/46656671
    @HostListener("document:click") clickout() {
      if (!this.wasInside) {
        this.isOpen = false;
      }
      this.wasInside = false;
    }



    // constructor(private el: ElementRef, private renderer: Renderer2) {}

    // @HostBinding('class.show') isOpen = false;

    // @HostListener('click') toggleOpen() {
    //     this.isOpen = !this.isOpen;
    //     let part = this.el.nativeElement.querySelector('projects-dropdown');
    //     if (this.isOpen) this.renderer.addClass(part, 'show');
    //     else this.renderer.removeClass(part, 'show');
    // }
}


// import { 
//     Directive, 
//     HostListener, 
//     HostBinding 
//   } from "@angular/core";
  
//   @Directive({
//     selector: "[appDropdown]",
//     exportAs: "appDropDown"
//   })
//   export class DropdownDirective {

//   }