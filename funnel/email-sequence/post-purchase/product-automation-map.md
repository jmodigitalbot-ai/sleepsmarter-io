# Sleep Smarter Product Automation Map

Date: 2026-08-27  
Status: Draft for Kit/SamCart setup. Do not activate until credentials and test purchases are verified.

## Products

| Product | Price | Sales page | SamCart checkout slug | Buyer tag | Suppression rule |
|---|---:|---|---|---|---|
| The Forgotten Sleep Ritual | $17 | `/sleep-reset` | `the-forgotten-sleep-ritual` | `purchased-forgotten-sleep-ritual` | Stop remaining tripwire pitch emails; move to buyer sequence. |
| Sleep Smarter Masterclass | $67 | `/masterclass` | `the-sleep-smarter-masterclass` | `purchased-sleep-smarter-masterclass` | Stop core-offer pitch emails; move to premium/implementation track. |
| 90-Day Sleep Transformation Program | $197 | `/premium` | `90-day-sleep-transformation-program` | `purchased-90-day-sleep-transformation` | Stop all product pitch emails; move to onboarding/check-in track. |
| Sleep Smarter Insider | $19/mo | `/insider` | `sleep-smarter-insider` | `purchased-sleep-smarter-insider` | Stop membership pitch emails; move to member onboarding/retention. |

## Lead entry points

### Quiz funnel

- Route: `/quiz`
- Component: `EmailCaptureQuiz.tsx`
- Kit form: `9066532`
- Fields sent:
  - `sleep_persona`
  - `persona_name`
  - `quiz_source = quiz_funnel_v2`
- Routing:
  - `cant_fall_asleep` → Racing Mind sequence
  - `cant_stay_asleep` → Fragmented Sleeper sequence
  - `never_feel_rested` → Poor Recoverer sequence
  - `exhausted_but_wired` → Circadian Mismatch sequence

### Calculator / assessment funnel

- Route: `/` or `/calculator` → `/assessment`
- Component: `EmailCapture.tsx`
- Kit form: `9066532`
- Fields sent:
  - `calculator_mode`
  - `target_time`
  - `results_json`
  - `optimal_time`
  - `cycles_preferred`
  - assessment/persona fields when available
- Thank-you route: `/thank-you`
- Delivery fallback: `/sleep-blueprint.pdf`

## Kit automation rules

1. On form `9066532` subscribe:
   - Add tag `quiz-subscriber` or `calculator-subscriber` based on source field.
   - Branch by `sleep_persona` when present.
   - Send the correct 7-email quiz sequence if quiz source exists.
   - Otherwise send the main 30-day nurture sequence.

2. On tripwire purchase:
   - Add tag `purchased-forgotten-sleep-ritual`.
   - Remove/suppress tripwire pitch emails from main and quiz sequences.
   - Subscribe to `Forgotten Sleep Ritual — Buyer Onboarding + Upsell`.

3. On Masterclass purchase:
   - Add tag `purchased-sleep-smarter-masterclass`.
   - Suppress core-offer emails and product reminders for the Masterclass.
   - Subscribe to Masterclass delivery/onboarding sequence.

4. On Premium purchase:
   - Add tag `purchased-90-day-sleep-transformation`.
   - Suppress all sales pitch sequences except onboarding and delivery.
   - Subscribe to the 90-day weekly implementation sequence.

5. On Insider signup:
   - Add tag `purchased-sleep-smarter-insider`.
   - Suppress membership pitch emails.
   - Subscribe to Insider onboarding and monthly content delivery.

## Verification before activation

- Kit API authentication returns 200 for forms, sequences, and tags.
- Test subscriber receives correct sequence based on `sleep_persona`.
- Test purchase adds the right buyer tag.
- Buyer tags suppress future pitches for purchased products.
- All checkout URLs return HTTP 200.
- All emails render merge tags correctly.
- Unsubscribe link is present on every live Kit email.
