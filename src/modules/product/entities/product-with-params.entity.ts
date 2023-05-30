import { SpecificationEntity } from './../../specification/entities/specification.entity';
import { ParameterEntity } from './../../parameter/entities/parameter.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from './product.entity';

export class ProductWitParamsEntity extends ProductEntity {
  @ApiProperty({
    type: [ParameterEntity],
  })
  parameters: ParameterEntity[];

  @ApiProperty({
    type: [SpecificationEntity],
  })
  specifications: SpecificationEntity[];
}
