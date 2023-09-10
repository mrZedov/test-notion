import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PromoCodeModule } from './promo-codes/promo-code.module';
import { PromoCodeValidationModule } from './promo-code-validations/promo-code-validation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'services/.env' }),
    MikroOrmModule.forRoot(),
    PromoCodeModule,
    PromoCodeValidationModule,
  ],
})
export class AppModule {}
