export function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " year";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " month";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " day";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hour";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minute";
  }
  return Math.floor(seconds) + " second";
}
