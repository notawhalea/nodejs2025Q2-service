import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track, TrackDto } from './track.interface';

@Controller('track')
export class TrackController {
    constructor(private readonly trackService: TrackService) {}

    @Get()
    getAllTracks(): Track[] {
        return this.trackService.getAll();
    }

    @Get(':id')
    getTrack(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () =>
                    new BadRequestException('Track ID is not a valid UUID'),
            }),
        )
            id: string,
    ): Track {
        const track = this.trackService.getById(id);
        if (!track)
            throw new NotFoundException(`Track with ID ${id} was not found`);
        return track;
    }

    @Post()
    createTrack(@Body() createTrackDto: TrackDto): Track {
        const newTrack = this.trackService.create(createTrackDto);
        if (!newTrack)
            throw new NotFoundException(
                `Check artistId and albumId, there no artists or albums with such ids`,
            );
        return newTrack;
    }

    @Delete(':id')
    @HttpCode(204)
    deleteTrack(
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
        const isTrackDeleted = this.trackService.delete(id);
        if (!isTrackDeleted)
            throw new NotFoundException(`Track with ID ${id} was not found`);
    }

    @Put(':id')
    updateTrack(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () =>
                    new BadRequestException('Track ID is not a valid UUID'),
            }),
        )
            id: string,
        @Body() updateTrackDto: TrackDto,
    ): Track {
        const updatedTrack = this.trackService.update({ id, ...updateTrackDto });
        if (!updatedTrack)
            throw new NotFoundException(
                `Check artistId and albumId, there no artists or albums with such ids`,
            );
        return updatedTrack;
    }
}