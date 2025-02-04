import { Component } from '@angular/core';
import { PropertiesListingsService } from 'src/app/services/properties-listings.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  TotalProperties: any = 0;
  PublishedProperties: any = 0;
  FavoriteProperties: any = 0;

  Bookings: any[] = [];
  chart: any;

  constructor(private propertiesService: PropertiesListingsService) {
    this.getTotalProperties();
    this.getFavoriteProperties();
    this.getAllBookings();
  }

  getTotalProperties() {
    this.propertiesService.getAllListings().subscribe((res: any) => {
      this.TotalProperties = res.length;
      console.log("TotalProperties => " + this.TotalProperties);
    });
  }

  getFavoriteProperties() {
    this.propertiesService.getFavoriteListings().subscribe((res: any) => {
      this.FavoriteProperties = res.length;
      console.log("FavoriteProperties => " + this.FavoriteProperties);
    });
  }

  getAllBookings() {
    this.propertiesService.getAllBookings().subscribe({
      next: (res: any[]) => {
        this.Bookings = JSON.parse(JSON.stringify(res, null, 2));
        console.log("All Bookings =>", this.Bookings);
        this.updateChart();
      },
      error: (err: any) => {
        console.error("Error fetching bookings", err);
      }
    });
  }

  updateChart() {
    // Clear previous chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    // Prepare data for chart
    const labels: string[] = [];
    const dataCounts: { [key: string]: { [key: string]: number } } = {};

    this.Bookings.forEach(booking => {
      // Extract the start date from the period
      const startDateStr = booking.Period.split(' to ')[0];
      const startDate = new Date(startDateStr);
      const periodLabel = `${startDate.getFullYear()}-${startDate.getMonth() + 1}`;

      // Count statuses
      if (!dataCounts[periodLabel]) {
        dataCounts[periodLabel] = {};
      }
      if (!dataCounts[periodLabel][booking.Status]) {
        dataCounts[periodLabel][booking.Status] = 0;
      }
      dataCounts[periodLabel][booking.Status]++;
    });

    const periods = Object.keys(dataCounts);
    const statuses = Array.from(new Set(
      periods.flatMap(period => Object.keys(dataCounts[period]))
    ));

    const datasets = statuses.map(status => ({
      label: status,
      data: periods.map(period => dataCounts[period][status] || 0),
      backgroundColor: this.getRandomColor(),
      borderColor: this.getRandomColor(),
      borderWidth: 1
    }));

    // Create the chart
    this.chart = new Chart('bookingsChart', {
      type: 'bar',
      data: {
        labels: periods,
        datasets: datasets
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}