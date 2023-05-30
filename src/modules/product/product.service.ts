import { CategoryService } from './../category/category.service';
import { SpecificationService } from './../specification/specification.service';
import { ParameterService } from './../parameter/parameter.service';
import { GetProductsByIdsDto } from './dto/products-get-by-ids.dto';
import { PaginateProductsDto } from './dto/paginate-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ImageService } from '../file/image.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductService {
  //Произошла инкостыляция
  constructor(
    private readonly prismaService: PrismaService,
    private readonly imageService: ImageService,
    private readonly parameterService: ParameterService,
    private readonly specificationService: SpecificationService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto, images: Express.Multer.File[]) {
    const { setImageToNull, specificationIds, optionIds, affinityIds, ...createDto } = createProductDto;
    const filenames = await Promise.all(images.map(image => this.imageService.updateImage(image, 'products')));
    const specifications = specificationIds
      ? specificationIds.map((item) => {
          return { specificationId: +item };
        })
      : [];
    const options = optionIds
      ? optionIds.map((item) => {
          return { optionId: +item };
        })
      : [];

    const affinityObjects = affinityIds.map((item) => ({
      targetProductId: +item,
    }));

    return await this.prismaService.product.create({
      data: {
        ...createDto,
        images: filenames,
        productOnSpecification: {
          createMany: {
            data: specifications,
          },
        },
        productOnOption: {
          createMany: {
            data: options,
          },
        },
        affinities: {
          createMany: {
            data: affinityObjects,
          },
        },
      },
    });
  }

  async search(findProductDto: FindProductDto) {
    return await this.prismaService.product.findMany({
      where: {
        name: {
          search: findProductDto.query,
        },
      },
    });
  }

  async findByIds(ids: number[]) {
    return await this.prismaService.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findById(id: number) {
    return await this.prismaService.product.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async findByIdWithPreloads(id: number) {
    const product = await this.prismaService.product.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        affinities: {
          where: {
            productId: id,
          },
          include: {
            targetProduct: true,
          },
        },
      },
    });

    const { affinities, ...rest } = product;
    const affinityObjects = affinities.map((item) => item.targetProduct);
		
    // Это надо бы убрать (одним raw например), сделано только для удобства на фронте
    const parameters = await this.parameterService.findByProductId(id);
    const specifications = await this.specificationService.findByProductId(id);
    const category = await this.categoryService.findById(specifications[0].categoryId);
    return {
      ...rest,
      parameters,
      specifications,
      category,
      affinities: affinityObjects,
    };
  }

  async findAll() {
    return await this.prismaService.product.findMany();
  }

  async paginate(paginateProductsDto: PaginateProductsDto) {
    const key = paginateProductsDto.orderBy;
    const direction = paginateProductsDto.direction;
    // need a typings here
    const orderObject = {};
    const whereObject = {};

    if (paginateProductsDto.options) {
      const options = JSON.parse(paginateProductsDto.options);
      whereObject['productOnOption'] = { some: { optionId: { in: options } } };
    }
    if (paginateProductsDto.specifications) {
      const specifications = JSON.parse(paginateProductsDto.specifications);
      whereObject['productOnSpecification'] = { some: { specificationId: { in: specifications } } };
    }

    if (paginateProductsDto.categoryId) {
      whereObject['categoryId'] = paginateProductsDto.categoryId;
  }

    const meta = await this.prismaService.product.aggregate({
      _min: {
        price: true,
      },
      _max: {
        price: true,
      },
      where: whereObject,
    });

    if (paginateProductsDto.minPrice || paginateProductsDto.maxPrice) {
      whereObject['price'] = {
        gte: paginateProductsDto.minPrice || 0,
        lte: paginateProductsDto.maxPrice || {},
      };
    }

    const count = await this.prismaService.product.count({
      where: whereObject,
    });

    const currentPage = paginateProductsDto.page;
    const totalPages = Math.ceil(count / paginateProductsDto.limit);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const lastPage = totalPages;
    orderObject[key] = direction;

    const body = await this.prismaService.product.findMany({
      skip: (paginateProductsDto.page - 1) * paginateProductsDto.limit,
      take: paginateProductsDto.limit,
      orderBy: orderObject,
      where: whereObject,
      include: {
        affinities: {
          include: {
            targetProduct: true,
          },
        },
      },
    });
    //add
    return {
      meta: {
        total: count,
        minPrice: meta._min.price,
        maxPrice: meta._max.price,
        prevPage,
        currentPage,
        nextPage,
        lastPage,
        categoryId: paginateProductsDto.categoryId,
      },
      body,
    };
  }

  async delete(id: number) {
    return await this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto, images: Express.Multer.File[]) {
    const product = await this.findById(id);

    const { setImageToNull, specificationIds, optionIds, affinityIds, ...createDto } = updateProductDto;
    const filenames = await Promise.all(images.map(async (image, index) => {
      const filename = await this.imageService.updateImage(image, 'products', product.images[index], setImageToNull);
      return filename;
    }));
    const options = optionIds
      ? optionIds.map((item) => {
          return { optionId: +item };
        })
      : [];

    const specifications = specificationIds
      ? specificationIds.map((item) => {
          return { specificationId: +item };
        })
      : [];
    const affinityIntIds = affinityIds ? affinityIds.map((item) => +item) : [];
    const affinityObjects = affinityIds.map((item) => ({
      targetProductId: +item,
    }));
    return await this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        ...createDto,
        images: filenames,
        productOnOption: { deleteMany: {}, createMany: { data: options } },
        productOnSpecification: { deleteMany: {}, createMany: { data: specifications } },
        affinities: { deleteMany: {}, createMany: { data: affinityObjects } },
      },
    });
  }
}
