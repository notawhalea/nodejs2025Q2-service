import { IsBoolean, IsString, MinLength } from 'class-validator';

export interface Artist {
    id: string;
    name: string;
    grammy: boolean;
}

export class ArtistDto {
    @IsString()
    @MinLength(2)
    name: string;
    @IsBoolean()
    grammy: boolean;
}

export type PublicArtist = Omit<Artist, 'id'>;