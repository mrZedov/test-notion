import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller()
export class FilesController {
//  constructor(private readonly filesService: FilesService) {}

  // @Post('file-upload')
  // @ApiOperation({ description: 'Upload file CSV' })
  // @ApiOkResponse({ type: GetRandomDataResultDto })
  // @ApiBearerAuth('access-token')
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  // async uploadFile(@UploadedFile(FileSizeValidationPipe, FileTypeValidationPipe) file) {
  //   return await this.filesService.uploadFile(file.buffer);
  // }
}
