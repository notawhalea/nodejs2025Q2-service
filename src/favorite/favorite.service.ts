import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Favorites, PublicFavorites } from './favorite.interface';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}
  private _favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  public getAll(): PublicFavorites {
    const tracks = this._favs.tracks.map((trackId) => {
      return this.trackService.getById(trackId);
    });
    const albums = this._favs.albums.map((albumId) => {
      return this.albumService.getById(albumId);
    });
    const artists = this._favs.artists.map((artistId) => {
      return this.artistService.getById(artistId);
    });
    return {
      tracks,
      albums,
      artists,
    };
  }

  public addTrack(id: string): boolean {
    const isTrackInFavs = this._favs.tracks.includes(id);
    if (isTrackInFavs) return false;
    const track = this.trackService.getById(id);
    if (!track) return false;
    this._favs.tracks.push(id);
    return true;
  }

  public deleteTrack(id: string): boolean {
    const track = this.trackService.getById(id);
    if (!track) return false;
    this._favs.tracks = this._favs.tracks.filter((trackId) => trackId !== id);
    return true;
  }

  public addAlbum(id: string): boolean {
    const isAlbumInFavs = this._favs.albums.includes(id);
    if (isAlbumInFavs) return false;
    const album = this.albumService.getById(id);
    if (!album) return false;
    this._favs.albums.push(id);
    return true;
  }

  public deleteAlbum(id: string): boolean {
    const album = this.albumService.getById(id);
    if (!album) return false;
    this._favs.albums = this._favs.albums.filter((albumId) => albumId !== id);
    return true;
  }

  public addArtist(id: string): boolean {
    const isArtistInFavs = this._favs.artists.includes(id);
    if (isArtistInFavs) return false;
    const artist = this.artistService.getById(id);
    if (!artist) return false;
    this._favs.artists.push(id);
    return true;
  }

  public deleteArtist(id: string): boolean {
    const artist = this.artistService.getById(id);
    if (!artist) return false;
    this._favs.artists = this._favs.artists.filter((albumId) => albumId !== id);
    return true;
  }
}
