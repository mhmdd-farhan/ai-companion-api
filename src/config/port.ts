export function getDinamicPort(): number | undefined {
    const port = Number(process.env.PORT);
    if (!port) {
        console.warn("Port not configure, using default port 3000 instead");
    }
    return port;
}