import { Module } from '@nestjs/common';
import { PromoCodeModule } from 'src/promo-codes/promo-code.module';
import { PromoCodeController } from './promo-code-validation.controller';
import { PromoCodeValidationService } from './services/promo-code-validation.service';
import { PromoCodeWeatherService } from './services/promo-code-weather.service';

@Module({
  imports: [PromoCodeModule],
  providers: [PromoCodeValidationService, PromoCodeWeatherService],
  controllers: [PromoCodeController],
})
export class PromoCodeValidationModule {}
