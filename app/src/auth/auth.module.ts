import { Module } from '@nestjs/common';
import {AuthResolvers} from "./auth.resolvers";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {join} from "path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '127.0.0.1:5000',
          package: 'auth',
          protoPath: join(__dirname, 'protos/services.proto'),
          loader: {
            keepCase: true,
            longs: Number,
            enums: String,
            defaults: false,
            arrays: true,
            objects: true,
          },
        },
      },
    ]),
  ],
  providers: [AuthResolvers],
})
export class AuthModule {}