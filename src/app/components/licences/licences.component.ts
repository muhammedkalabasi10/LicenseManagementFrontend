import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Licence } from '../../models/licence';
import { LicenceService } from '../../services/licence.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateLicenceComponent } from '../../components/create-licence/create-licence.component';
import { Table } from 'primeng/table';
import { LoadingService } from 'src/app/services/loading.service';
import { Subscription } from 'rxjs';

interface FilterOptions {
  name: string;
  code: string;
}

@Component({
  selector: 'licences',
  templateUrl: './licences.component.html',
  styleUrls: ['./licences.component.css'],
  providers: [DialogService],
})
export class LicencesComponent {
  loading!: boolean;
  licences: Licence[] = [];
  onlyConfirmed: Licence[] = [];
  onlyUnconfirmed: Licence[] = [];
  licenceToEdit?: Licence;
  searchtext = '';
  filterlicence!: false;
  options: FilterOptions[] | undefined;
  selectedOption: FilterOptions | undefined;

  private loadingSubscription!: Subscription;
  constructor(
    private licenceService: LicenceService,
    private loadingService: LoadingService,
    public dialogService: DialogService
  ) {
    this.loadingSubscription = this.loadingService
      .getLoading()
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  ref: DynamicDialogRef | undefined;

  show(editlicence?: Licence) {
    this.ref = this.dialogService.open(CreateLicenceComponent, {
      data: {
        licence: editlicence ? editlicence : new Licence(),
        licences: this.licences,
      },
      header: `${editlicence ? 'Onayla' : 'Ekle'}`,
      width: '60vh',
      height: '80vh',
      contentStyle: { overflow: 'visible' },
      baseZIndex: 1000,
      maximizable: true,
      resizable: true,
    });
    this.ref.onClose.subscribe((licence: Licence) => {
      if (licence && editlicence) {
        this.licences = this.licences.map((obj) => {
          if (obj.id == editlicence.id) {
            obj.customer_name = licence.customer_name;
            obj.machine_key = licence.machine_key;
            obj.machine_name = licence.machine_name;
            obj.machine_no = licence.machine_no;
            obj.request_date = licence.request_date;
            obj.isValid = true;
          }
          return obj;
        });
      } else if (licence) {
        this.licences.push(licence);
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  
  clear(table: Table) {
    table.clear();
    this.searchtext = '';
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.licenceService.getLicences().subscribe((result: Licence[]) => {
      this.loadingService.setLoading(false);
      this.licences = result;
      this.onlyConfirmed = result.filter((res) => {
        return res.isValid;
      });
      this.onlyUnconfirmed = result.filter((res) => {
        return !res.isValid;
      });
    });

    this.options = [
      { name: 'İkisi de', code: 'B' },
      { name: 'Sadece Onaylananlar', code: 'OC' },
      { name: 'Sadece Onaylanmayanlar', code: 'OU' },
    ];
  }

  updateLicenceList(licences: Licence[]) {
    this.licences = licences;
  }

  initNewLicence() {
    this.licenceToEdit = new Licence();
  }

  editLicence(licence: Licence) {
    this.licenceToEdit = licence;
  }
}
