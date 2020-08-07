import {Component, OnInit} from '@angular/core';
import {DownloadService} from "../service/download.service";
import {ActivatedRoute, Router} from "@angular/router";
import {flatMap} from "rxjs/internal/operators";
import {of} from "rxjs/index";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  constructor(private downloadService: DownloadService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {	 
  }
    
  export() {               
    this.downloadService.downloadPDF().subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    });         
  } 
}
