import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { appProviders } from './app.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, ...appProviders],
})
export class AppModule {}
