import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PromoCodeValidationService } from './services/promo-code-validation.service';

@ApiTags('promo-validation')
@Controller('promo-validation')
export class PromoCodeController {
  constructor(private readonly promoCodeValidationService: PromoCodeValidationService) {}

  @Post()
  @ApiOperation({ description: 'Upload file CSV' })
  //@ApiOkResponse({ type: GetRandomDataResultDto })
  //@ApiBody()
  async post(@Body() dto: any) {
    return await this.promoCodeValidationService.validatePromoCode(dto);
  }
}
