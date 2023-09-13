export function getDuration(startTime: string, endTime: string): string {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    const duration = end.getTime() - start.getTime();

    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration / (1000 * 60)) % 60);

    return `${hours}h ${minutes}m`;
}