-- ═══════════════════════════════════════════════════════════════
--  AtithiSetu — Cloudflare D1 Schema
-- ═══════════════════════════════════════════════════════════════
--
--  Deploy to remote D1 after creating the database:
--    npx wrangler d1 execute atithi-setu-db --file=./schema.sql --remote
--
--  Verify tables exist:
--    npx wrangler d1 execute atithi-setu-db --command="SELECT name FROM sqlite_master WHERE type='table'" --remote
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS leads (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  name            TEXT     NOT NULL,
  email           TEXT     NOT NULL,
  phone           TEXT,
  state           TEXT,
  city            TEXT,
  restaurant_name TEXT,
  message         TEXT,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS complaints (
  id          INTEGER  PRIMARY KEY AUTOINCREMENT,
  user_email  TEXT     NOT NULL,
  subject     TEXT,
  description TEXT,
  status      TEXT     DEFAULT 'pending',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_leads_email      ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created    ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_complaints_email ON complaints(user_email);
