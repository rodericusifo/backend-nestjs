import { FilesController } from '@app/files/controller/files.controller';
import { FilesRepository } from '@app/files/repository/files.repository';
import { FilesService } from '@app/files/service/files.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResponseModule } from '@response/response.module';

describe('FilesController', () => {
  let filesController: FilesController;
  let filesService: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ResponseModule],
      controllers: [FilesController],
      providers: [
        FilesService,
        {
          provide: getRepositoryToken(FilesRepository),
          useClass: FilesRepository,
        },
      ],
    }).compile();

    filesController = module.get<FilesController>(FilesController);
    filesService = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(filesController).toBeDefined();
    expect(filesService).toBeDefined();
  });
});
