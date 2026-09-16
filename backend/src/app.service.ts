import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  findAll() {
    return this.appRepository.findAll();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
