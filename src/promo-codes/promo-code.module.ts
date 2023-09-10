import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PromoCode } from './entities/promocode.entity';
import { PromoCodeFindService } from './services/promo-code-find.service';

@Module({
  imports: [MikroOrmModule.forFeature([PromoCode])],
  providers: [PromoCodeFindService],
  controllers: [],
  exports: [PromoCodeFindService],
})
export class PromoCodeModule {}
