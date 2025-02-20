import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from '../prisma.service';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    if (createMenuDto.parentId) {
      const menu = await this.prisma.menu.findUnique({
        where: { id: createMenuDto.parentId },
      });
      if (!menu) throw new NotFoundException('Parent Menu not found');
    }

    return this.prisma.menu.create({
      data: {
        name: createMenuDto.name,
        parentId: createMenuDto.parentId,
      },
    });
  }

  async findOne(id: string): Promise<Menu> {
    const menu = await this.prisma.menu.findUnique({ where: { id } });
    if (!menu) throw new NotFoundException('Menu not found');
    return menu;
  }

  async findRoots(): Promise<Menu[]> {
    return this.prisma.menu.findMany({
      where: { parentId: null },
      select: { id: true, name: true },
    });
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.prisma.menu.findUnique({ where: { id } });
    if (!menu) throw new NotFoundException('Menu not found');
    return this.prisma.menu.update({
      where: { id },
      data: {
        name: updateMenuDto.name,
        parentId: updateMenuDto.parentId || menu.parentId,
      },
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    const menu = await this.prisma.menu.findUnique({ where: { id } });
    if (!menu) throw new NotFoundException('Menu not found');

    await this.prisma.menu.delete({ where: { id } });
    return { message: 'Menu deleted successfully' };
  }

  async findChildren(parentId: string): Promise<Menu | null> {
    return this.prisma.menu.findUnique({
      where: { id: parentId },
      include: {
        children: {
          include: {
            children: true, // Recursively fetch child menus
          },
        },
      },
    });
  }
}
