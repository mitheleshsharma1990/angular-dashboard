import { Injectable, inject } from '@angular/core';
import { Metric } from '../types/metric';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  private http = inject(HttpClient);

  getMetrics(page: number, search: string, country: string) {
    return this.http.get<Metric[]>('http://localhost:3000/metrics', {
      params: {
        page: page,
        search: search,
        country: country,
      },
    });
  }
}
