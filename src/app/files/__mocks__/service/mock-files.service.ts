/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateFileDTO } from '@app/files/dto/create-file.dto';
import { FileDTO } from '@app/files/dto/file.dto';
import { ReadFilePaymentProofDTO } from '@app/files/dto/read-file-payment-proof.dto';
import { IFilesService } from '@app/files/service/interface/files-service.interface';

export class MockedFilesService implements IFilesService {
  createFile(_payload: CreateFileDTO): Promise<FileDTO> {
    throw new Error('Method not implemented.');
  }
  readFilePaymentProof(_payload: ReadFilePaymentProofDTO): Promise<FileDTO> {
    throw new Error('Method not implemented.');
  }
}
