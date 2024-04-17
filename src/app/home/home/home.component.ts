import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart, registerables } from 'node_modules/chart.js'

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {Dialog, DialogModule, DialogRef} from '@angular/cdk/dialog';
import { CompanyInfoDialogComponent } from '../company-info-dialog/company-info-dialog.component';


Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


    constructor(public translate : TranslateService){

    }

  ngOnInit(): void {
    this.RenderChart()
    this.polarArea()
  }


  RenderChart(){
    const myChart = new Chart("piechart", {
      type: 'bar',
      data: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
          datasets: [{
              label: 'SoftGo Smart Soulations',
              data: [10, 15, 10, 12, 15, 19],
              backgroundColor: [
                  '#1cba1c',
                  '#39b3fe',
                  '#1cba1c',
                  '#39b3fe',
                  '#1cba1c',
                  '#39b3fe'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  '#1cba1c',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

  barChart(){
    const myChart = new Chart("barchart", {
      type: 'pie',
      data: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
          datasets: [{
              label: 'SoftGo Smart Soulations',
              data: [2, 5, 8, 12, 15, 19],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  '#3c6486',
                  '#dced01',
                  '#31d1f9'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

  polarArea(){
    const myChart = new Chart("pochart", {
      type: 'polarArea',
      data: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
          datasets: [{
              label: 'SoftGo Smart Soulations',
              data: [15, 15, 8, 22, 15, 19],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  '#39b3fe',
                  '#1cba1c',
                  '#3c6486',
                  '#dced01',
                  '#31d1f9'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

  radar(){
    const myChart = new Chart("rochart", {
      type: 'radar',
      data: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
          datasets: [{
              label: 'SoftGo Smart Soulations',
              data: [2, 5, 8, 12, 15, 19],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  '#3c6486',
                  '#dced01',
                  '#31d1f9'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }
  
  doughnut(){
    const myChart = new Chart("dochart", {
      type: 'doughnut',
      data: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
          datasets: [{
              label: 'SoftGo Smart Soulations',
              data: [2, 5, 8, 12, 15, 19],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  '#3c6486',
                  '#dced01',
                  '#31d1f9'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  
}

    lessons = [
        {
            id : 120,
            description : "introduction to angular material",
            duration : "4:17",
            seqNo : 1,
            courseId : 11
        },
        {
            id : 121,
            description : "Navigation and containers",
            duration : "4:17",
            seqNo : 1,
            courseId : 11
        },
        {
            id : 121,
            description : "Data Tabels",
            duration : "4:17",
            seqNo : 1,
            courseId : 11
        },
        {
            id : 121,
            description : "Dialog and iverlays",
            duration : "4:17",
            seqNo : 1,
            courseId : 11
        },
        {
            id : 121,
            description : "angular mokhtar",
            duration : "4:17",
            seqNo : 1,
            courseId : 11
        },
        {
            id : 121,
            description : "angular 555555555555555555555",
            duration : "4:17",
            seqNo : 1,
            courseId : 11
        },
        {
            id : 121,
            description : "angular 555555555555555555555",
            duration : "4:17",
            seqNo : 1,
            courseId : 11
        },
        {
            id : 121,
            description : "angular 6666666666666666666",
            duration : "4:17",
            seqNo : 1,
            courseId : 11
        },
        {
            id : 121,
            description : "angular 777777777777777777",
            duration : "4:17",
            seqNo : 1,
            courseId : 11
        },
        {
            id : 121,
            description : "angular88 ",
            duration : "4:17",
            seqNo : 1,
            courseId : 11
        },

    ]

    movies = [
        'Episode I - The Phantom Menace',
        'Episode II - Attack of the Clones',
        'Episode III - Revenge of the Sith',
        'Episode IV - A New Hope',
        'Episode V - The Empire Strikes Back',
        'Episode VI - Return of the Jedi',
        'Episode VII - The Force Awakens',
        'Episode VIII - The Last Jedi',
        'Episode IX - The Rise of Skywalker',
      ];
    
      drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
      }

      sayHello(){
        alert("hello");
      }

 
}




