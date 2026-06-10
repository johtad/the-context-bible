#!/bin/bash
# Export all collected emails from the BOOK_EMAILS KV namespace to a CSV.
# Usage:  bash export-emails.sh > book-emails.csv
# Then open book-emails.csv in Numbers, Excel, or Google Sheets.

set -euo pipefail
cd "$(dirname "$0")"

NS_ID="b86f30431399470dae06014163c5eb64"

echo "email,name,first_seen,last_seen,request_count,downloaded_at,download_count,country,user_agent"

npx wrangler kv key list --namespace-id "$NS_ID" 2>/dev/null \
  | jq -r '.[].name' \
  | while read -r key; do
      val=$(npx wrangler kv key get "$key" --namespace-id "$NS_ID" 2>/dev/null)
      echo "$val" | jq -r '[
        .email // "",
        .name // "",
        .first_seen // "",
        .last_seen // "",
        (.request_count // 0 | tostring),
        .downloaded_at // "",
        (.download_count // 0 | tostring),
        .country // "",
        (.user_agent // "" | gsub(",";";"))
      ] | @csv'
    done
