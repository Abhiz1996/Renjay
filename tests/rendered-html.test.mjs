import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the wedding invitation", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Renjay &amp; Akhila \| Wedding Invitation<\/title>/i);
  assert.match(html, /Renjay/);
  assert.match(html, /Akhila/);
  assert.match(html, /Opening invitation/);
  assert.match(html, /Dr\. Renjay/);
  assert.match(html, /Dr\. Akhila/);
  assert.match(html, /13 September 2026/);
  assert.match(html, /Safa Convention Centre/);
  assert.match(html, /RDR Convention Centre/);
  assert.match(html, /Add to Google Calendar/);
  assert.match(html, /Counting down to our day/);
  assert.match(html, /The celebration begins in/);
  assert.doesNotMatch(html, /href="#blessings">A note/);
  assert.doesNotMatch(html, /Parents of the groom|Parents of the bride|Sharing the happiness/);
  assert.doesNotMatch(html, /Your presence is our favourite gift|Tap to reveal a note|Send your blessings|Light the sky/);
  assert.doesNotMatch(html, /Until we say|Download calendar file|eventCardWedding/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});
