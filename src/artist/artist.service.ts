import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Artist, ArtistDto } from './artist.interface';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
    constructor(
        @Inject(forwardRef(() => AlbumService))
        private readonly albumService: AlbumService,
    ) {}
    private _artists: Artist[] = [];

    public getAll(): Artist[] {
        return this._artists;
    }

    public getById(id: string): Artist | null {
        return this._artists.find((artist) => artist.id === id);
    }

    public create({ name, grammy }: ArtistDto): Artist {
        const newArtist = {
            id: randomUUID(),
            name,
            grammy,
        };
        this._artists.push(newArtist);
        return newArtist;
    }

    public delete(id: string): boolean {
        const artist = this.getById(id);
        if (!artist) return false;
        this.albumService.deleteArtistId(id);
        this._artists = this._artists.filter((artist) => artist.id !== id);
        return true;
    }

    public update({ id, name, grammy }: Artist): Artist | null {
        const artist = this.getById(id);
        if (!artist) return null;
        const artistIndex = this._artists.findIndex((artist) => artist.id === id);
        const updatedArtist = {
            id,
            name,
            grammy,
        };
        this._artists[artistIndex] = updatedArtist;
        return updatedArtist;
    }
}