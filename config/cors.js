const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://example.com',
    'https://www.google.com'
];
export const options = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
