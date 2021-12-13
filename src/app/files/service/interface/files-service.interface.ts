import { CreateFileDTO } from '@app/files/dto/create-file.dto';
import { FileDTO } from '@app/files/dto/file.dto';

export interface IFilesService {
  createFile(payload: CreateFileDTO): Promise<FileDTO>;
}
