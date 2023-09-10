import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import * as jp from 'jsonpath';

@Injectable()
export class PromoCodeWeatherService {
  async getWeather(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API}`;
    try {
      const resp = await Axios.post(url);
      return { meteo: jp.query(resp.data, '$.weather[0].main').shift().toLowerCase(), temp: jp.query(resp.data, '$.main.temp').shift() };
    } catch (e) {
      return e.response.status;
    }
  }
}
