import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  BadRequestException,
  NotFoundException,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { Artist, ArtistDto } from './artist.interface';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists(): Artist[] {
    return this.artistService.getAll();
  }

  @Get(':id')
  getArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Artist ID is not valid UUID'),
      }),
    )
    id: string,
  ): Artist {
    const artist = this.artistService.getById(id);
    if (!artist)
      throw new NotFoundException(`Artist with ID ${id} was not found`);
    return artist;
  }

  @Post()
  createArtist(@Body() createArtistDto: ArtistDto): Artist {
    return this.artistService.create(createArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Artist ID is not valid UUID'),
      }),
    )
    id: string,
  ): void {
    const isArtistDeleted = this.artistService.delete(id);
    if (!isArtistDeleted)
      throw new NotFoundException(`Artist with ID ${id} was not found`);
  }

  @Put(':id')
  updateArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('Artist ID is not valid UUID'),
      }),
    )
    id: string,
    @Body() updateArtistDto: ArtistDto,
  ) {
    const updatedArtist = this.artistService.update({ id, ...updateArtistDto });
    if (!updatedArtist)
      throw new NotFoundException(`Artist with ID ${id} was not found`);
    return updatedArtist;
  }
}
