import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { generateRandomString } from './utils/generate-random-string';
import { LINKS_REPOSITORY } from './constants';
import { Link } from './entities/link.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject(LINKS_REPOSITORY)
    private linksRepository: typeof Link,
  ) {}

  async createLink(value: string): Promise<{ linkId: string }> {
    try {
      const newLink = {
        linkId: generateRandomString(7),
        value,
        isActive: true,
      };

      const linkAlreadyExists = await this.linksRepository.count({
        where: { linkId: newLink.linkId, isActive: newLink.isActive },
      });

      if (linkAlreadyExists) {
        newLink.linkId = generateRandomString(7);
      }

      const createdLink = await this.linksRepository.create({
        linkId: newLink.linkId,
        value,
        isActive: newLink.isActive,
      });

      if (!createdLink?.linkId) {
        throw new HttpException(
          'Не удалось создать ссылку',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return { linkId: createdLink.linkId };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getLinkValue(linkId: string): Promise<{ linkValue: string }> {
    try {
      const linkItem = await this.linksRepository.findOne({
        where: { linkId, isActive: true },
      });

      if (!linkItem) {
        throw new HttpException(
          'Ссылка уже использована или не существует',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.linksRepository.update(
        { isActive: false },
        { where: { linkId } },
      );

      return { linkValue: linkItem.value };
    } catch (e) {
      throw new HttpException(
        e.message,
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
