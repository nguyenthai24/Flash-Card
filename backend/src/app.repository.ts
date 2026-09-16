import { Injectable } from '@nestjs/common';

@Injectable()
export class AppRepository {
  findAll() {
    return ['Thai'];
  }
}
