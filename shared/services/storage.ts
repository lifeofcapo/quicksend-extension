import { SecureStorage } from "@plasmohq/storage/secure";
import type { TokenData, ImportEmailsSession } from "~shared/types";

class SecureStorageService {
    private storage = new SecureStorage();

    async getTokenData(): Promise<TokenData | null> {
        return this.storage.get('tokenData');
    }

    async setTokenData(tokenData: TokenData): Promise<void> {
        return this.storage.set('tokenData', tokenData);
    }

    async saveImportEmailsSession(importEmailsSession: ImportEmailsSession): Promise<void> {
        return this.storage.set('importEmailsSession', importEmailsSession);
    }

    async getImportEmailsSession(id: string): Promise<ImportEmailsSession | null> {
        const sessions = await this.getImportEmailsSessions()

        return sessions['id'] || null
    }

    private async getImportEmailsSessions(): Promise<ImportEmailsSession[]> {
        return (await this.storage.get('importEmailsSessions') as ImportEmailsSession[])
    }
}

export const storageService = new SecureStorageService();
