import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PromoCodeValidateResponseDto {
  @ApiProperty({ description: 'name of promo code' })
  promocode_name: string;

  @ApiProperty({ type: JSON, description: 'response status' })
  status: string;

  @ApiPropertyOptional({ type: JSON, description: 'advantage of promo code' })
  advantage?: any;

  @ApiPropertyOptional({ type: JSON, description: 'reasons for refusing a discount' })
  reasons?: any;
}
