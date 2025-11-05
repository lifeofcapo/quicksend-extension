import axios from 'axios'
import Popup from "~node_modules/reactjs-popup";

import { API_CONF } from "~shared/utils/constants";

class ApiService {
    private baseUrl = API_CONF.BASE_URL

    private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), API_CONF.TIMEOUT)

        try {
            const { data } = await axios.post(`${this.baseUrl}/${endpoint}`, {
                ...options,
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            })

            return data
        } catch (error) {
            console.error(error);
        } finally {
          clearTimeout(timeout)
        }
    }

    async refreshToken(): Promise<string> {
        const data = await this.request<{ access_token: string }>(
            API_CONF.ENDPOINTS.REFRESH_TOKEN,
            { method: 'POST' }
        )

        return data.access_token
    }

    async getGoogleToken(accessToken: string): Promise<string> {

    }
}