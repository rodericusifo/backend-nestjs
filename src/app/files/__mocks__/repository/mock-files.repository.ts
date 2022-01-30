/* eslint-disable @typescript-eslint/no-unused-vars */
import { FileDTO } from '@app/files/dto/file.dto';
import { IFilesRepository } from '@app/files/database/repositories/interfaces/files-repository';

export class MockedFilesRepository implements IFilesRepository {
  saveFile(_fileDTO: FileDTO): Promise<FileDTO> {
    throw new Error('Method not implemented.');
  }
  findFile(_fileDTO: FileDTO): Promise<FileDTO> {
    throw new Error('Method not implemented.');
  }
  findFileWithUserId(_fileDTO: FileDTO): Promise<FileDTO> {
    throw new Error('Method not implemented.');
  }
}
