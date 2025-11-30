import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from "../track/track.module";
import { FavoritesModule } from "../favorite/favorite.module";

@Module({
    imports: [
        forwardRef(() => ArtistModule),
        forwardRef(() => TrackModule),
        forwardRef(() => FavoritesModule),
    ],
    controllers: [AlbumController],
    providers: [AlbumService],
    exports: [AlbumService],
})
export class AlbumModule {}