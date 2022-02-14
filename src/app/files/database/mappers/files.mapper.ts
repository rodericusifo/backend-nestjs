import { File } from '@app/files/database/entities/file.entity';
import { FileDTO } from '@app/files/dto/file.dto';
import { plainToInstance } from 'class-transformer';

export class FilesMapper {
  static DTOToEntity(fileDTO: Partial<FileDTO>): File {
    return plainToInstance(File, fileDTO);
  }

  static EntityToDTO(file: Partial<File>): FileDTO {
    return plainToInstance(FileDTO, file);
  }
}
