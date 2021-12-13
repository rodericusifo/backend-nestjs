import { FileDTO } from '@app/files/dto/file.dto';
import { File } from '@app/files/entity/file.entity';
import { plainToClass } from 'class-transformer';

export class FilesMapper {
  static DTOToEntity(fileDTO: Partial<FileDTO>): File {
    return plainToClass(File, fileDTO);
  }

  static EntityToDTO(file: Partial<File>): FileDTO {
    return plainToClass(FileDTO, file);
  }
}
