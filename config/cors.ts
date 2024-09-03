interface CorsOptions {
    origin?: ((origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void) | string | string[];
    methods?: string | string[];
    allowedHeaders?: string | string[];
    exposedHeaders?: string | string[];
    credentials?: boolean;
    maxAge?: number;
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
}

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://example.com',
    'https://www.google.com'
];

export const options: CorsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};