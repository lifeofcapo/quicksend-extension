export interface GoogleFile {
    name: string
    url: string
}

export interface EmailsFromSpreadsheet {
    spreadsheetId: string
    spreadsheetName: string
    emails: string[]
    totalCount: number
}

export interface TokenData {
    accessToken: string
    expiresAt?: number
    lastRefreshed: number
}

export interface ImportEmailsSession {
    id: string
    sheetName: string
    emails: string[]
    timestamp: number
}
