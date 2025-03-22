import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Available globally
})
export class DateService {
  // Get current date normalized to midnight in user's local timezone
  getLocalDate(): Date {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  // Parse a date string (e.g., "2025-03-22") to a Date object at midnight local time
  parseLocalDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // Month is 0-based
    date.setHours(0, 0, 0, 0);
    return date;
  }

  // Format Date to local date string (e.g., "2025-03-22")
  formatLocalDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Normalize an existing Date to midnight local time
  normalizeDate(date: Date): Date {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }

  // Compare two dates (returns true if date1 >= date2)
  isDateGreaterOrEqual(date1: Date, date2: Date): boolean {
    const d1 = this.normalizeDate(date1);
    const d2 = this.normalizeDate(date2);
    return d1 >= d2;
  }

  // Add days to a date
  addDays(date: Date, days: number): Date {
    const result = this.normalizeDate(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}