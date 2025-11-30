import {
    IsInt,
    IsString,
    IsUUID,
    MinLength,
    ValidateIf,
} from 'class-validator';

export interface Album {
    id: string;
    name: string;
    year: number;
    artistId: string | null;
}

export class AlbumDto {
    @IsString()
    @MinLength(1)
    name: string;
    @IsInt()
    year: number;
    @ValidateIf((album) => album.artistId !== null)
    @IsUUID('4', { message: 'Artist ID is not a valid UUID' })
    artistId: string | null;
}