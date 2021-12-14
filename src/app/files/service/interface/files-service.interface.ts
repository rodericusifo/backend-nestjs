import { CreateFileDTO } from '@app/files/dto/create-file.dto';
import { FileDTO } from '@app/files/dto/file.dto';
import { ReadFilePaymentProofDTO } from '@app/files/dto/read-file-payment-proof.dto';

export interface IFilesService {
  createFile(payload: CreateFileDTO): Promise<FileDTO>;
  readFilePaymentProof(payload: ReadFilePaymentProofDTO): Promise<FileDTO>;
}
