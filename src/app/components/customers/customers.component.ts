import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { Subscription } from 'rxjs';
import { LicenceService } from 'src/app/services/licence.service';
import { Customer } from 'src/app/models/customer';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CustomersComponent {
  loading!: boolean;
  customers:Customer[]=[]
  searchtext = '';
  isBlurry=false;

  private loadingSubscription!: Subscription;
  constructor(private licenceService: LicenceService,private loadingService: LoadingService, private confirmationService: ConfirmationService, private messageService: MessageService){
    this.loadingSubscription = this.loadingService
      .getLoading()
      .subscribe((loading) => {
        this.loading = loading;
      });
      this.loadingService.setLoading(true);
      licenceService.getCustomers().subscribe((result:Customer[])=>{
        this.customers = result;
        console.log(result)
        this.loadingService.setLoading(false);
      })
  }

  confirmdelete(customer:Customer) {
    this.isBlurry=true
    this.confirmationService.confirm({
        message: `${customer.musteriAdi} adlı müşteriyi silmek istediğine emin misin?`,
        header: 'Silme İşlemi',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.isBlurry=false
            this.messageService.add({ severity: 'info', summary: 'Silindi', detail: 'Silme işlemini kabul ettin' });
        },
        reject: (type:ConfirmEventType) => {
          this.isBlurry=false
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
}

  clear(table: Table) {
    table.clear();
    this.searchtext = '';
  }  

  update(customer:Customer){

  }

  delete(customer:Customer){

  }
}
