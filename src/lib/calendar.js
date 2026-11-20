const VENUE_CAL_LOCATION =
  "Aashirwad Garden, Bankhedi Road, Near Petrol Pump, Pipariya, Narmadapuram, Madhya Pradesh 461775";

export function buildGoogleCalendarUrl({
  title,
  dates,
  details,
  location = VENUE_CAL_LOCATION,
}) {
  return (
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(title) +
    "&dates=" + encodeURIComponent(dates) +
    "&details=" + encodeURIComponent(details) +
    "&location=" + encodeURIComponent(location)
  );
}

export function buildEventCalendarUrl(ev) {
  return buildGoogleCalendarUrl({
    title: `${ev.title.en} · Mansi & Aditya Wedding`,
    dates: `${ev.calStart}/${ev.calEnd}`,
    details: `${ev.note.en} #iAMinlove`,
  });
}

export const fullWeddingCalendarUrl = buildGoogleCalendarUrl({
  title: "Mansi & Aditya's Wedding · The AM Chapter",
  dates: "20261204T010000Z/20261205T150000Z",
  details:
    "Join us for the wedding celebrations of Mansi Rathi & Aditya Jain at Aashirwad Garden, Bankhedi Road, Pipariya. #iAMinlove",
});

function escapeIcsText(str) {
  return String(str || "")
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n");
}

export function downloadEventIcs({
  uid,
  title,
  startUtc,
  endUtc,
  description,
  location = VENUE_CAL_LOCATION,
  filename = "Mansi-Aditya-Wedding.ics",
}) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The AM Chapter//Mansi and Aditya Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    "DTSTAMP:20261121T000000Z",
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function downloadFullWeddingIcs() {
  downloadEventIcs({
    uid: "mansi-aditya-theamchapter-2026@invite",
    title: "Mansi & Aditya's Wedding Celebrations (#iAMinlove)",
    startUtc: "20261204T010000Z",
    endUtc: "20261205T150000Z",
    description:
      "Two days of wedding celebrations for Mansi Rathi & Aditya Jain at Aashirwad Garden, Bankhedi Road, Pipariya. #iAMinlove",
    filename: "Mansi-Aditya-Wedding.ics",
  });
}
