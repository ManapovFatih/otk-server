import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClassTransformOptions, plainToClass } from '@nestjs/class-transformer';
import { validate, ValidatorOptions } from '@nestjs/class-validator';
import { ValidationExeption } from '../exeptions/validaiton.exeption';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    let transformerOptions: ClassTransformOptions = {};
    let validatorOptions: ValidatorOptions = {};
    console.log('metadata: ', metadata);
    if (metadata.type != 'custom') {
      // transformerOptions = { enableImplicitConversion: true };
      validatorOptions = { forbidNonWhitelisted: true, whitelist: true };
    }
    if (typeof value != 'object') {
      return value;
    }
    console.log('value: ', value);
    const obj = plainToClass(metadata.metatype, value, transformerOptions);
    console.log('after convert', obj);

    if (!obj) {
      return obj;
    }
    const errors = await validate(obj, validatorOptions);
    if (errors.length) {
      const messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
      });
      throw new ValidationExeption(messages);
    }

    return obj;
  }
}
