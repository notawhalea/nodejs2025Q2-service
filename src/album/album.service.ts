import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Album, AlbumDto } from './album.interface';
import { randomUUID } from 'crypto';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class AlbumService {
    constructor(
        @Inject(forwardRef(() => ArtistService))
        private readonly artistService: ArtistService,
    ) {}

    private _albums: Album[] = [];

    public getAll(): Album[] {
        return this._albums;
    }

    public getById(id: string): Album {
        return this._albums.find((album) => album.id === id);
    }

    public getArtistsAlbums(artistId: string): Album[] {
        return this._albums.filter((album) => album.artistId === artistId);
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