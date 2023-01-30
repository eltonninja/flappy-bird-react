export function formatTimeSpan(ms) {
  var days = Math.floor(ms / (1000 * 60 * 60 * 24));
  ms -= days * (1000 * 60 * 60 * 24);

  var hours = Math.floor(ms / (1000 * 60 * 60));
  ms -= hours * (1000 * 60 * 60);

  var mins = Math.floor(ms / (1000 * 60));
  ms -= mins * (1000 * 60);

  var seconds = Math.floor(ms / 1000);
  ms -= seconds * 1000;

  return `${days ? (days + 'd ') : ''}${hours ? (hours + 'h ') : ''} ${mins ? (mins + 'm ') : ''} ${seconds}s`;
}
