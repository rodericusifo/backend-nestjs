import { FileDTO } from '@app/files/dto/file.dto';

export interface IFilesRepository {
  saveFile(fileDTO: FileDTO): Promise<FileDTO>;
  findFile(fileDTO: FileDTO): Promise<FileDTO>;
  findFileWithUserId(fileDTO: FileDTO): Promise<FileDTO>;
}
