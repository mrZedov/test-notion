import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { PromoCode } from '../entities/promocode.entity';

@Injectable()
export class PromoCodeFindService {
  constructor(@InjectRepository(PromoCode) private readonly promoCodeRepository: EntityRepository<PromoCode>) {}

  async find(promoCode: string): Promise<any> {
    //+++
    return await this.promoCodeRepository.findOne({ name: promoCode });
  }
}
