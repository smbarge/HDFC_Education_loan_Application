export function handle({ event, resolve }) {
    const response = resolve(event, {
        headers: {
            "X-Frame-Options": "SAMEORIGIN",
            "Content-Security-Policy": "frame-ancestors 'self' https://mamfdc.in;"
        }
    });

    return response;
}
