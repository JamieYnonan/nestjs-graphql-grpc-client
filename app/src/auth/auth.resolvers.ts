import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {SignUpRequest} from "./requests/sign-un.request";
import {SignedUp} from "../graphql.schema";
import {Inject, Logger} from "@nestjs/common";
import {AuthServiceInterface} from "./grpc.interface";
import {ClientGrpc} from "@nestjs/microservices";

const logger = new Logger('AuthResolver');
@Resolver('Auth')
export class AuthResolvers {
    private authService: AuthServiceInterface;

    constructor(@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc) {}

    onModuleInit(): any {
        this.authService = this.client.getService<AuthServiceInterface>('AuthService');
        logger.log("CLIENTTTTTT")
        logger.log(this.client)
        logger.log("SERVICCCCEEEEE")
        logger.log(this.authService)
    }

    @Mutation('signUp')
    async signUp(@Args('signUpInput') args: SignUpRequest): Promise<SignedUp> {
        logger.log("signUpInput");
        logger.log(args);
        logger.log(this.authService);
        return await this.authService.signUp(args);
    }
}