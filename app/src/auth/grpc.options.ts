import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {Logger} from "@nestjs/common";

const logger = new Logger("COJFIFFF");
logger.log(join(__dirname, './protos/services.proto'));

const protoDir = join(__dirname, './protos');

export const microserviceOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: '127.0.0.1:5000',
        package: 'auth',
        protoPath: [join(__dirname, '../auth/protos/services.proto')],
        loader: {
            keepCase: true,
            longs: Number,
            enums: String,
            defaults: false,
            arrays: true,
            objects: true,
            includeDirs: [protoDir],
        },
    },
};