import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TypePipe} from './type.pipe';

@NgModule({
  imports: [BrowserModule],
  declarations: [TypePipe],
  exports: [TypePipe]
})
export class PipesModule {
    // NOOP
}
