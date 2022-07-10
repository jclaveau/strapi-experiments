#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

sqlite3 "$SCRIPT_DIR/../.tmp/data.db" ".output $SCRIPT_DIR/fixtures.sql.dump" ".dump"
