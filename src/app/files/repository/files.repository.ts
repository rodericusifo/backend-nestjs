import { FileDTO } from '@app/files/dto/file.dto';
import { File } from '@app/files/entity/file.entity';
import { FilesMapper } from '@app/files/mapper/files.mapper';
import { IFilesRepository } from '@app/files/repository/interface/files-repository';
import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(File)
export class FilesRepository
  extends Repository<File>
  implements IFilesRepository
{
  async saveFile(fileDTO: Partial<FileDTO>) {
    const file = FilesMapper.DTOToEntity(fileDTO);
    const savedFIle = await this.save(file);
    return FilesMapper.EntityToDTO(savedFIle);
  }

  async findFile(fileDTO: Partial<FileDTO>): Promise<FileDTO> {
    const file = FilesMapper.DTOToEntity(fileDTO);
    const foundFile = await this.findOne({
      id: file.id,
    });
    if (!foundFile) {
      throw new NotFoundException(`File with ID: ${file.id} was not found`);
    }
    return FilesMapper.EntityToDTO(foundFile);
  }

  async findFileWithUserId(fileDTO: Partial<FileDTO>): Promise<FileDTO> {
    const file = FilesMapper.DTOToEntity(fileDTO);
    const foundFile = await this.findOne({
      id: file.id,
      userId: file.userId,
    });
    if (!foundFile) {
      throw new NotFoundException(`File with ID: ${file.id} was not found`);
    }
    return FilesMapper.EntityToDTO(foundFile);
  }
}
