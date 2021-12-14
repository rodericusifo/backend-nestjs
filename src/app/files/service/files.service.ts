import { CreateFileDTO } from '@app/files/dto/create-file.dto';
import { FileDTO } from '@app/files/dto/file.dto';
import { FilesRepository } from '@app/files/repository/files.repository';
import { IFilesService } from '@app/files/service/interface/files-service.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@shared/enum/role.enum';
import { plainToClass } from 'class-transformer';
import { ReadFilePaymentProofDTO } from '../dto/read-file-payment-proof.dto';

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

  async readFilePaymentProof(
    payload: ReadFilePaymentProofDTO,
  ): Promise<FileDTO> {
    const fileDTO = plainToClass(FileDTO, {
      id: payload.id,
      userId: payload.userId,
    } as Partial<FileDTO>);
    let foundFileDTO: FileDTO;
    if (payload.userRoles.includes(Role.Admin)) {
      foundFileDTO = await this.filesRepository.findFile(fileDTO);
    } else {
      foundFileDTO = await this.filesRepository.findFileWithUserId(fileDTO);
    }
    foundFileDTO.validatePathFile('payment-proof');
    return foundFileDTO;
  }
}
