# Sleep Smarter Kit Ops

Purpose-specific Kit automation lives at:

`/Users/jmodigital/.hermes/scripts/sleepsmarter_kit_ops.py`

## Why this exists

Kit is connected through Hermes MCP OAuth. The legacy direct Kit API file at `~/.config/kitt/kit-api.json` is stale and should not be treated as the active automation path.

The Kit MCP server normally stays configured as:

`mcp_servers.kit.trust = untrusted`

That is intentional. It prevents broad unattended agent writes against Kit.

This script opens a short, controlled `trust: full` window only for one fresh Hermes CLI run, performs a narrow allowlisted Kit operation, writes a PII-safe snapshot, and restores the previous trust value in a `finally` block.

## Supported modes

### Read-only audit

```bash
python3 /Users/jmodigital/.hermes/scripts/sleepsmarter_kit_ops.py audit
```

Reads only:

- account
- forms
- tags
- sequences
- webhooks
- Kit Commerce products
- Kit purchases

Output snapshots:

`/Users/jmodigital/clawd/projects/utility-website-portfolio/sleepsmarter.io/reports/kit/YYYY-MM-DD/`

No subscriber emails or PII should be printed.

### Ensure tags

Dry run:

```bash
python3 /Users/jmodigital/.hermes/scripts/sleepsmarter_kit_ops.py ensure-tags \
  --tag "sleep-smarter-lead" \
  --tag "sleep-blueprint-downloaded"
```

Apply:

```bash
python3 /Users/jmodigital/.hermes/scripts/sleepsmarter_kit_ops.py ensure-tags \
  --tag "sleep-smarter-lead" \
  --tag "sleep-blueprint-downloaded" \
  --apply
```

Only creates/upserts the named tags. It does not rename, merge, or delete tags.

### Create draft broadcast

Dry run:

```bash
python3 /Users/jmodigital/.hermes/scripts/sleepsmarter_kit_ops.py draft-broadcast \
  --subject "Subject here" \
  --preview-text "Preview here" \
  --body-file /path/to/body.html
```

Apply:

```bash
python3 /Users/jmodigital/.hermes/scripts/sleepsmarter_kit_ops.py draft-broadcast \
  --subject "Subject here" \
  --preview-text "Preview here" \
  --body-file /path/to/body.html \
  --apply
```

Creates a Kit draft only. It does not send or schedule broadcasts. Jason must review via the returned Kit confirm URL.

## Safety rules

- Writes require `--apply`.
- Deletes are not supported.
- Broadcast sending/scheduling is not supported.
- Subscriber-level data is intentionally excluded from reports.
- After every run, verify `hermes config get mcp_servers.kit.trust` returns the original value, normally `untrusted`.
