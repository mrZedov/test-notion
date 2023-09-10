import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PromoCodeValidationService } from './services/promo-code-validation.service';
import { PromoCodeValidateRequestDto } from './dto/promo-code-validation-request.dto';
import { PromoCodeValidateResponseDto } from './dto/promo-code-validation-response.dto';

@ApiTags('promo-code-validation')
@Controller('promo-code-validation')
export class PromoCodeController {
  constructor(private readonly promoCodeValidationService: PromoCodeValidationService) {}

  @Post()
  @ApiOperation({ description: 'Promo code validation' })
  @ApiOkResponse({ type: PromoCodeValidateResponseDto })
  @ApiBody({ type: PromoCodeValidateRequestDto })
  async post(@Body() dto: PromoCodeValidateRequestDto) {
    return await this.promoCodeValidationService.validatePromoCode(dto);
  }
}
