-- Add full-text search index for User table
CREATE EXTENSION pg_trgm;
CREATE EXTENSION btree_gin;

CREATE INDEX user_search ON User USING GIN (to_tsvector('english', bio));