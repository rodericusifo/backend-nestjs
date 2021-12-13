import { FileDTO } from '@app/files/dto/file.dto';

export interface IFilesRepository {
  saveFile(fileDTO: Partial<FileDTO>): Promise<FileDTO>;
  findFile(fileDTO: Partial<FileDTO>): Promise<FileDTO>;
  findFileWithUserId(fileDTO: Partial<FileDTO>): Promise<FileDTO>;
}
