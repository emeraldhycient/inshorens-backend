import axios from "axios"
import { IpInfo } from "../../types/@types";

export const getIpServiceInfo = async (ipAddress: string) => {
    try {
        const resp = await axios.get(`http://ipwho.is/${ipAddress}`);
        const response: IpInfo = resp.data;
        return response;
    } catch (err: any) {
        throw new Error(`Failed to retrieve location your IP location data. We don't mind aliens, but we support only earthlings for now 😊`);
    }
}