export {};

declare global{
    interface User {
        id: string;
        email: string;
        name: string;
        userName: string;
    }

    interface LoginResponse {
        message: string;
        accessToken: string;
        refreshToken: string;
        user: User;
    }

    interface RegisterResponse {
        id: string
        email: string;
        name: string;
        username: string;
    }
}