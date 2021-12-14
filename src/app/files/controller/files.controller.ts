import { DownloadPaymentProofParamRequest } from '@app/files/controller/request/param/download-payment-proof-param.request';
import { FilesService } from '@app/files/service/files.service';
import {
  Controller,
  Get,
  Param,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseStatusCode } from '@response/response.decorator';
import { Auth } from '@shared/decorator/auth.decorator';
import { User } from '@shared/decorator/user.decorator';
import { Role } from '@shared/enum/role.enum';
import { UserRequest } from '@shared/request/user/user.request';
import { createReadStream } from 'fs';
import { join } from 'path';
@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ResponseStatusCode()
  @Auth(Role.Admin, Role.Customer)
  @Get('/payment-proof/:id/download')
  async downloadPaymentProof(
    @User() user: UserRequest,
    @Param() param: DownloadPaymentProofParamRequest,
    @Response({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    const foundFileDTO = await this.filesService.readFilePaymentProof({
      ...param,
      userId: user.id,
      userRoles: user.roles,
    });
    console.log(foundFileDTO);
    const file = createReadStream(join(process.cwd(), foundFileDTO.path));
    console.log(file);
    res.set({
      'Content-Type': foundFileDTO.mimeType,
      'Content-Disposition': `attachment; filename="${foundFileDTO.originalName}"`,
    });
    return new StreamableFile(file);
  }
}
