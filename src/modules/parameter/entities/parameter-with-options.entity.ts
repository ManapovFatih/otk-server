import { ParameterEntity } from './parameter.entity';
import { OptionEntity } from './../../option/entities/option.entity';
import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParamterWithOptionsEntity extends ParameterEntity {
  @ApiProperty({
    type: [OptionEntity],
  })
  options: OptionEntity[];
}
