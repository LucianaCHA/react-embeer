export interface IUrlData {
    hostname: string;
    pathname: string;
    search: string;
    hash: string;
    href?: string;
}

export type IUrlDataKeys = {
    [key: string]: string;
}