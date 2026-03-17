# Kit Setup Guide — Sleep Quiz Funnel Email Sequences

This guide explains how to configure the 4 segmented 7-email sequences in Kit (ConvertKit) for the sleepsmarter.io quiz funnel.

---

## Overview

- **Quiz form ID:** 9066532 (sleepsmarter.io/quiz)
- **Custom field:** `sleep_persona` (set on quiz results page)
- **Field values:** `cant_fall_asleep` | `cant_stay_asleep` | `never_feel_rested` | `exhausted_but_wired`
- **Sequence files:**
  - `racing-mind-sequence.md` → `cant_fall_asleep`
  - `fragmented-sleeper-sequence.md` → `cant_stay_asleep`
  - `poor-recoverer-sequence.md` → `never_feel_rested`
  - `circadian-mismatch-sequence.md` → `exhausted_but_wired`
- **After Day 7:** Subscribers roll into the existing 31-email shared nurture sequence

---

## Step 1: Create the 4 Sequences in Kit

### For each sequence:

1. Go to **Automations → Sequences** in Kit
2. Click **New Sequence**
3. Name each sequence:
   - `Quiz — Racing Mind Sleeper (cant_fall_asleep)`
   - `Quiz — Fragmented Sleeper (cant_stay_asleep)`
   - `Quiz — Poor Recoverer (never_feel_rested)`
   - `Quiz — Circadian Mismatch (exhausted_but_wired)`
4. Add 7 emails per sequence with the following send timing:

| Email # | Purpose | Send Timing |
|---------|---------|-------------|
| Email 1 | Welcome + Diagnosis | Immediately (0 days) |
| Email 2 | The WHY | 1 day after subscribe |
| Email 3 | The Mechanism | 2 days after subscribe |
| Email 4 | Story + Proof | 3 days after subscribe |
| Email 5 | Objection Handling | 4 days after subscribe |
| Email 6 | Direct Pitch | 5 days after subscribe |
| Email 7 | Last Chance | 7 days after subscribe |

5. For each email, set:
   - **Subject line** from the sequence file
   - **Preview text** from the sequence file (Kit calls this "Email preview text")
   - **From name:** Dr. Sarah Chen
   - **From email:** sarah@sleepsmarter.io
   - **Body copy** from the sequence file

### Formatting Notes
- Kit uses HTML editor or plain text — use plain text/minimal HTML for deliverability
- Merge tag for first name: `{{ subscriber.first_name }}` (Kit native syntax)
- CTAs: use a button block linking to `https://sleepsmarter.io/sleep-reset`

---

## Step 2: Build the Routing Automation

This automation triggers on form 9066532 subscribe, checks the `sleep_persona` field, and routes to the correct sequence.

### In Kit → Automations → New Visual Automation:

**Trigger:**
- Event: `Subscribes to a form`
- Form: `9066532` (Quiz form)

**Then add a Condition/Branch step:**
- Check: Custom field `sleep_persona`

**Branch 1:** `sleep_persona` is `cant_fall_asleep`
→ Add Action: **Subscribe to Sequence** → `Quiz — Racing Mind Sleeper`
→ Add Action: **Add Tag** → `sleep-type:racing-mind`

**Branch 2:** `sleep_persona` is `cant_stay_asleep`
→ Add Action: **Subscribe to Sequence** → `Quiz — Fragmented Sleeper`
→ Add Action: **Add Tag** → `sleep-type:fragmented`

**Branch 3:** `sleep_persona` is `never_feel_rested`
→ Add Action: **Subscribe to Sequence** → `Quiz — Poor Recoverer`
→ Add Action: **Add Tag** → `sleep-type:poor-recoverer`

**Branch 4:** `sleep_persona` is `exhausted_but_wired`
→ Add Action: **Subscribe to Sequence** → `Quiz — Circadian Mismatch`
→ Add Action: **Add Tag** → `sleep-type:circadian-mismatch`

**Fallback (no match / field empty):**
→ Add Action: **Add Tag** → `sleep-type:unclassified`
→ Optional: route to a default sequence or send a manual follow-up

### Visual Flow Diagram
```
[Form 9066532 Subscribe]
        ↓
[Check: sleep_persona field]
    ↙    ↙    ↘    ↘
 CFA  CSA  NFR  EBW
  ↓    ↓    ↓    ↓
[Seq1][Seq2][Seq3][Seq4]
  ↓    ↓    ↓    ↓
[Tag sleep-type:X]
```

---

## Step 3: Tag quiz-sequence-complete and Add to Main Nurture

After each sequence completes (Day 7 email sent), you need to:
1. Tag the subscriber `quiz-sequence-complete`
2. Add them to the main 31-email nurture sequence

### Method: Add an 8th "transition" step in each sequence

In each of the 4 sequences, after Email 7, do NOT add an Email 8. Instead, use Kit's **Automation Trigger** at the end of the sequence:

**Option A — Using Visual Automation (Recommended):**

After each sequence's subscribe action in your routing automation, add a **Wait** step:
- Wait: 8 days (1 day after Email 7 sends)

Then add:
- Action: **Add Tag** → `quiz-sequence-complete`
- Action: **Subscribe to Sequence** → `[Your main 31-email nurture sequence name]`

This ensures subscribers complete the full 7-day quiz sequence before entering nurture.

**Option B — Using a Completion Automation:**

Create a separate automation:
- Trigger: `Completes a sequence` → select each quiz sequence
- Action: **Add Tag** → `quiz-sequence-complete`
- Action: **Subscribe to Sequence** → main nurture sequence

Note: Run this as 4 separate automations (one per quiz sequence) OR use the "any of these sequences" trigger if your Kit plan supports it.

### Prevent Nurture Duplication

If subscribers could enter the main nurture sequence through other flows (lead magnets, opt-ins), add a condition before the nurture subscribe action:
- Condition: Does NOT have tag `quiz-sequence-complete`
- If true: subscribe to nurture
- If false: skip (already in or completed nurture)

---

## Step 4: Conversion Tracking Tags (Optional but Recommended)

Add these tags via automation to track funnel performance:

| Event | Tag to Add |
|-------|-----------|
| Quiz form subscribe | `quiz-subscriber` |
| Routed to any quiz sequence | `quiz-sequence-started` |
| Clicked /sleep-reset in any email | `clicked-sales-page` (set via Kit link trigger) |
| Purchased (post-purchase webhook) | `purchased-forgotten-sleep-ritual` |
| Completed quiz sequence, not purchased | `quiz-sequence-complete-no-purchase` |

To track link clicks in Kit: in each CTA email, use a **Link Trigger** on the `/sleep-reset` URL to add the `clicked-sales-page` tag automatically.

---

## Quick Checklist

- [ ] Create 4 sequences with correct names
- [ ] Import all 28 emails with correct subjects, preview text, and timing
- [ ] Set From: Dr. Sarah Chen / sarah@sleepsmarter.io on all emails
- [ ] Build routing automation on form 9066532
- [ ] Test with a real email address for each sleep_persona value
- [ ] Set up quiz-sequence-complete tag + nurture handoff
- [ ] Add link triggers on /sleep-reset CTAs for click tracking
- [ ] Verify merge tags render correctly in test sends

---

## Notes

- Kit's `{{ subscriber.first_name }}` is the correct merge tag syntax — no changes needed
- All sequences use the same From identity (Dr. Sarah Chen) for consistency
- The 31-email main nurture sequence should begin on "Day 1 after completion" timing to avoid a gap
- If a subscriber purchases during the 7-day sequence, use the `purchased-forgotten-sleep-ritual` tag to suppress remaining pitch emails (Emails 5, 6, 7) by adding a condition to those emails in the sequence
