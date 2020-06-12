#!/bin/bash
day=`date +"%d%m%Y"`
time=`date +"%H%M"`

replace ".js" ".js?id=$day$time" --  ./.nuxt/dist/server/index.spa.html