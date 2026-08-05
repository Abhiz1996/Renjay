"use client";

import { useEffect, useState, type CSSProperties } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const weddingCalendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding%20of%20Dr.%20Renjay%20R.V%20%26%20Dr.%20Akhila%20J%20Sasi&dates=20260913T053000Z%2F20260913T073000Z&details=Reception%20at%2011%3A00%20AM.%20Muhurtham%20between%2012%3A20%20PM%20and%2012%3A55%20PM.&location=Safa%20Convention%20Centre%2C%20Mangalapuram%20Road%2C%20Thonnakkal%2C%20Kerala%20695317";

const receptionCalendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding%20Reception%20of%20Dr.%20Renjay%20R.V%20%26%20Dr.%20Akhila%20J%20Sasi&dates=20260915T113000Z%2F20260915T153000Z&details=Wedding%20reception%20from%205%3A00%20PM%20onwards.&location=RDR%20Convention%20Centre%2C%20Kochar%20Road%2C%20Edapazhanji%2C%20Thiruvananthapuram%2C%20Kerala%20695014";

const safaMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Safa%20Convention%20Centre%2C%20Mangalapuram%20Road%2C%20Thonnakkal%2C%20Kerala%20695317";

const rdrMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=RDR%20Convention%20Centre%2C%20Kochar%20Road%2C%20Edapazhanji%2C%20Thiruvananthapuram%2C%20Kerala%20695014";

function GoogleCalendarLink({ googleUrl }: { googleUrl: string }) {
  return (
    <div className="eventActions">
      <a href={googleUrl} target="_blank" rel="noreferrer" className="button buttonSolid">
        Add to Google Calendar
      </a>
    </div>
  );
}

function InvitationOpening() {
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.classList.add("invitationLocked");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const openingTimer = window.setTimeout(() => setOpening(true), reduceMotion ? 0 : 700);
    const revealTimer = window.setTimeout(() => {
      document.body.classList.remove("invitationLocked");
      setVisible(false);
      window.requestAnimationFrame(() => document.getElementById("invitation-title")?.focus());
    }, reduceMotion ? 50 : 2150);

    return () => {
      window.clearTimeout(openingTimer);
      window.clearTimeout(revealTimer);
      document.body.classList.remove("invitationLocked");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`openingScreen${opening ? " openingScreenActive" : ""}`}
      aria-label="Opening wedding invitation"
    >
      <div className="openingPanel openingPanelLeft" aria-hidden="true">
        <span className="panelLine" />
      </div>
      <div className="openingPanel openingPanelRight" aria-hidden="true">
        <span className="panelLine" />
      </div>
      <div className="openingGlow" aria-hidden="true" />
      <div className="openingSparkles" aria-hidden="true">
        {Array.from({ length: 10 }, (_, index) => <span key={index} />)}
      </div>
      <div className="openingContent">
        <p className="openingEyebrow">You are joyfully invited</p>
        <div className="openingSeal" aria-hidden="true">
          R <span>&amp;</span> A
        </div>
        <h2 id="opening-title">
          <span className="openingName">Renjay</span>
          <span className="openingAmpersand">&amp;</span>
          <span className="openingName">Akhila</span>
        </h2>
        <p className="openingDate">13 · 09 · 2026</p>
        <div className="openingAutoCue" aria-live="polite">
          <span>Opening invitation</span>
          <i aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function CelebrationMoment() {
  const [noteOpen, setNoteOpen] = useState(false);
  const [blessingCount, setBlessingCount] = useState(0);
  const [fireworkCount, setFireworkCount] = useState(0);

  const fireworks = [
    { x: "12%", y: "30%", delay: "0ms", color: "#c5a05d" },
    { x: "36%", y: "18%", delay: "160ms", color: "#c98691" },
    { x: "63%", y: "26%", delay: "320ms", color: "#f7f0e5" },
    { x: "86%", y: "16%", delay: "480ms", color: "#c5a05d" },
    { x: "76%", y: "62%", delay: "650ms", color: "#c98691" },
  ];

  const sendBlessing = () => {
    setBlessingCount((count) => count + 1);
  };

  return (
    <section className="celebrationSection" id="blessings">
      <div className="ambientLights" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <span key={index} />)}
      </div>
      {fireworkCount > 0 && (
        <div className="fireworkDisplay" key={fireworkCount} aria-hidden="true">
          {fireworks.map((firework, fireworkIndex) => (
            <span
              className="firework"
              key={fireworkIndex}
              style={{
                "--firework-x": firework.x,
                "--firework-y": firework.y,
                "--firework-delay": firework.delay,
                "--firework-color": firework.color,
              } as CSSProperties}
            >
              {Array.from({ length: 12 }, (_, sparkIndex) => (
                <span
                  className="fireworkSpark"
                  key={sparkIndex}
                  style={{ "--spark-index": sparkIndex } as CSSProperties}
                />
              ))}
            </span>
          ))}
        </div>
      )}
      <div className="celebrationIntro">
        <p className="eyebrow eyebrowLight">A little moment for you</p>
        <h2>Your presence is our favourite gift.</h2>
        <p>Tap the card for a note from us, then send a little love our way.</p>
      </div>

      <div className="interactivePanel">
        <button
          type="button"
          className={`noteCard${noteOpen ? " noteCardOpen" : ""}`}
          onClick={() => setNoteOpen((open) => !open)}
          aria-expanded={noteOpen}
        >
          <span className="noteCardTopline">
            <span>{noteOpen ? "A note from us" : "Tap to reveal a note"}</span>
            <span className="noteToggle" aria-hidden="true">+</span>
          </span>
          <span className="noteMessage">
            Come for the vows, stay for the laughter, and leave with a heart full of memories.
          </span>
          <span className="noteSignature">With love, Renjay &amp; Akhila</span>
        </button>

        <div className="blessingArea">
          <div className="celebrationButtons">
            <div className="burstStage">
              {blessingCount > 0 && (
                <div className="particleBurst" key={blessingCount} aria-hidden="true">
                  {Array.from({ length: 16 }, (_, index) => (
                    <span
                      className="loveParticle"
                      key={index}
                      style={{ "--particle-index": index } as CSSProperties}
                    >
                      {index % 3 === 0 ? "♥" : "✦"}
                    </span>
                  ))}
                </div>
              )}
              <button type="button" className="blessingButton" onClick={sendBlessing}>
                <span aria-hidden="true">♥</span>
                {blessingCount === 0 ? "Send your blessings" : "Send more love"}
              </button>
            </div>
            <button
              type="button"
              className="fireworkButton"
              onClick={() => setFireworkCount((count) => count + 1)}
            >
              <span aria-hidden="true">✦</span>
              Light the sky
            </button>
          </div>
          <p className="blessingStatus" aria-live="polite">
            {blessingCount === 0
              ? "One tap, one little shower of love."
              : blessingCount === 1
                ? "Your blessings mean the world to us."
                : `${blessingCount} showers of love — our hearts are full.`}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <InvitationOpening />
      <header className="siteHeader">
        <a className="monogram" href="#home" aria-label="Renjay and Akhila - home">
          R<span>&amp;</span>A
        </a>
        <nav aria-label="Wedding invitation navigation">
          <a href="#celebrations">Celebrations</a>
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
          <div className="heroSparkles" aria-hidden="true">
            {Array.from({ length: 9 }, (_, index) => <span key={index} />)}
          </div>
          <p className="eyebrow">A celebration of love &amp; togetherness</p>
          <div className="heroNames">
            <h1 id="invitation-title" tabIndex={-1}>
              Dr. Renjay
              <span className="nameAmpersand">&amp;</span>
              Dr. Akhila
            </h1>
          </div>
          <p className="heroIntro">
            With joyful hearts, we invite you to share the day we begin our forever.
          </p>
          <div className="heroDateBlock">
            <span>Sunday</span>
            <strong>13</strong>
            <span>September 2026</span>
          </div>
          <div className="heroWeddingDetails" aria-label="Wedding details">
            <div className="heroTimings">
              <div>
                <span>Reception</span>
                <strong>11:00 AM</strong>
              </div>
              <div>
                <span>Muhurtham</span>
                <strong>12:20 – 12:55 PM</strong>
              </div>
            </div>
            <div className="heroVenue">
              <strong>Safa Convention Centre</strong>
              <span>Mangalapuram Road, Thonnakkal<br />Thiruvananthapuram, Kerala 695317</span>
            </div>
            <div className="heroActions">
              <a href={safaMapsUrl} target="_blank" rel="noreferrer" className="heroActionLink">
                Get directions <span aria-hidden="true">↗</span>
              </a>
              <a href={weddingCalendarUrl} target="_blank" rel="noreferrer" className="button buttonSolid">
                Add to Google Calendar
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="introSection" id="celebrations">
        <p className="eyebrow">Save the dates</p>
        <h2>Two beautiful days.<br />One joyful beginning.</h2>
        <p className="sectionLead">
          We would be honoured by your presence as we celebrate our marriage and begin this new chapter together.
        </p>
      </section>

      <section className="events" id="venues" aria-label="Wedding events">
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
            <GoogleCalendarLink googleUrl={receptionCalendarUrl} />
          </div>
        </article>
      </section>

      <CelebrationMoment />

      <footer>
        <p className="footerNames">Renjay <span>&amp;</span> Akhila</p>
        <p>We can’t wait to celebrate with you.</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </main>
  );
}
