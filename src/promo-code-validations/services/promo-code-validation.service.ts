import { Injectable } from '@nestjs/common';
import * as jp from 'jsonpath';
import * as _ from 'lodash';
import { PromoCodeFindService } from 'src/promo-codes/services/promo-code-find.service';
import { PromoCodeValidateResponseDto } from '../dto/promo-code-validation-response.dto';
import { PromoCodeWeatherService } from './promo-code-weather.service';
import { PromoCodeValidateRequestDto } from '../dto/promo-code-validation-request.dto';
import { IConditionValid } from '../interfaces/condition-valid.interface';

@Injectable()
export class PromoCodeValidationService {
  constructor(private readonly promoCodeFindService: PromoCodeFindService, private readonly promoCodeWeatherService: PromoCodeWeatherService) {}

  async validatePromoCode(data: PromoCodeValidateRequestDto): Promise<PromoCodeValidateResponseDto> {
    const promoCode = await this.promoCodeFindService.find(data.promocode_name);

    const arg = {
      ...data.arguments,
      date: new Date(),
      //weather: { meteo: 'clear', temp: 30 } // use it for test
      weather: await this.promoCodeWeatherService.getWeather(data.arguments.meteo.town),
    };
    for (const restriction of promoCode.restrictions) {
      const res = this.isConditionValid(arg, restriction);
      if (!res.valid)
        return {
          promocode_name: promoCode.name,
          status: 'denied',
          reasons: res.reason || res.restrictions,
        };
    }
    return {
      promocode_name: promoCode.name,
      status: 'accepted',
      advantage: promoCode.advantage,
    };
  }

  isConditionValid(data, restriction): IConditionValid {
    const key = _.keys(restriction)[0];

    if (key === '@or') {
      const restrictions = restriction[key];
      for (const restriction of restrictions) {
        const res = this.isConditionValid(data, restriction);
        if (res.valid) return res;
      }
      return { valid: false, restrictions: { [key]: restrictions } };
    }

    if (key === '@and') {
      const restrictions = restriction[key];
      for (const restriction of restrictions) {
        const res = this.isConditionValid(data, restriction);
        if (!res.valid) return res;
      }
      return { valid: true };
    }

    if (['@age', '@date', '@meteo'].includes(key)) {
      const condition = restriction[key];
      const keyData = key.substring(1);
      //if (['meteo', 'temp'].includes(keyData)) keyData = 'weather.' + keyData;
      if (keyData === 'meteo') {
        let valid = this.calculateExp(jp.query(data, 'weather.meteo').shift(), condition, keyData + '.meteo');
        if (!valid.isValid) return { valid: valid.isValid, reason: valid.reason };
        valid = this.calculateExp(jp.query(data, 'weather.temp').shift(), condition.temp, keyData + '.temp');
        if (!valid.isValid) return { valid: valid.isValid, reason: valid.reason };
        return { valid: true };
      } else {
        const valid = this.calculateExp(jp.query(data, keyData).shift(), condition, keyData);
        return { valid: valid.isValid, reason: valid.reason };
      }
    }

    throw new Error('Unknown keys in promocode');
  }

  calculateExp(value: Date | string | number, condition, expression) {
    if (condition['after'] && value < new Date(condition['after']))
      return { isValid: false, reason: expression + ' less then ' + condition['after'] };
    if (condition['before'] && value > new Date(condition['before']))
      return { isValid: false, reason: expression + ' greater than ' + condition['before'] };
    if (condition['lt'] && value > condition['lt']) return { isValid: false, reason: expression + ' greater than ' + condition['lt'] };
    if (condition['gt'] && value < condition['gt']) return { isValid: false, reason: expression + ' greater than ' + condition['gt'] };
    if (condition['eq'] && value !== condition['eq']) return { isValid: false, reason: expression + ' not equal ' + condition['eq'] };
    if (condition['is'] && value !== condition['is']) return { isValid: false, reason: expression + ' is not ' + condition['is'] };
    return { isValid: true };
  }
}
