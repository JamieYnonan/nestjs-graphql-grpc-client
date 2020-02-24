import {SignUpRequest} from "./requests/sign-un.request";
import {SignedUp} from "../graphql.schema";

export interface AuthServiceInterface {
    signUp(request: SignUpRequest): Promise<SignedUp>;
}
