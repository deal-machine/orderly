import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { IIdentifierGenerator } from 'src/application/ports/tokens/id-generator';
import { IProductRepository } from 'src/domain/checkin/products/repositories/product.repository';

@Injectable()
export class CategorySeeder implements OnModuleInit {
  constructor(
    @Inject('ProductRepository')
    private productRepository: IProductRepository,
    @Inject('IdGenerator')
    private idGenerator: IIdentifierGenerator,
  ) {}

  async onModuleInit() {
    await this.initializeApp();
  }

  private async initializeApp() {
    console.log('Seeding categories...');
    try {
      const categoriesToCreate = [
        {
          id: this.idGenerator.generate(),
          name: 'Lanche',
          description: 'Lanches deliciosos',
        },
        {
          id: this.idGenerator.generate(),
          name: 'Acompanhamento',
          description: 'Diversos acompanhamentos',
        },
        {
          id: this.idGenerator.generate(),
          name: 'Bebida',
          description: 'Sucos refrescantes',
        },
        {
          id: this.idGenerator.generate(),
          name: 'Sobremesa',
          description: 'Delicias saudáveis',
        },
      ];
      await this.productRepository.createCategories(categoriesToCreate);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      console.log('Seed has been complete.');
    }
  }
}
