import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    ParseUUIDPipe,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album, AlbumDto } from './album.interface';

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Get()
    getAllAlbums(): Album[] {
        return this.albumService.getAll();
    }

    @Get(':id')
    getAlbum(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () =>
                    new BadRequestException('Album ID is not valid UUID'),
            }),
        )
            id: string,
    ): Album {
        const album = this.albumService.getById(id);
        if (!album)
            throw new NotFoundException(`Album with ID ${id} was not found`);
        return album;
    }

    @Post()
    createAlbum(@Body() createAlbumDto: AlbumDto): Album {
        const newAlbum = this.albumService.create(createAlbumDto);
        if (!newAlbum)
            throw new NotFoundException(
                `Artist with ID ${createAlbumDto.artistId} doesn't exist`,
            );
        return newAlbum;
    }

    @Delete(':id')
    @HttpCode(204)
    deleteAlbum(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () =>
                    new BadRequestException('Album ID is not valid UUID'),
            }),
        )
            id: string,
    ): void {
        const isAlbumDeleted = this.albumService.delete(id);
        if (!isAlbumDeleted)
            throw new NotFoundException(`Album with ID ${id} was not found`);
    }

    @Put(':id')
    updateAlbum(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () =>
                    new BadRequestException('Album ID is not valid UUID'),
            }),
        )
            id: string,
        @Body() updateAlbumDto: AlbumDto,
    ): Album {
        const updatedUser = this.albumService.update({ id, ...updateAlbumDto });
        if (!updatedUser)
            throw new NotFoundException(
                `Album with ID ${id} and with artis ID ${updateAlbumDto.artistId} was not found`,
            );
        return updatedUser;
    }
}