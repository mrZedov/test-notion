import { ApiProperty } from '@nestjs/swagger';

export class PromoCodeValidateRequestDto {
  @ApiProperty({ description: 'name of promo code' })
  promocode_name: string;

  @ApiProperty({ type: JSON, description: 'user data set' })
  arguments: any;
}
