-- Original IDs live in a separate column so imported rows never overwrite new Worker leads.
ALTER TABLE leads ADD COLUMN railway_id TEXT;
CREATE UNIQUE INDEX leads_railway_id_idx ON leads(railway_id);
