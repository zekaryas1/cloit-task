import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, this is a demo app powered by Nest.js and Prisma ORM!';
  }
}
