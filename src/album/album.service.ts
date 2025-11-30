import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Album, AlbumDto, PublicAlbum } from './album.interface';
import { randomUUID } from 'crypto';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from "../track/track.service";
import { FavoritesService } from "../favorite/favorite.service";

@Injectable()
export class AlbumService {
    constructor(
        @Inject(forwardRef(() => ArtistService))
        private readonly artistService: ArtistService,
        @Inject(forwardRef(() => TrackService))
        private readonly trackService: TrackService,
        @Inject(forwardRef(() => FavoritesService))
        private readonly favouritesService: FavoritesService,
    ) {}

    private _albums: Album[] = [];

    public getPublicInfo(album: Album): PublicAlbum {
        const { name, year, artistId } = album;
        return { name, year, artistId };
    }

    private getArtistsAlbums(artistId: string): Album[] {
        return this._albums.filter((album) => album.artistId === artistId);
    }

    public getAll(): Album[] {
        return this._albums;
    }

    public getById(id: string): Album {
        return this._albums.find((album) => album.id === id);
    }

    public create({ name, year, artistId }: AlbumDto): Album | null {
        const artist = artistId ? this.artistService.getById(artistId) : true;
        if (!artist) return null;
        const newAlbum = {
            id: randomUUID(),
            name,
            year,
            artistId,
        };
        this._albums.push(newAlbum);
        return newAlbum;
    }

    public delete(id: string): boolean {
        const album = this.getById(id);
        if (!album) return false;
        this.trackService.deleteAlbumId(id);
        this.favouritesService.deleteAlbum(id);
        this._albums = this._albums.filter((album) => album.id !== id);
        return true;
    }

    public deleteArtistId(artistId: string): boolean {
        const artistAlbums = this.getArtistsAlbums(artistId);
        artistAlbums.forEach((album) => {
            album.artistId = null;
        });
        return true;
    }

    public update({ id, name, year, artistId }: Album): Album | null {
        const album = this.getById(id);
        const artist = artistId ? this.artistService.getById(artistId) : true;
        if (!album || !artist) return null;
        const albumIndex = this._albums.findIndex((album) => album.id === id);
        const updatedAlbum = {
            id,
            name,
            year,
            artistId,
        };
        this._albums[albumIndex] = updatedAlbum;
        return updatedAlbum;
    }
}