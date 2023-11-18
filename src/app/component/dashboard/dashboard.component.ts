import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { SpectroData } from '../../model/spectro-data';
import { DataService } from '../../shared/data.service';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  intensities = [0.5, 0.8, 0.6, 0.9, 0.7];
  wavelength = [400, 450, 500, 550, 600];
  date: Date = new Date();

  spectroDatas: SpectroData[] = [];
  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: [0.5, 0.8, 0.6, 0.9, 0.7],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };

  constructor(
    private data: DataService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    const spectroData = new SpectroData();

    // spectroData.intensities = this.intensities;
    // spectroData.wavelength = this.wavelength;
    // const spectroDataObject = spectroData.toPlainObject();
    //
    // this.data.addSpectroData(spectroDataObject)
    //   .then((result) => {
    //     console.log('Add Spectro Data Result:', result);
    //     // Additional code to handle the result if needed
    //
    //     // Update chart data after successfully adding spectro data
    //     // this.chartOption.series[0].data = spectroData.intensities;
    //   })
    //   .catch((error) => {
    //     console.error('Error adding spectro data:', error);
    //     // Additional code to handle the error if needed
    //   });

    this.data.getAllSpectroData().subscribe((res) => {
      this.spectroDatas = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });

      // Assuming the first element in spectroDatas has the data you want to display
      if (this.spectroDatas.length > 0) {
        console.log(this.chartOption.series[0]?.data);

        this.chartOption.series[0].data = this.spectroDatas[0].wavelength;

        // Log to check the updated data
        console.log(this.chartOption.series[0]?.data);
      } else {
        console.error('No spectroData available.'); // Handle the case when there's no data
      }
    }, error => {
      console.log('Error while fetching the results:', error);
    });
  }
  logout() {
    this.authService.logout();
  }
}
