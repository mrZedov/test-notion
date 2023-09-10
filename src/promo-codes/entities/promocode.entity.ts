import { Entity, JsonType, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PromoCode {
  @ApiProperty({ description: 'ID' })
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  name: string;

  @Property({ nullable: false, type: JsonType })
  advantage: any;

  @Property({ nullable: false, type: JsonType })
  restrictions: any;
}
