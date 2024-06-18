import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateLinkDto, GetLinkDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-link')
  async createLink(
    @Req() req,
    @Body() data: CreateLinkDto,
  ): Promise<{ link: string }> {
    try {
      if (!data?.value) {
        throw new HttpException(
          'Пожалуйста, передайте значение ссылки',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.appService.createLink(data.value);
      const link = req.protocol + '://' + req.get('host') + '/' + result.linkId;

      return { link };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':linkValue')
  getLinkValue(@Param() params: GetLinkDto): Promise<{ linkValue: string }> {
    try {
      return this.appService.getLinkValue(params.linkValue);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
