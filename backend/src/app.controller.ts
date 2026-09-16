import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './common/guards/auth.guard';
import { Public } from './common/decorators/public.decorator';
import { Roles } from './common/decorators/role.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @Public()
  @Roles('admin')
  @Get()
  getHello(): string {
    console.log(1);
    console.log(2);
    return this.appService.getHello();
  }

  @Get()
  findAll() {
    return this.appService.findAll();
  }
}
