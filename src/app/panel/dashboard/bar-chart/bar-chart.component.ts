import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RangeSlidePickerOptions } from '@shared/components/range-slide-picker/range-slide-picker.component';
import * as moment from 'moment';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {


  @Output() currencyChanged: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  currency = 'USD';
  barChart: any;
  chartOptions: any = null;

  rangeSliderOptions: RangeSlidePickerOptions = null;
  from: string;
  to: string;

  private _volumes: any[] = [];

  constructor() { }

  @Input()
  set volumes(value: any[]) {
    this._volumes = value;
    if (this._volumes.length) {
      if (!this.from || !this.to) {
        this.from = moment(this._volumes[0].date).format('ll');
        this.to = moment(this._volumes[this._volumes.length - 1].date).format('ll');
      }
      this.rangeSliderOptions = { grid: true, type: 'double', values: this._volumes.map(vd => moment(vd.date).format('ll')) };
    }
    this.initChart();
  }

  get volumes() {
    return this._volumes.filter(v => {
      const date = moment(v.date).format('ll');
      return moment(date).isSameOrAfter(moment(this.from)) && moment(date).isSameOrBefore(moment(this.to));
    });
  }

  get total() {
    return this.volumes.reduce((previous: number, current: any) => previous + current.volume, 0);
  }

  ngOnInit() { }

  filterByCurrency(currency: string) {
    this.currency = currency;
    this.currencyChanged.emit(currency);
  }

  onSliderChanged({ from, to }) {
    this.from = from;
    this.to = to;
    this.initChart();
  }

  initChart() {
    const volumes = this.volumes;
    const maxValue = Math.max.apply(null, volumes.map(v => v.volume));
    this.chartOptions = {
      aspectRatio: 4,
      scales: {

        yAxes: [{
          ticks: {
            suggestedMax: maxValue + maxValue * 0.01
          }
        }],
        xAxes: [{
          barPercentage: 0.5,
        }]
      }
    };
    this.barChart = {
      labels: volumes.map(vd => moment(vd.date).format('ll')),
      datasets: [
        {
          backgroundColor: '#047bf8',
          label: 'Number of users',
          data: volumes.map(vd => vd.volume)
        },
      ],
      scales: {
        yAxes: [{
          ticks: {
            padding: 100
          }
        }],
      }
    };
  }

}
