import { Module } from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {AuthModule} from "./auth/auth.module";
import {ClientsModule} from "@nestjs/microservices";

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot({
      debug: true,
      playground: false,
      typePaths: ['./**/*.graphql'],
    })
  ]
})
export class AppModule {}
