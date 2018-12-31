export default function getHumanizedHourDuration(duration) {
  if (!duration) {
    return 0;
  }

  const seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  return `${(hours + (minutes * 60 + seconds) / 3600).toFixed(2)}`;
}
