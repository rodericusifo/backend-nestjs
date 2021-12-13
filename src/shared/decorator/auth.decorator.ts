import { JwtAuthGuard } from '@app/auth/guard/jwt-auth.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@shared/enum/role.enum';
import { RolesGuard } from '@shared/guard/roles.guard';

export const ROLES_KEY = 'roles';
export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
  );
}
