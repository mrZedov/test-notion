import { ApiProperty } from '@nestjs/swagger';

export class PromoCodeCreateRequestDto {
  @ApiProperty({ description: 'name of promo code' })
  name: string;

  @ApiProperty({ type: JSON, description: 'advantage of promo code' })
  advantage: any;

  @ApiProperty({ type: JSON, description: 'restrictions of promo code' })
  restrictions: any;
}

export class PromoCodeCreateResponseDto extends PromoCodeCreateRequestDto {
  @ApiProperty({ description: 'id of promo code' })
  id: number;
}
