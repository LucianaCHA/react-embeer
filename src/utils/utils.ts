import { IUrlData } from "interfaces/interfaces";

export const setUrlData = (url: string) :IUrlData  => {        
    try{
        const parsed = new URL(url);
        const { hostname , pathname, search, hash , href} = parsed;

        return {
            hostname,
            pathname,
            search,
            hash,
            href
        }
    } catch (error) {
        throw new Error('Invalid URL');
    }
}