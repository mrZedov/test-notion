import { EntityData, MikroORM } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PromoCodeCreateRequestDto } from '../dto/promo-code-create.dto';
import { PromoCode } from '../entities/promocode.entity';

@Injectable()
export class PromoCodeCrudService {
  constructor(@InjectRepository(PromoCode) private readonly promoCodeRepository: EntityRepository<PromoCode>, private readonly orm: MikroORM) {}

  async create(data: PromoCodeCreateRequestDto): Promise<EntityData<PromoCode>> {
    const promoCode = await this.promoCodeRepository.findOne({ name: data.name });
    if (promoCode) {
      throw new HttpException(`Promo code's name - already in use`, HttpStatus.BAD_REQUEST);
    }
    const em = this.orm.em.fork();
    const promoCodeNew = em.create(PromoCode, data);
    await em.persist(promoCodeNew).flush();

    return promoCodeNew;
  }
}
