
export default function UCCexpiration(certHistory, certifications, type) {
    const dates = [] as any
    certHistory.forEach(c => {
        const cert = certifications.find(x => x.certID == c.certId)
        if (cert[type] == true) {
            dates.push(c.date)
        }
    })
    const sortedDates = dates.sort((a, b) => +new Date(a) - +new Date(b))
    return sortedDates.pop()
}