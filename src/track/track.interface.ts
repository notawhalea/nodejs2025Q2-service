import {
    IsInt,
    IsString,
    IsUUID,
    MinLength,
    ValidateIf,
} from 'class-validator';

export interface Track {
    id: string;
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
}

export class TrackDto {
    @IsString()
    @MinLength(1)
    name: string;
    @ValidateIf((track) => track.artistId !== null)
    @IsUUID()
    artistId: string | null;
    @ValidateIf((track) => track.albumId !== null)
    @IsUUID()
    albumId: string | null;
    @IsInt()
    duration: number;
}

export type PublicTrack = Omit<Track, 'id'>;