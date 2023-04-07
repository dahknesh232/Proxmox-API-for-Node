/* Author: MyristicaFragrans (https://github.com/MyristicaFragrans)
 * apiInteractions.ts (c) 2023
 * Desc: description
 * Created:  2023-04-03T06:26:38.400Z
 */

import querystring, { ParsedUrlQueryInput } from "querystring";
import curlCom from "./curlComposer";
import { Callback } from "./types";

enum MethodVerb {
    GET,
    POST,
    DEL,
    PUT
}

export default class ApiInteractionBuilder {
    apiURL: string;
    token: string;

    constructor(apiURL: string, token: string) {
        this.apiURL = apiURL;
        this.token = token;
    }

    makeRequest(method: MethodVerb, path: string, data: string, callback: Callback) {
        const composed = (new curlCom(this.apiURL, this.token))
        if (method == MethodVerb.GET) {
            composed.get(path)
            .then((res)=>{callback(null, res)})
            .catch(err=>{callback(err,"")})
        }
        else if (method == MethodVerb.POST) {
            composed.post(path, data)
            .then((res)=>{callback(null, res)})
            .catch(err=>{callback(err,"")})
        }
        else if (method == MethodVerb.DEL) {
            composed.del(path, data)
            .then((res)=>{callback(null, res)})
            .catch(err=>{callback(err,"")})
        }
        else if (method == MethodVerb.PUT) {
            composed.put(path, data)
            .then((res)=>{callback(null, res)})
            .catch(err=>{callback(err,"")})
        } else {
            console.warn("Unknown Method " + method);
            return;
        }
    }
    
    async get(path: string, data: ParsedUrlQueryInput, callback: Callback) {
        const query = querystring.stringify(data);
        this.makeRequest(MethodVerb.GET, path, query, callback);
    }
    
    post(path: string, data: ParsedUrlQueryInput, callback: Callback) {
        const query = querystring.stringify(data);
        this.makeRequest(MethodVerb.POST, path, query, callback);
    }
    
    del(path: string, data: ParsedUrlQueryInput, callback: Callback) {
        const query = querystring.stringify(data);
        this.makeRequest(MethodVerb.DEL, path, query, callback);
    }
    
    put(path: string, data: ParsedUrlQueryInput, callback: Callback) {
        const query = querystring.stringify(data);
        this.makeRequest(MethodVerb.PUT, path, query, callback);
    }
}

export type VerbAction = (path: string, data: ParsedUrlQueryInput, callback: Callback) => void;