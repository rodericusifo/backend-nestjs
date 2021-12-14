import { FilesController } from '@app/files/controller/files.controller';
import { FilesRepository } from '@app/files/repository/files.repository';
import { FilesService } from '@app/files/service/files.service';
import { multerConfiguration } from '@config/multer.configuration';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilesRepository]),
    MulterModule.register(multerConfiguration),
  ],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
