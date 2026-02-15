# Email Link Update Checklist
**Date:** 2026-02-14  
**Status:** 14 emails need link updates

## 📧 Emails Requiring Link Updates

### **Phase 1: Value (Day 0)**
- [ ] **Email 0 (Day 0)**: Blueprint download link
  - **Current:** `[Download Your Sleep Blueprint →](link)`
  - **Update to:** `[Download Your Sleep Blueprint →](https://www.sleepsmarter.io/blueprint/download)`
  - **File:** `phase-1-value.md` line 27

### **Phase 2: Tripwire (Days 9-10)**
- [ ] **Email 9 (Day 9)**: Tripwire purchase link
  - **Current:** `[Get the 7-Day Sleep Reset Protocol → $17](link)`
  - **Update to:** `[Get the 7-Day Sleep Reset Protocol → $17](https://originalitymarketing.mysamcart.com/checkout/the-7-day-sleep-reset-protocol-transform-your-sleep-in-one-week#samcart-slide-open-right)`
  - **File:** `phase-2-tripwire.md` line 94

- [ ] **Email 10 (Day 10)**: Tripwire purchase link #1
  - **Current:** `[Get the 7-Day Sleep Reset Protocol → $17](link)`
  - **Update to:** Same URL as above
  - **File:** `phase-2-tripwire.md` line 140

- [ ] **Email 10 (Day 10)**: Tripwire purchase link #2
  - **Current:** `[Get Instant Access → $17](link)`
  - **Update to:** Same URL as above
  - **File:** `phase-2-tripwire.md` line 193

- [ ] **Email 10 (Day 10)**: Tripwire purchase link #3
  - **Current:** `[Get Instant Access → $17](link)`
  - **Update to:** Same URL as above
  - **File:** `phase-2-tripwire.md` line 224

- [ ] **Email 10 (Day 10)**: Tripwire purchase link #4
  - **Current:** `[Yes, I want better sleep → $17](link)`
  - **Update to:** Same URL as above
  - **File:** `phase-2-tripwire.md` line 237

### **Phase 4: Core Offer (Days 19-22)**
- [ ] **Email 19 (Day 19)**: Masterclass purchase link
  - **Current:** `[Enroll in the Sleep Smarter Masterclass → $67](link)`
  - **Update to:** `[Enroll in the Sleep Smarter Masterclass → $67](https://originalitymarketing.mysamcart.com/checkout/sleep-smarter-masterclass#samcart-slide-open-right)`
  - **File:** `phase-4-core-offer.md` line 96

- [ ] **Email 20 (Day 20)**: Masterclass purchase link
  - **Current:** `[Find your specific change → $67](link)`
  - **Update to:** Same URL as above
  - **File:** `phase-4-core-offer.md` line 129

- [ ] **Email 21 (Day 21)**: Masterclass purchase link
  - **Current:** `[Get Lifetime Access → $67](link)`
  - **Update to:** Same URL as above
  - **File:** `phase-4-core-offer.md` line 166

- [ ] **Email 22 (Day 22)**: Masterclass purchase link
  - **Current:** `[Lock in the $67 price → Enroll now](link)`
  - **Update to:** Same URL as above
  - **File:** `phase-4-core-offer.md` line 209

### **Phase 5: Premium Offer (Days 24, 26, 30)**
- [ ] **Email 24 (Day 24)**: Premium offer link
  - **Current:** `[Start Your 90-Day Transformation → $197](link)`
  - **Update to:** `[Start Your 90-Day Transformation → $197](https://originalitymarketing.mysamcart.com/checkout/90-day-sleep-transformation#samcart-slide-open-right)`
  - **File:** `phase-5-premium.md` line 77

- [ ] **Email 26 (Day 26)**: Membership offer link #1
  - **Current:** `[Join the Sleep Smarter Insider → $19/mo](link)`
  - **Update to:** `[Join the Sleep Smarter Insider → $19/mo](https://originalitymarketing.mysamcart.com/checkout/sleep-smarter-insider#samcart-slide-open-right)`
  - **File:** `phase-5-premium.md` line 118

- [ ] **Email 26 (Day 26)**: Membership offer link #2
  - **Current:** `[Get the full guide + monthly optimizations → $19/mo](link)`
  - **Update to:** Same URL as above
  - **File:** `phase-5-premium.md` line 154

- [ ] **Email 30 (Day 30)**: Summary links (4 links)
  - **Current:** All `(link)` placeholders
  - **Update to:** Respective SamCart URLs
  - **File:** `phase-5-premium.md` lines 285, 291, 297, 303

## 🔧 Update Instructions

### **Option 1: Manual Update**
1. Open each phase file listed above
2. Find the line number
3. Replace `(link)` with the correct URL
4. Save file

### **Option 2: Script Update**
1. Navigate to email-sequence directory:
   ```bash
   cd projects/utility-website-portfolio/sleepsmarter.io/funnel/email-sequence
   ```
2. Run the update script:
   ```bash
   python3 update-kit-links.py
   ```
3. Verify updates in KIT-COPY-PASTE-GUIDE.md

### **Option 3: Bulk Find & Replace**
Use text editor with find/replace across all phase files:
- Find: `](link)`
- Replace with appropriate URL based on context

## ✅ Verification Steps

After updating:

1. **Check KIT-COPY-PASTE-GUIDE.md** - Should have all URLs updated
2. **Check each phase file** - No `(link)` placeholders should remain
3. **Test in Kit UI** - Load one email to verify link works
4. **Click test** - Verify URL redirects to correct SamCart page

## ⚠️ Important Notes

1. **Email 0** needs special URL: PDF delivery page (not SamCart)
2. **Tripwire emails** all use same URL: 7-Day Sleep Reset Protocol
3. **Masterclass emails** all use same URL: Sleep Smarter Masterclass
4. **Premium emails** use two different URLs: $197 product and $19/mo product
5. **Email 30** has 4 different product links - update each correctly

## 📊 Update Status Tracker

**Last Checked:** 2026-02-14  
**Total Emails Needing Updates:** 14  
**Files to Update:** 5 (phase-1 through phase-5)

| Phase | Emails Fixed | Status |
|-------|--------------|--------|
| Phase 1 | 0/1 | ❌ Not started |
| Phase 2 | 0/5 | ❌ Not started |
| Phase 3 | 0/0 | ✅ None needed |
| Phase 4 | 0/4 | ❌ Not started |
| Phase 5 | 0/4 | ❌ Not started |

**Overall:** 0/14 updated (0%)

## 🚨 Urgency

**HIGH PRIORITY** - If emails are reloaded into Kit with `(link)` placeholders, subscribers will receive broken links, damaging trust and conversion rates.

**Estimated time to fix:** 15-30 minutes  
**Risk if not fixed:** Broken customer experience, lost sales