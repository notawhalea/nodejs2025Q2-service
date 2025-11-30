import {
    BadRequestException,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Post,
    UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorite.service';
import { PublicFavorites } from './favorite.interface';

@Controller('favs')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Get()
    getAllFavorites(): PublicFavorites {
        return this.favoritesService.getAll();
    }

    @Post('/track/:id')
    addTrackToFavs(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () =>
                    new BadRequestException('Track ID is not a valid UUID'),
            }),
        )
            id: string,
    ): void {
        const isTrackAddedToFavs = this.favoritesService.addTrack(id);
        if (!isTrackAddedToFavs)
            throw new UnprocessableEntityException(
                `Track with ID ${id} was not found`,
            );
    }

    @Delete('/track/:id')
    @HttpCode(204)
    deleteTrackFromFavs(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () =>
                    new BadRequestException('Track ID is not a valid UUID'),
            }),
        )
            id: string,
    ): void {
        const isTrackDeletedFromFavs = this.favoritesService.deleteTrack(id);
        if (!isTrackDeletedFromFavs)
            throw new NotFoundException(
                `Track with ID ${id} was not added to favorites`,
            );
    }

    @Post('/album/:id')
    addAlbumToFavs(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () =>
                    new BadRequestException('Album ID is not a valid UUID'),
            }),
        )
            id: string,
    ): void {
        const isAlbumAddedToFavs = this.favoritesService.addAlbum(id);
        if (!isAlbumAddedToFavs)
            throw new UnprocessableEntityException(
                `Album with ID ${id} was not found`,
            );
    }

    @Delete('/album/:id')
    @HttpCode(204)
    deleteAlbumFromFavs(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () =>
                    new BadRequestException('Album ID is not a valid UUID'),
            }),
        )
            id: string,
    ): void {
        const isAlbumDeletedFromFavs = this.favoritesService.deleteAlbum(id);
        if (!isAlbumDeletedFromFavs)
            throw new NotFoundException(
                `Album with ID ${id} was not added to favorites`,
            );
    }

    @Post('/artist/:id')
    addArtistToFavs(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () =>
                    new BadRequestException('Artist ID is not a valid UUID'),
            }),
        )
            id: string,
    ): void {
        const isArtistAddedToFavs = this.favoritesService.addArtist(id);
        if (!isArtistAddedToFavs)
            throw new UnprocessableEntityException(
                `Artist with ID ${id} was not found`,
            );
    }

    @Delete('/artist/:id')
    @HttpCode(204)
    deleteArtistFromFavs(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () =>
                    new BadRequestException('Artist ID is not a valid UUID'),
            }),
        )
            id: string,
    ): void {
        const isArtistDeletedFromFavs = this.favoritesService.deleteArtist(id);
        if (!isArtistDeletedFromFavs)
            throw new NotFoundException(
                `Artist with ID ${id} was not added to favorites`,
            );
    }
}