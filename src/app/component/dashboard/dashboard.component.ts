import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { SpectroData } from '../../model/spectro-data';
import { DataService } from '../../shared/data.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  options: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    grid: {
      right: '25%',
      containLabel: true,
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: []
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true
      }
    ],
  };

  updateOptions = null;
  testStatus = false;

  date: Date = new Date();
  spectroDatas: SpectroData[] = [];

  constructor(
    private data: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.data.getLiveUpdates().subscribe((res) => {
      console.log('results:' + res);
      this.testStatus = false;
      this.data.setTestStatus(this.testStatus).then((res1) => {
      });

      // @ts-ignore
      const intensities = res.intensities;
      // @ts-ignore
      const wavelengths = res.wavelength;

      console.log('Max Wavelength:', Math.max(...wavelengths));
      const series1 = {
        name: 'Test one',
        type: 'line',
        smooth: true,
        data: intensities.map((intensity, index) => [wavelengths[index], intensity]),
      };

      this.updateOptions = {
        // xAxis: [{ data: intensities.sort((a, b) => a - b) }],
        // yAxis: [{ data: wavelengths.sort((a, b) => a - b) }],
        series: [series1],
      };
      // const intensities = res.intensities;
      // const wavelengths = this.spectroDatas[0].wavelength;
      //
      // console.log('Max Wavelength:', Math.max(...wavelengths));
      // const series1 = {
      //   name: 'Test one',
      //   type: 'line',
      //   smooth: true,
      //   data: intensities.map((intensity, index) => [wavelengths[index], intensity]),
      // };
    });
    this.data.getAllSpectroData().subscribe((res) => {
      this.spectroDatas = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });

      if (this.spectroDatas.length > 0) {
        const intensities = this.spectroDatas[0].intensities;
        const wavelengths = this.spectroDatas[0].wavelength;

        console.log('Max Wavelength:', Math.max(...wavelengths));
        const series1 = {
          name: 'Test one',
          type: 'line',
          smooth: true,
          data: intensities.map((intensity, index) => [wavelengths[index], intensity]),
        };

        this.updateOptions = {
          // xAxis: [{ data: intensities.sort((a, b) => a - b) }],
          // yAxis: [{ data: wavelengths.sort((a, b) => a - b) }],
          series: [series1],
        };

      } else {
        console.error('No spectroData available.');
      }
    }, error => {
      console.log('Error while fetching the results:', error);
    });
  }

  logout() {
    this.authService.logout();
  }
  startTest() {
    this.testStatus = true;
    this.data.setTestStatus(this.testStatus).then((res) => {
      // console.log(res);
    });
    // upload change set status to true
  }
}
