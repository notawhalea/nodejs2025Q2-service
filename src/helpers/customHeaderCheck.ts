import {
    CanActivate,
    ExecutionContext,
    Injectable,
    BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CustomHeaderCheck implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const customHeader = request.headers['content-type'];

        if (!customHeader) {
            throw new BadRequestException('Missing required header: Content-Type');
        }
        if (customHeader !== 'application/json') {
            throw new BadRequestException(
                'Content-Type header must be equal to application/json',
            );
        }

        return true;
    }
}