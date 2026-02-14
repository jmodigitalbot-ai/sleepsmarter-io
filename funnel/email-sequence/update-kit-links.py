#!/usr/bin/env python3
"""
Script to update Kit email link placeholders with actual URLs
"""

import re

# Define the replacements
replacements = {
    'MASTERCLASS_LINK_TBD': 'https://originalitymarketing.mysamcart.com/checkout/sleep-smarter-masterclass#samcart-slide-open-right',
    'PREMIUM_LINK_TBD': 'https://originalitymarketing.mysamcart.com/checkout/90-day-sleep-transformation#samcart-slide-open-right',
    'MEMBERSHIP_LINK_TBD': 'https://originalitymarketing.mysamcart.com/checkout/sleep-smarter-insider#samcart-slide-open-right'
}

# Read the file
with open('KIT-COPY-PASTE-GUIDE.md', 'r') as f:
    content = f.read()

# Replace all placeholders
for placeholder, url in replacements.items():
    content = content.replace(placeholder, url)

# Write the updated content back
with open('KIT-COPY-PASTE-GUIDE.md', 'w') as f:
    f.write(content)

print("Updated KIT-COPY-PASTE-GUIDE.md with actual URLs:")
for placeholder, url in replacements.items():
    print(f"  {placeholder} → {url}")