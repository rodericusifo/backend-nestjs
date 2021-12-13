import { CreateFileDTO } from '@app/files/dto/create-file.dto';
import { FileDTO } from '@app/files/dto/file.dto';
import { FilesRepository } from '@app/files/repository/files.repository';
import { IFilesService } from '@app/files/service/interface/files-service.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class FilesService implements IFilesService {
  constructor(
    @InjectRepository(FilesRepository)
    private readonly filesRepository: FilesRepository,
  ) {}

  async createFile(payload: CreateFileDTO): Promise<FileDTO> {
    const fileDTO = plainToClass(FileDTO, payload);
    const savedFileDTO = await this.filesRepository.saveFile(fileDTO);
    return savedFileDTO;
  }
}
