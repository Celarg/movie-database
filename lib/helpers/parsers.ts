export const parseMovieRuntime = (minutes?: string) => {
    if (!minutes) {
        return '';
    }
    const minutesNumber = Number(minutes.split(' ')[0] || 0);
    const hours = Math.floor(Number(minutesNumber) / 60);
    const mins = Number(minutesNumber) % 60;
    return `${hours}h ${mins}m`;
}
