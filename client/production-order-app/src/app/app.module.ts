import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppService } from './app.service';
import { MaterialModule } from './material.module';
import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { OrderInputModule } from './components/order-input/order-input.module';
import { OrderListModule } from './components/order-list/order-list.module';
import { MessageService } from './services/message.service';
import { ToastrModule } from 'ngx-toastr';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './my-rx-stomp.config';
import { StatusComponent } from './status/status.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    routing,
    MaterialModule,
    OrderInputModule,
    OrderListModule,
    ToastrModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [
    AppService,
    MessageService,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
