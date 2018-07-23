import { Component, OnInit, Input } from '@angular/core';

import { PcapService, PcapStatusResponse } from '../service/pcap.service';
import { PcapRequest } from '../model/pcap.request';
import { Pdml } from '../model/pdml';
import {Subscription} from 'rxjs/Rx';
import { PcapPagination } from '../model/pcap-pagination';

class Query {
  id: String
}

@Component({
  selector: 'app-pcap-panel',
  templateUrl: './pcap-panel.component.html',
  styleUrls: ['./pcap-panel.component.scss']
})
export class PcapPanelComponent {

  @Input() pdml: Pdml = null;
  @Input() pcapRequest: PcapRequest;
  @Input() resetPaginationForSearch: boolean;

  statusSubscription: Subscription;
  queryRunning: boolean = false;
  queryId: string;
  progressWidth: number = 0;
  pagination: PcapPagination = new PcapPagination();
  savedPcapRequest: {};
  selectedPage: number = 1;

  constructor(private pcapService: PcapService ) { }

  changePage(page) {
    this.selectedPage = page;
    this.pcapService.getPackets(this.queryId, this.selectedPage).toPromise().then(pdml => {
      this.pdml = pdml;
    });
  }

  onSearch(pcapRequest, resetPaginationForSearch = true, from = 1) {
    this.savedPcapRequest = pcapRequest;
    if (resetPaginationForSearch === true) {
      pcapRequest.from = 1;
    } else {
      pcapRequest.from = from;
    }
    this.pdml = null;
    this.progressWidth = 0;
    this.pcapService.submitRequest(pcapRequest).subscribe(id => {
      this.queryId = id;
      this.queryRunning = true;
      this.statusSubscription = this.pcapService.pollStatus(id).subscribe((statusResponse: PcapStatusResponse) => {
        if ('SUCCEEDED' === statusResponse.jobStatus) {
          this.pagination.total = statusResponse.pageTotal;
          this.statusSubscription.unsubscribe();
          this.queryRunning = false;
          this.pcapService.getPackets(id, this.selectedPage).toPromise().then(pdml => {
            this.pdml = pdml;
          });
        } else if (this.progressWidth < 100) {
          this.progressWidth = Math.trunc(statusResponse.percentComplete);
        }
      });
    });
  }

  getDownloadUrl() {
    return this.pcapService.getDownloadUrl(this.queryId, this.selectedPage);
  }
}