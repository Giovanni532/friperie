export default function getFormattedDate() {
    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    return `${day}, ${month} ${year}`;
}

export function getFormattedDateWithOffset(offsetDays) {
    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    const today = new Date();
    today.setDate(today.getDate() + offsetDays); // Ajouter des jours à la date actuelle

    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    return `${day}, ${month} ${year}`;
}