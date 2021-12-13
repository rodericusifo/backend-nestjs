import { CreateFileDTO } from '@app/files/dto/create-file.dto';
import { FilesRepository } from '@app/files/repository/files.repository';
import { FilesService } from '@app/files/service/files.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
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
      const expectedResult = {
        id: randomUUID(),
        mimeType: 'pdf',
        originalName: 'a.pdf',
        path: 'pdf/a.pdf',
        userId: argument.userId,
      };
      const expectedError = undefined;
      jest.spyOn(filesRepository, 'saveFile').mockImplementation(() =>
        Promise.resolve({
          id: expectedResult.id,
          mimeType: 'pdf',
          originalName: 'a.pdf',
          path: 'pdf/a.pdf',
          userId: argument.userId,
        }),
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
});
