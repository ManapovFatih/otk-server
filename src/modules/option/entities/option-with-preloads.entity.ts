import { OptionEntity } from './option.entity';
import { ParameterEntity } from './../../parameter/entities/parameter.entity';
import { ApiProperty } from '@nestjs/swagger';

export class OptionWithPreloadsEntity extends OptionEntity {
  @ApiProperty({
    type: ParameterEntity,
  })
  parameter: ParameterEntity;
}
