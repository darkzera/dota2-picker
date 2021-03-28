/* eslint-disable no-constant-condition */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RequestConfig extends AxiosRequestConfig{}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Response<T = any> extends AxiosResponse<T>{}

export class Request {
    constructor(private request = axios){ }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public get<T = any, R = AxiosResponse<T>>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
        const rt = this.request.get<T, Response<T>>(url, config);
        return rt;
    }

    public static isReqError(error: AxiosError): boolean {
        // We must return
        // true: if we reach the server and returns somethign
        // false: no reach at external API
        // NOT SURE ABOUT lol
        return !!(error.response && error.response.status)
    }

}