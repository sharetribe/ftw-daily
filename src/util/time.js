export const formatTime = (time) => {
    const split = time.split("_");
    return split[0] + 'h' + split[1];
}