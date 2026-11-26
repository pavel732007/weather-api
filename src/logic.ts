import { request } from "./API/load.ts";
import { Modal } from "./modal.ts";

interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: {
    time: string;
    interval: string;
    temperature: string;
    windspeed: string;
    winddirection: string;
    is_day: string;
    weathercode: string;
  };
  current_weather: {
    time: string;
    interval: number;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: 0 | 1;
    weathercode: number;
  };
}

interface Coords {
  lat: number;
  lon: number;
}

const CITIES: Record<string, Coords> = {
  москва: { lat: 55.75, lon: 37.62 },
  лондон: { lat: 51.51, lon: -0.13 },
  дубай: { lat: 25.2, lon: 55.27 },
};

export class Logic {
  private formElement: HTMLFormElement | null;
  private inputElement: HTMLInputElement | null;
  private modal = new Modal("weather-modal");

  constructor() {
    this.formElement = document.querySelector("form");
    this.inputElement = document.querySelector("#city");
    document.addEventListener("DOMContentLoaded", () => {
      if (!this.formElement) return null;

      this.eventForm(this.formElement, async (coords) => {
        try {
          await this.loadWeather(coords);
        } catch (error) {
          console.log(error);
        }
      });
    });
  }

  private eventForm(form: HTMLFormElement, onSubmit: (city: Coords) => void): void {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!this.inputElement) return;

      const city = this.inputElement.value.trim().toLowerCase();
      if (!city) return;
      const coords = CITIES[city];
      if (!coords) return;

      onSubmit(coords);
    });
  }

  private async loadWeather(coords: Coords): Promise<void> {
    const data = await request<WeatherResponse>(`
            https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true
        `);
    this.renderModalWindow(data);
  }

  private renderModalWindow(data: WeatherResponse): void {
    const { temperature } = data.current_weather;
    this.modal.open("Погода", `${temperature}`);
  }
}
