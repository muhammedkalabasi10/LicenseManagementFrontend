import { Component, OnDestroy } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DialogService]
})
export class AppComponent implements OnDestroy{
  title="client";
  loading=false;
  private loadingSubscription!: Subscription;

  constructor(private loadingService:LoadingService){
    this.loadingSubscription = this.loadingService.getLoading().subscribe((loading) => {
      this.loading = loading;
    });
    
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
