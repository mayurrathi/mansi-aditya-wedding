import { scheduleDays } from "../data/weddingData";

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
    details: `${ev.note.en} #iAMinLove`,
  });
}

export const fullWeddingCalendarUrl = buildGoogleCalendarUrl({
  title: "Mansi & Aditya's Wedding · The AM Chapter",
  dates: "20261204T010000Z/20261205T150000Z",
  details:
    "Join us for the wedding celebrations of Mansi Rathi & Aditya Jain at Aashirwad Garden, Bankhedi Road, Pipariya. #iAMinLove",
});

function escapeIcsText(str) {
  return String(str || "")
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n");
}

function buildVEventLines({
  uid,
  title,
  startUtc,
  endUtc,
  description,
  location = VENUE_CAL_LOCATION,
}) {
  return [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    "DTSTAMP:20261121T000000Z",
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcsText(`${title} begins in 30 minutes`)}`,
    "END:VALARM",
    "END:VEVENT",
  ];
}

function triggerIcsDownload(lines, filename) {
  const ics = lines.join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
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
  triggerIcsDownload(
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//The AM Chapter//Mansi and Aditya Wedding//EN",
      ...buildVEventLines({ uid, title, startUtc, endUtc, description, location }),
      "END:VCALENDAR",
    ],
    filename
  );
}

export function downloadFullWeddingIcs() {
  const allEvents = scheduleDays.flatMap((day) => day.events);
  const eventLines = allEvents.flatMap((ev) =>
    buildVEventLines({
      uid: `am-chapter-${ev.id}-2026@invite`,
      title: `${ev.title.en} · Mansi & Aditya Wedding`,
      startUtc: ev.calStart,
      endUtc: ev.calEnd,
      description: `${ev.note.en}${ev.dressCode ? ` (${ev.dressCode.en})` : ""} #iAMinLove`,
      location: VENUE_CAL_LOCATION,
    })
  );

  triggerIcsDownload(
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//The AM Chapter//Mansi and Aditya Wedding//EN",
      "X-WR-CALNAME:Mansi & Aditya Wedding (4 & 5 Dec 2026)",
      ...eventLines,
      "END:VCALENDAR",
    ],
    "Mansi-Aditya-All-9-Events.ics"
  );
}
