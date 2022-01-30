import { FilesController } from '@app/files/controllers/files.controller';
import { FilesRepository } from '@app/files/database/repositories/files.repository';
import { FilesService } from '@app/files/services/files.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FilesRepository])],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
