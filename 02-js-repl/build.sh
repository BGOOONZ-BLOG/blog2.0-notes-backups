#!/bin/sh

MAPFILE="map.txt"
TARGET="js-repl.js"

rm ${TARGET}

cat ./${MAPFILE} | grep -v '^#' | grep -v '^$' | while read i; do cat ${i} >> ./${TARGET} ; done

