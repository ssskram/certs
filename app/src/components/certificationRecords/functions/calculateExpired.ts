export default function UCCexpiration(certHistory, type) {
  if (type == "ICC") {
    const iccDates = certHistory
      .map(i => i.iccExp)
      .filter(n => n)
      .sort((a, b) => +new Date(a) - +new Date(b));
    return iccDates[0];
  } else {
    const uccDates = certHistory
      .map(i => i.uccExp)
      .filter(n => n)
      .sort((a, b) => +new Date(a) - +new Date(b));
    return uccDates.pop();
  }
}
