#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

mkdir -p "$SCRIPT_DIR/../.tmp/"
rm "$SCRIPT_DIR/../.tmp/data.db"
touch "$SCRIPT_DIR/../.tmp/data.db"
sqlite3 "$SCRIPT_DIR/../.tmp/data.db" ".read $SCRIPT_DIR/fixtures.sql.dump"
