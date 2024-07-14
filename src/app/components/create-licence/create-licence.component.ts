import { Component, Input, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Licence } from 'src/app/models/licence';
import { LicenceService } from 'src/app/services/licence.service';
import { MessageService } from 'primeng/api';
import { Customer } from 'src/app/models/customer';
import { LoadingService } from 'src/app/services/loading.service';
import { Subscription } from 'rxjs';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  templateUrl: './create-licence.component.html',
  styleUrls: ['./create-licence.component.css'],
  providers: [DialogService, MessageService],
})
export class CreateLicenceComponent implements OnInit {
  @Input() updatelicence?: Licence;
  updlcn?: Licence;
  loading!: boolean;
  licences: any[] | undefined;
  customers: any[] | undefined;
  selectedCustomerName: any;
  filteredCustomerName: any[] | undefined;
  selectedMachineName: any;
  filteredMachineName: any[] | undefined;
  private loadingSubscription!: Subscription;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private licenceService: LicenceService,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {
    this.updatelicence = this.config.data.licence;
    this.licences = this.config.data.licences;
    this.selectedCustomerName = {
      musteriAdi: this.updatelicence?.customer_name,
    };
    this.selectedMachineName = this.updatelicence;
    this.updlcn = {
      id: this.updatelicence?.id,
      customer_name: this.updatelicence?.customer_name!,
      machine_name: this.updatelicence?.machine_name!,
      machine_key: this.updatelicence?.machine_key!,
      request_date: this.updatelicence?.request_date!,
      isValid: this.updatelicence?.isValid,
      machine_no: this.updatelicence?.machine_no,
    };
    this.loadingSubscription = this.loadingService
      .getLoading()
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  ngOnInit(): void {
    this.licenceService.getCustomers().subscribe((result: Customer[]) => {
      this.customers = result;
    });
  }

  filterCustomerName(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < (this.customers as any[]).length; i++) {
      let customer = (this.customers as any[])[i];
      if (customer.musteriAdi.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(customer);
      }
    }
    this.filteredCustomerName = filtered;
  }

  filterMachineName(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < (this.licences as any[]).length; i++) {
      let licence = (this.licences as any[])[i];
      if (
        licence.machine_name.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(licence);
      }
    }
    this.filteredMachineName = filtered;
  }

  isObjectFullyFilled(obj: any) {
    if (obj === null || obj === undefined) {
      return false;
    }
    const keys = Object.keys(obj);
    for (const key of keys) {
      const value = obj[key];
      if (
        value === null ||
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return false;
      }
    }
    return true;
  }

  updateLicence(licence: Licence) {
    licence.customer_name = this.selectedCustomerName.musteriAdi;
    licence.machine_name = this.selectedMachineName.machine_name;
    licence.machine_key = licence.machine_key.toUpperCase();
    if (this.isObjectFullyFilled(licence)) {
      this.loadingService.setLoading(true);
      this.licenceService
        .updateLicence(licence)
        .subscribe((licences: Licence[]) => {
          this.ref.close(licence);
          this.loadingService.setLoading(false);
        });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Incomplete Information',
        detail: 'Please enter all informations',
      });
    }
  }

  createLicence(licence: Licence) {
    licence.customer_name = this.selectedCustomerName.musteriAdi;
    licence.machine_name = this.selectedMachineName.machine_name;
    licence.machine_key = licence.machine_key.toUpperCase();
    if (
      this.isObjectFullyFilled({
        customer_name: licence?.customer_name!,
        machine_name: licence?.machine_name!,
        machine_key: licence?.machine_key!,
        request_date: licence?.request_date!,
        machine_no: licence?.machine_no,
      })
    ) {
      this.loadingService.setLoading(true);
      this.licenceService
        .createLicence(licence)
        .subscribe((licences: Licence[]) => {
          this.ref.close(licence);
          this.loadingService.setLoading(false);
        });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Incomplete Information',
        detail: 'Please enter all informations',
      });
    }
  }
}
