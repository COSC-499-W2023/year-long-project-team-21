import {devURL} from './api'
import axios from 'axios';
import { storeUserSession, removeUserSession} from '../../src/common/EncryptedSession'; 

// a class that makes requests to the backend
// requests to a public endpoint are simple and don't diverge much from default axios requests

// this class will handle the requests made to login the user so an authentication token can be stored. 


// requests to a private endpoint are more complex. They require an authentication token. If the token is expired, 
// send another request to refresh and retrieve a new authentication token and make a subsequent request to the endpoint in question. 

// a POST request to tokens is required to log the user in 
// - store token and refresh token. Consider storing a timestamp as well... 
// a POST request to tokens/refresh is required to refresh an authentication token
// - when this post request is stored, store the token 
export class NetworkRequest{
    
    private url: string; 

    // constructor initializes where the request is going too. Only need to specify the host.
    // I'm not sure if I love this functionality... Maybe it can be used to specify the base url? 
    constructor(url: string){
        this.url = devURL + url; 
    }

    // get URL 
    public getUrl(): string {
        return this.url;
    }

    // set URL
    public setUrl(url: string){
        this.url = devURL + url; 
    }

    // async function handling login. Stores authentication token in encrypted storage
    public async login(user: string, pass: string) {
        try {
            // Create axios POST request, incoming username and password in the body
            const response = await axios.post(this.url, {
                username: user,
                password: pass,
            });
    
            // Parse the response and assign to respective variables
            const accessToken: string = response.data["accessToken"];
            const refreshToken: string = response.data["refreshToken"];
    
            // Clear any existing user session before storing the new one
            await removeUserSession();
    
            // Store the new user session
            await storeUserSession(accessToken, refreshToken);
        } catch (error) {
            throw new Error(`Login error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    // checks if authentication token is expired using timestamp 
    private checkToken(){
        
    }

    // private method which 
    private async authenticate(){

    }

    // private method which retrieves a new authentication token. 
    private async getNewToken(){

    }

}   