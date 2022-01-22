import { DownloadPaymentProofParamRequest } from '@app/files/controller/request/param/download-payment-proof-param.request';
import { FilesService } from '@app/files/service/files.service';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@shared/decorator/auth.decorator';
import { User } from '@shared/decorator/user.decorator';
import { Role } from '@shared/enum/role.enum';
import { UserRequest } from '@shared/request/user/user.request';
import { Response } from 'express';
import { createReadStream } from 'fs';
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
    const file = createReadStream(filePath);
    res.set({
      'Content-Type': foundFileDTO.mimeType,
      'Content-Disposition': `attachment; filename="${foundFileDTO.originalName}"`,
    });
    file.pipe(res);
  }
}
