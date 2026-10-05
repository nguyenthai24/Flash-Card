import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { get } from 'http';

export class AppService {
  constructor(protected readonly appRepository: AppRepository) {}

  findAll() {
    return this.appRepository.findAll();
  }
  getHello(): string {
    return 'Hello World!';
  }
}
