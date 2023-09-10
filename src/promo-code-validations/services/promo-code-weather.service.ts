import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Axios from 'axios';
import * as jp from 'jsonpath';
import { IWeather } from '../interfaces/weather.interface';

@Injectable()
export class PromoCodeWeatherService {
  async getWeather(cityName: string): Promise<IWeather> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API}`;
    try {
      const resp = await Axios.post(url);
      return { meteo: jp.query(resp.data, '$.weather[0].main').shift().toLowerCase(), temp: jp.query(resp.data, '$.main.temp').shift() };
    } catch (e) {
      throw new HttpException(`Weather request error: ` + e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
