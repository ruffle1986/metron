import { NgModule, ModuleWithProviders } from '@angular/core';
import { CentralNavigationComponent } from './central-navigation.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CentralNavigationComponent],
  exports: [CentralNavigationComponent],
  entryComponents: [CentralNavigationComponent]
})
export class CentralNavigationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CentralNavigationModule,
      providers: []
    };
  }
}
