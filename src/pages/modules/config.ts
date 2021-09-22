import { AxiosRequestConfig } from "axios";

interface IConfig {
    apiUrls: {
        [desc: string]: AxiosRequestConfig;
    };
}

const noCache = { "Cache-Control": "no-cache" };

const Config: IConfig = {
    apiUrls: {
        "get modules": {
            url: "/api/admin/modules",
            method: "GET",
            headers: {
                ...noCache,
            },
        },
    }
}

export default Config;