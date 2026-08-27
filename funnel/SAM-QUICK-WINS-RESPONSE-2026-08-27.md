# Sleep Smarter — SAM Quick Wins Response

Date: 2026-08-27  
Owner: KARR  
Status: Local fixes and launch pack prepared. No public deploy, Kit activation, SamCart edits, or social publishing performed.

## Executive take

SAM is directionally right on the leverage: the quiz, calculator, and blog library should feed owned revenue and email capture. But several claims in SAM's analysis were stale or wrong against the actual repo:

- Sleep Smarter does have owned product assets and sales pages already set up.
- The quiz already has an email gate before results.
- The calculator routes users into the assessment/blueprint path instead of staying a pure dead end.
- The Kit API credential currently fails authentication, so live sequence/subscriber work is blocked until Kit is reconnected.
- The old Railway PDF service URL returns `404 Application not found`; the frontend now falls back to the static PDF unless a working `VITE_PDF_SERVICE_URL` is configured.

## Product coverage

| Product | Price | Local page/source | Checkout status checked | Current disposition |
|---|---:|---|---|---|
| The Forgotten Sleep Ritual | $17 | `app/src/pages/SleepReset.tsx`; product asset in `funnel/tripwire/forgotten-sleep-ritual.pdf`; mockups in `app/public/images/products/` | SamCart slug `the-forgotten-sleep-ritual` returned HTTP 200 | Primary post-quiz tripwire. Copy sanitized for unsupported proof/urgency. |
| Sleep Smarter Masterclass | $67 | `app/src/pages/MasterclassSales.tsx`; `masterclass/masterclass-sales-copy.md`; hero image exists | SamCart slug `the-sleep-smarter-masterclass` returned HTTP 200 | Core offer exists. Copy sanitized for unsupported founder/student/community claims. |
| 90-Day Sleep Transformation Program | $197 | `app/src/pages/PremiumSales.tsx`; `90-day-sleep-transformation-premium-program.md`; `premium-*` docs | SamCart slug `90-day-sleep-transformation-program` returned HTTP 200 | Premium offer exists. Copy softened around guarantees and outcome certainty. |
| Sleep Smarter Insider | $19/mo | `app/src/pages/InsiderSales.tsx`; `sleep-smarter-insider-membership.md`; `insider-*` docs | SamCart slug `sleep-smarter-insider` returned HTTP 200 | Membership offer exists. Copy changed to avoid unsupported tested/reviewed/archives/guarantee language. |

## Email-flow coverage

| Flow | Source files | Status |
|---|---|---|
| Main 30-day nurture | `funnel/email-sequence/phase-1-value.md` through `phase-5-premium.md`; `KIT-COPY-PASTE-GUIDE.md` | Source placeholders are filled. Sender/signatures sanitized from fictional `Dr. Sarah Chen` persona to Sleep Smarter. Product links updated to current valid slugs/pages. |
| Quiz segmented sequences | `funnel/email-sequence/quiz-sequences/*.md` | Four 7-email sequences exist for all quiz sleep types. Sender/signatures sanitized. Setup guide updated to Sleep Smarter sender identity. |
| Tripwire buyer sequence | `funnel/email-sequence/post-purchase/forgotten-sleep-ritual-buyer-sequence.md` | New 4-email post-purchase draft created for Day 0, 1, 3, 7 upsell/nurture. Needs import into Kit after reconnect. |
| Product automation map | `funnel/email-sequence/post-purchase/product-automation-map.md` | New operational map created for all products, tags, suppression rules, and approval-gated setup steps. |

## SAM Quick Win #1 — Paid sleep guide

Verdict: already exists, but the offer needed cleanup.

Implemented locally:

- Confirmed the $17 tripwire page exists at `/sleep-reset`.
- Confirmed the SamCart product slug `the-forgotten-sleep-ritual` responds with HTTP 200.
- Confirmed the tripwire PDF and mockups exist locally.
- Removed unsupported founder/backstory framing from the live sales-page source.
- Removed fake/unsupported customer testimonial block from the sales-page source.
- Replaced fake urgency (`Today Only Bonus`) with `Launch Bonus`.
- Softened guarantee language so it sells usefulness/refund policy instead of implying guaranteed sleep outcomes.

Still approval-gated:

- Confirm the SamCart checkout product is configured with the correct file delivery, price, refund policy, and order bump.
- Deploy the local sales-page copy fixes.
- Run a real test checkout in SamCart sandbox/test mode if available.

## SAM Quick Win #2 — Capture emails from quiz/calculator users

Verdict: partially built; live provider connection is blocked.

Verified:

- Quiz route exists at `/quiz`.
- Quiz email gate exists via `EmailCaptureQuiz.tsx` and posts to Kit form `9066532`.
- Calculator exists and routes users into `/assessment` for personalized blueprint capture.
- `EmailCapture.tsx` posts calculator/assessment fields into Kit form `9066532`.
- Thank-you page exists at `/thank-you` and delivers the static fallback PDF at `/sleep-blueprint.pdf`.
- Static fallback PDF exists in `app/public/sleep-blueprint.pdf`.

Fixed locally:

- Removed hard-coded dead Railway PDF service usage. Personalized PDF calls now require `VITE_PDF_SERVICE_URL`; otherwise the site falls back to the static PDF.
- Preserved the email capture flow so broken personalized PDF infrastructure does not block lead capture.

Blocked:

- Kit credential in `/Users/jmodigital/.config/kitt/kit-api.json` returns HTTP 401 against Kit API v4.
- Cannot read subscriber count, create/update live sequences, or validate live automations until Kit is reconnected.

## SAM Quick Win #3 — Blog-to-social repurposing

Verdict: good idea, but should feed the quiz/calculator, not become another random content treadmill.

Implemented locally:

- Created `funnel/social/blog-to-social-pipeline-2026-08-27.md` with the first repurposing queue and Week 1 scripts.
- First priority posts are tied to proven funnel entry points:
  - 3 AM waking / cortisol
  - sleep tracker anxiety / orthosomnia
  - caffeine timing
  - sleep temperature
  - sleep debt
  - pregnancy sleep
  - sleep for athletes
  - valerian root
  - sleep and mental health
  - white noise machines

Still approval-gated:

- Pick one social platform to start. Recommendation: X first, because it is easiest to ship without video production drag.
- Connect/schedule only after Jason approves the first batch and account access is clean.

## Connection gaps

| Service | Verified status | Next action |
|---|---|---|
| Kit | Config file exists, but API returns HTTP 401 Authentication Failed | Reconnect/regenerate Kit API credential, then import/sync sequences and test form routing. |
| SamCart | Public checkout pages for current product slugs return HTTP 200; no local SamCart API credential found | Reconnect SamCart token before revenue reporting or product configuration automation. |
| Google Ads/GTM | App has GA4 `G-HMNWV4K76J`, Ads `AW-17966119562`, and GTM `GTM-5VH27DL3`; no `GTM-XXXXXXX` in active app source | Verify conversion actions in Google Ads/GA4 UI after deploy. |
| Social accounts | No scheduler connection verified in this pass | Start with draft queue only. Do not publish until account and voice are approved. |
| PDF generator | Old Railway URL returns `404 Application not found` | Either deploy a working generator and set `VITE_PDF_SERVICE_URL`, or keep static PDF fallback as Phase 1. |

## Launch order I recommend

1. Deploy the local compliance/copy fixes.
2. Reconnect Kit and import/update the quiz sequences, main nurture, and buyer sequence.
3. Test quiz opt-in and calculator/assessment opt-in end-to-end with a real inbox.
4. Confirm SamCart checkout delivery and order bump for all four products.
5. Add SamCart purchase tags into Kit:
   - `purchased-forgotten-sleep-ritual`
   - `purchased-sleep-smarter-masterclass`
   - `purchased-90-day-sleep-transformation`
   - `purchased-sleep-smarter-insider`
6. Turn on the social repurposing pipeline after the owned funnel is verified.

## Do not do yet

- Do not activate emails until Kit authentication and test subscribers are verified.
- Do not publish social content until we pick the platform and approve the first style batch.
- Do not rely on the dead Railway PDF generator.
- Do not keep fake founder/student/testimonial language live. The local source is now cleaned up; production still needs deploy verification.
