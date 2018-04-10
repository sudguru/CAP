export interface LoginResponse {
    result?: {
        phone?: string;
        uid?: string;
    }

    error?: {
        errorid?: string;
        message?: string;
    }
}