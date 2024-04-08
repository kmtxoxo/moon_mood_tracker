import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import * as echarts from 'echarts';
@Component({
  selector: 'app-mood-box',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './mood-box.component.html',
  styleUrl: './mood-box.component.scss',
})
export class MoodBoxComponent implements OnInit {
  ngOnInit() {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('chart')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      // Add emotion colors here
      color: [
        '#FF0000', // Red
        '#00FF00', // Lime
        '#0000FF', // Blue
        '#FFFF00', // Yellow
        '#FF00FF', // Fuchsia
        '#00FFFF', // Aqua
        '#800000', // Maroon
        '#008000', // Green
        '#000080', // Navy
        '#808000', // Olive
        '#800080', // Purple
        '#008080', // Teal
        '#808080', // Gray
        '#C0C0C0', // Silver
      ],
      legend: {
        textStyle: {
          color: '#FFFFFF',
        },
        bottom: '0%',
        left: 'center',

        // Scroll type to make overflow happen
        type: 'scroll',
        pageIconColor: '#ffffff',
        pageTextStyle: {
          color: '#ffffff',
        },
      },

      series: [
        {
          name: 'Todays emotions',
          type: 'pie',
          colorBy: 'data',
          radius: ['55%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: 'inner',
          },

          data: [
            { value: 1048, name: 'Love' },
            { value: 735, name: 'Fear' },
            { value: 580, name: 'Anger' },
            { value: 484, name: 'Sorrow' },
            { value: 300, name: 'Jealous' },
          ],
        },
      ],
    };

    option && myChart.setOption(option);
  }
}
