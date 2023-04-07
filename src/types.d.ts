import { ExecException } from "child_process";

export interface ProxmoxClientConfig {
    /**
     * The Proxmox VE node that you wish to connect to. 
     * Include protocol and port. Path "/api2/json" is automatically added.
     */
    endpoint: URL,
    /**
     * API Token to use
     * 
     * Should be in the form of `PVEAPIToken=USER@REALM!TOKENID=UUID`
     */
    api: string
}

export interface Token {
    CSRF: string = "";
    PVEAuth: string = "";
    timeStamp: number = 0;
}

export type Callback = (err: ExecException | null, res: string) => unknown;