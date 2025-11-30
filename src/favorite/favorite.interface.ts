import { PublicAlbum } from '../album/album.interface';
import { PublicArtist } from '../artist/artist.interface';
import { PublicTrack } from '../track/track.interface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface PublicFavorites {
  artists: PublicArtist[];
  albums: PublicAlbum[];
  tracks: PublicTrack[];
}
