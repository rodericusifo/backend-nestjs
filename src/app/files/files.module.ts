import { FilesController } from '@app/files/controller/files.controller';
import { FilesRepository } from '@app/files/repository/files.repository';
import { FilesService } from '@app/files/service/files.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FilesRepository])],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
