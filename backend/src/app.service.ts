import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';

export class AppService {
  constructor(protected readonly appRepository: AppRepository) {}

  findAll() {
    return this.appRepository.findAll();
  }
}
