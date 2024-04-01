import { Request, Response, Router } from 'express';
import AddressRepository from '../repositories/AddressRepository';

class AddressController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.getAllAddress);
    this.router.post('/', this.createAddress);
    this.router.delete('/:id', this.deleteAddress);
  }

  private async getAllAddress(request: Request, response: Response) {
    const address = await AddressRepository.getAddress();

    response.status(200).json(address);
  }

  private async createAddress(request: Request, response: Response) {
    const addressCreated = await AddressRepository.newAddress(request.body);

    response.status(201).json(addressCreated);
  }

  private async deleteAddress(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const addressDeleted = await AddressRepository.removeAddress(id);

    response.status(200).json({ message: addressDeleted });
  }
}

const addressRouter = new AddressController().router;

export default addressRouter;
