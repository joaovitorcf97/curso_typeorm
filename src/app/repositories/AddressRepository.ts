import { ValidationErrorItem } from 'joi';
import { AppDataSource } from '../../database/dataSource';
import Address from '../entities/Address';
import { IAddressOutput } from '../interfaces/IAddres';
import ErrorExtension from '../utils/ErrorExtension';
import addressSchemaValidation from '../utils/validations/addressSchemaValidation';

class AddressRepository {
  private static addressRepository = AppDataSource.getRepository(Address);

  static async getAddress(): Promise<IAddressOutput[]> {
    return await this.addressRepository.find({
      relations: {
        users: true,
      },
    });
  }

  static async newAddress(address: Address): Promise<IAddressOutput> {
    const { error } = addressSchemaValidation.validate(address, {
      abortEarly: false,
    });

    if (error) {
      const validationsErrors = error.details.map(
        (error: ValidationErrorItem) => error.message,
      );

      throw new ErrorExtension(400, 'Error de validação', validationsErrors);
    }

    const createdAddress = this.addressRepository.save(address);

    return createdAddress;
  }

  static async removeAddress(id: number): Promise<string> {
    await this.addressRepository.delete(id);

    return 'Address removed successfully';
  }
}

export default AddressRepository;
