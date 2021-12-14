import { CreateFileDTO } from '@app/files/dto/create-file.dto';
import { FileDTO } from '@app/files/dto/file.dto';
import { ReadFilePaymentProofDTO } from '@app/files/dto/read-file-payment-proof.dto';
import { FilesRepository } from '@app/files/repository/files.repository';
import { FilesService } from '@app/files/service/files.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '@shared/enum/role.enum';
import { plainToClass } from 'class-transformer';
import { randomUUID } from 'crypto';

describe('FilesService', () => {
  let filesService: FilesService;
  let filesRepository: FilesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesService,
        {
          provide: getRepositoryToken(FilesRepository),
          useClass: FilesRepository,
        },
      ],
    }).compile();

    filesService = module.get<FilesService>(FilesService);
    filesRepository = module.get<FilesRepository>(
      getRepositoryToken(FilesRepository),
    );
  });

  it('should be defined', () => {
    expect(filesService).toBeDefined();
    expect(filesRepository).toBeDefined();
  });

  describe('createFile()', () => {
    it('should successfully create a file', async () => {
      const argument: CreateFileDTO = {
        mimeType: 'pdf',
        originalName: 'a.pdf',
        path: 'pdf/a.pdf',
        userId: randomUUID(),
      };
      const expectedResult = plainToClass(FileDTO, {
        id: randomUUID(),
        mimeType: 'pdf',
        originalName: 'a.pdf',
        path: 'pdf/a.pdf',
        userId: argument.userId,
      });
      const expectedError = undefined;
      jest.spyOn(filesRepository, 'saveFile').mockImplementation(() =>
        Promise.resolve(
          plainToClass(FileDTO, {
            id: expectedResult.id,
            mimeType: 'pdf',
            originalName: 'a.pdf',
            path: 'pdf/a.pdf',
            userId: argument.userId,
          }),
        ),
      );
      try {
        const data = await filesService.createFile(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed create a file', async () => {
      const argument: CreateFileDTO = {
        mimeType: 'pdf',
        originalName: 'a.pdf',
        path: 'pdf/a.pdf',
        userId: randomUUID(),
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Create File';
      jest
        .spyOn(filesRepository, 'saveFile')
        .mockImplementation(() => Promise.reject('Failed Create File'));
      try {
        const data = await filesService.createFile(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('readFilePaymentProof()', () => {
    it('should successfully read file payment proof by admin', async () => {
      const argument: ReadFilePaymentProofDTO = {
        id: randomUUID(),
        userRoles: [Role.Admin],
        userId: randomUUID(),
      };
      const expectedResult = plainToClass(FileDTO, {
        id: randomUUID(),
        mimeType: 'pdf',
        originalName: 'a.pdf',
        path: 'payment-proof/a.pdf',
        userId: argument.userId,
      });
      const expectedError = undefined;
      jest.spyOn(filesRepository, 'findFile').mockImplementation(() =>
        Promise.resolve(
          plainToClass(FileDTO, {
            id: expectedResult.id,
            mimeType: 'pdf',
            originalName: 'a.pdf',
            path: 'payment-proof/a.pdf',
            userId: argument.userId,
          }),
        ),
      );
      try {
        const data = await filesService.readFilePaymentProof(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should successfully read file payment proof by customer', async () => {
      const argument: ReadFilePaymentProofDTO = {
        id: randomUUID(),
        userRoles: [Role.Customer],
        userId: randomUUID(),
      };
      const expectedResult = plainToClass(FileDTO, {
        id: randomUUID(),
        mimeType: 'pdf',
        originalName: 'b.pdf',
        path: 'payment-proof/b.pdf',
        userId: argument.userId,
      });
      const expectedError = undefined;
      jest.spyOn(filesRepository, 'findFileWithUserId').mockImplementation(() =>
        Promise.resolve(
          plainToClass(FileDTO, {
            id: expectedResult.id,
            mimeType: 'pdf',
            originalName: 'b.pdf',
            path: 'payment-proof/b.pdf',
            userId: argument.userId,
          }),
        ),
      );
      try {
        const data = await filesService.readFilePaymentProof(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
    it('should failed read file payment proof', async () => {
      const argument: ReadFilePaymentProofDTO = {
        id: randomUUID(),
        userRoles: [Role.Customer],
        userId: randomUUID(),
      };
      const expectedResult = undefined;
      const expectedError = 'Failed Read File Payment Proof';
      jest
        .spyOn(filesRepository, 'findFileWithUserId')
        .mockImplementation(() =>
          Promise.reject('Failed Read File Payment Proof'),
        );
      try {
        const data = await filesService.readFilePaymentProof(argument);
        expect(data).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
