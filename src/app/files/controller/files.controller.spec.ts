import { FilesController } from '@app/files/controller/files.controller';
import { FilesService } from '@app/files/service/files.service';
import { MockedFilesService } from '@app/files/__mocks__/service/mock-files.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ResponseModule } from '@response/response.module';

describe('FilesController', () => {
  let filesController: FilesController;
  let filesService: MockedFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ResponseModule],
      controllers: [FilesController],
      providers: [
        {
          provide: FilesService,
          useClass: MockedFilesService,
        },
      ],
    }).compile();

    filesController = module.get(FilesController);
    filesService = module.get(FilesService);
  });

  it('should be defined', () => {
    expect(filesController).toBeDefined();
    expect(filesService).toBeDefined();
  });
});
