"use client";

import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-09-13T12:20:00+05:30").getTime();
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const weddingCalendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding%20of%20Dr.%20Renjay%20R.V%20%26%20Dr.%20Akhila%20J%20Sasi&dates=20260913T053000Z%2F20260913T073000Z&details=Reception%20at%2011%3A00%20AM.%20Muhurtham%20between%2012%3A20%20PM%20and%2012%3A55%20PM.&location=Safa%20Convention%20Centre%2C%20Mangalapuram%20Road%2C%20Thonnakkal%2C%20Kerala%20695317";

const receptionCalendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding%20Reception%20of%20Dr.%20Renjay%20R.V%20%26%20Dr.%20Akhila%20J%20Sasi&dates=20260915T113000Z%2F20260915T153000Z&details=Wedding%20reception%20from%205%3A00%20PM%20onwards.&location=RDR%20Convention%20Centre%2C%20Kochar%20Road%2C%20Edapazhanji%2C%20Thiruvananthapuram%2C%20Kerala%20695014";

const safaMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Safa%20Convention%20Centre%2C%20Mangalapuram%20Road%2C%20Thonnakkal%2C%20Kerala%20695317";

const rdrMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=RDR%20Convention%20Centre%2C%20Kochar%20Road%2C%20Edapazhanji%2C%20Thiruvananthapuram%2C%20Kerala%20695014";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const initialCountdown: Countdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getCountdown(): Countdown {
  const remaining = Math.max(WEDDING_DATE - Date.now(), 0);

  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  };
}

function CountdownTimer() {
  const [time, setTime] = useState<Countdown>(initialCountdown);

  useEffect(() => {
    const update = () => setTime(getCountdown());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="countdown" aria-label="Countdown to the wedding ceremony">
      {Object.entries(time).map(([label, value]) => (
        <div className="countdownItem" key={label}>
          <span className="countdownValue">{String(value).padStart(2, "0")}</span>
          <span className="countdownLabel">{label}</span>
        </div>
      ))}
    </div>
  );
}

function CalendarLinks({ googleUrl }: { googleUrl: string }) {
  return (
    <div className="eventActions">
      <a href={googleUrl} target="_blank" rel="noreferrer" className="button buttonSolid">
        Add to Google Calendar
      </a>
      <a href={`${basePath}/renjay-akhila-wedding.ics`} download className="textLink">
        Download calendar file <span aria-hidden="true">↘</span>
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="siteHeader">
        <a className="monogram" href="#home" aria-label="Renjay and Akhila - home">
          R<span>&amp;</span>A
        </a>
        <nav aria-label="Wedding invitation navigation">
          <a href="#celebrations">Celebrations</a>
          <a href="#families">Families</a>
          <a href="#venues">Venues</a>
        </nav>
        <a className="headerDate" href="#celebrations">
          13.09.26
        </a>
      </header>

      <section className="hero" id="home">
        <div
          className="heroPhoto"
          role="img"
          aria-label="Dr. Renjay and Dr. Akhila together in burgundy wedding attire"
          style={{ backgroundImage: `url("${basePath}/renjay-akhila.jpg")` }}
        >
          <div className="photoWash" />
          <p className="photoCaption">A beginning, held close.</p>
        </div>

        <div className="heroContent">
          <p className="eyebrow">With the blessings of our families</p>
          <div className="heroNames">
            <h1>
              Renjay
              <span className="nameAmpersand">&amp;</span>
              Akhila
            </h1>
          </div>
          <p className="heroIntro">
            Together with our families, we invite you to share in the joy of our wedding celebration.
          </p>
          <div className="heroDateBlock">
            <span>Sunday</span>
            <strong>13</strong>
            <span>September 2026</span>
          </div>
          <p className="heroLocation">Thiruvananthapuram, Kerala</p>
          <a href="#celebrations" className="roundArrow" aria-label="View celebration details">
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className="countdownSection" aria-labelledby="countdown-heading">
        <p className="eyebrow eyebrowLight">Until we say “I do”</p>
        <h2 id="countdown-heading">Our forever begins in</h2>
        <CountdownTimer />
      </section>

      <section className="introSection" id="celebrations">
        <p className="eyebrow">Save the dates</p>
        <h2>Two beautiful days.<br />One joyful beginning.</h2>
        <p className="sectionLead">
          We would be honoured by your presence as we celebrate our marriage and begin this new chapter together.
        </p>
      </section>

      <section className="events" id="venues" aria-label="Wedding events">
        <article className="eventCard eventCardWedding">
          <div className="eventNumber">01</div>
          <div className="eventBody">
            <p className="eventKicker">The wedding</p>
            <h3>Sunday, 13 September</h3>
            <div className="eventDetails">
              <div>
                <span className="detailLabel">Reception</span>
                <strong>11:00 AM</strong>
              </div>
              <div>
                <span className="detailLabel">Muhurtham</span>
                <strong>12:20 - 12:55 PM</strong>
              </div>
            </div>
            <div className="venueBlock">
              <p>Safa Convention Centre</p>
              <span>Mangalapuram Road, Thonnakkal<br />Thiruvananthapuram, Kerala 695317</span>
              <a className="mapLink" href={safaMapsUrl} target="_blank" rel="noreferrer">
                Get directions <span aria-hidden="true">↗</span>
              </a>
            </div>
            <CalendarLinks googleUrl={weddingCalendarUrl} />
          </div>
        </article>

        <article className="eventCard eventCardReception">
          <div className="eventNumber">02</div>
          <div className="eventBody">
            <p className="eventKicker">The reception</p>
            <h3>Tuesday, 15 September</h3>
            <div className="eventDetails">
              <div>
                <span className="detailLabel">Celebrations</span>
                <strong>From 5:00 PM</strong>
              </div>
            </div>
            <div className="venueBlock">
              <p>RDR Convention Centre</p>
              <span>Kochar Road, Edapazhanji<br />Thiruvananthapuram, Kerala 695014</span>
              <a className="mapLink" href={rdrMapsUrl} target="_blank" rel="noreferrer">
                Get directions <span aria-hidden="true">↗</span>
              </a>
            </div>
            <CalendarLinks googleUrl={receptionCalendarUrl} />
          </div>
        </article>
      </section>

      <section className="familySection" id="families">
        <div className="familyCopy">
          <p className="eyebrow eyebrowLight">With full hearts</p>
          <h2>Our families joyfully invite you.</h2>
          <p>
            Your love, laughter, and blessings will make our celebrations complete.
          </p>
        </div>
        <div className="familyNames">
          <div>
            <span>Parents of the groom</span>
            <p>Raju T &amp; Vanaja N.K</p>
            <small>Sarovaram, Kuravankonam, Kowdiar</small>
          </div>
          <div>
            <span>Parents of the bride</span>
            <p>K. Sasi Ambady &amp; Indhulekha Sasi</p>
            <small>Ambady, Kurakkada, Korani</small>
          </div>
          <div>
            <span>Sharing the happiness</span>
            <p>Sanjay R.V</p>
          </div>
        </div>
      </section>

      <footer>
        <p className="footerNames">Renjay <span>&amp;</span> Akhila</p>
        <p>We can’t wait to celebrate with you.</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </main>
  );
}
