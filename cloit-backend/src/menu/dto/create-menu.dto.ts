import { PickType } from '@nestjs/mapped-types';
import { Menu } from '../entities/menu.entity';

export class CreateMenuDto extends PickType(Menu, ['name', 'parentId']) {}
