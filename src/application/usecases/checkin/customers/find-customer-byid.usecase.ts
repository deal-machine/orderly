import { NotFoundException } from 'src/application/errors';
import { ICustomer } from 'src/domain/checkin/customers/entities/customer.entity';
import { ICustomerRepository } from 'src/domain/checkin/customers/repositories/customer.repository';
import { IFindCustomerByIdUseCase } from 'src/domain/checkin/customers/usecases/find-customer-byid.usecase';

export class FindCustomerByIdUseCase implements IFindCustomerByIdUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(id: string): Promise<ICustomer> {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) throw new NotFoundException('customer not found');
    return customer;
  }
}
