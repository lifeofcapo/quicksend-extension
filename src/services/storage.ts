import { SecureStorage } from "@plasmohq/storage/secure"
import type { ParsedEmails } from "~src/types"

class SecureStorageService {
    private storage = new SecureStorage()
    private initialized = false

    private async init() {
        if (this.initialized) return

        await this.storage.setPassword(chrome.runtime.id)
        this.initialized = true
    }

    async setParsedEmails(parsedEmails: ParsedEmails): Promise<void> {
        await this.init()

        await this.storage.set('parsed_emails', parsedEmails);
    }

    async getParsedEmailsById(id: string): Promise<ParsedEmails | null> {
        const allParsedEmails = await this.storage.get('parsed_emails') as ParsedEmails[]

        return allParsedEmails.find(concreteParsedEmails => concreteParsedEmails.id === id) || null
    }

    async setAccessToken(accessToken: string): Promise<void> {
        await this.init()

        await this.storage.set('access_jwt_token', accessToken);
    }

    async getAccessToken(): Promise<string | null> {
        await this.init()

        return (await this.storage.get('access_jwt_token') as string)
    }

    async setRefreshToken(refreshToken: string): Promise<void> {
        await this.init()

        await this.storage.set('refresh_jwt_token', refreshToken);
    }

    async getRefreshToken(): Promise<string | null> {
        await this.init()

        return (await this.storage.get('refresh_jwt_token') as string)
    }
}

export const storageService = new SecureStorageService();
