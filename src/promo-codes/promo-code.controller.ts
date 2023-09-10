import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PromoCodeCrudService } from './services/promo-code-crud.service';
import { PromoCodeCreateRequestDto, PromoCodeCreateResponseDto } from './dto/promo-code-create.dto';

@ApiTags('promo-code')
@Controller('promo-code')
export class PromoCodeController {
  constructor(private readonly promoCodeCrudService: PromoCodeCrudService) {}

  @Post()
  @ApiOperation({ description: 'create promo code' })
  @ApiOkResponse({ type: PromoCodeCreateResponseDto })
  @ApiBody({ type: PromoCodeCreateRequestDto })
  async post(@Body() dto: PromoCodeCreateRequestDto) {
    return await this.promoCodeCrudService.create(dto);
  }
}
