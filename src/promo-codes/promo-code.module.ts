import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PromoCode } from './entities/promocode.entity';
import { PromoCodeController } from './promo-code.controller';
import { PromoCodeCrudService } from './services/promo-code-crud.service';
import { PromoCodeFindService } from './services/promo-code-find.service';

@Module({
  imports: [MikroOrmModule.forFeature([PromoCode])],
  providers: [PromoCodeFindService, PromoCodeCrudService],
  controllers: [PromoCodeController],
  exports: [PromoCodeFindService],
})
export class PromoCodeModule {}
