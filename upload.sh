#!/bin/bash

function uploadOnline() {
    LD=./dist/case-with-ng
    RD=/www/wwwroot/caseserver.42.huizhouyiren.com
    sftp root@192.168.0.42 <<EOF
      cd ${RD}
      lcd ${LD}
      put -R ./*
EOF
}

yarn build --prod && uploadOnline
