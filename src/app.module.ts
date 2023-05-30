import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { SpecificationModule } from './modules/specification/specification.module';
import { ParameterModule } from './modules/parameter/parameter.module';
import { OptionModule } from './modules/option/option.module';
import { PrismaService } from './modules/database/prisma.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { NewsModule } from './modules/news/news.module';
import { SettingsModule } from './modules/settings/settings.module';
import { СharacteristicsModule } from './modules/сharacteristics/сharacteristics.module';
import { TypeHouseModule } from './modules/typeHouse/typeHouse.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AreaHouseModule } from './modules/areaHouse/areaHouse.module';
import { AnketaModule } from './modules/anketa/anketa.module';

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    SpecificationModule,
    ParameterModule,
    OptionModule,
    AuthModule,
    UsersModule,
    NewsModule,
    SettingsModule,
    СharacteristicsModule,
    TypeHouseModule,
    ReviewsModule,
    AreaHouseModule,
    AnketaModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
