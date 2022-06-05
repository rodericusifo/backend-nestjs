import { DownloadPaymentProofParamRequest } from '@app/files/controllers/request/param/download-payment-proof-param.request';
import { FilesService } from '@app/files/services/files.service';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@shared/decorators/auth.decorator';
import { User } from '@shared/decorators/user.decorator';
import { Role } from '@shared/enums/role.enum';
import { UserRequest } from '@shared/request/user/user.request';
import { Response } from 'express';
import { join } from 'path';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Auth(Role.Admin, Role.Customer)
  @Get('/payment-proof/:id/download')
  async downloadPaymentProof(
    @User() user: UserRequest,
    @Param() param: DownloadPaymentProofParamRequest,
    @Res() res: Response,
  ) {
    const foundFileDTO = await this.filesService.readFilePaymentProof({
      ...param,
      userId: user.id,
      userRoles: user.roles,
    });
    const filePath = join(process.cwd(), foundFileDTO.path);
    res.download(filePath, foundFileDTO.originalName);
  }
}
