#!/usr/bin/env node
var program = require("commander");
var fs = require("fs");
var faker = require("faker");
var process = require("process");

program
  .arguments("<file>")
  .option("-c, --count <count>", "How many messages should be created")
  .action(file => {
    var data = {};

    data.logs = [];

    program.count = program.count || 10000;

    for (var i = 0; i < program.count; i++) {
      data.logs.push(faker.internet.userAgent());
    }
    fs.writeFileSync(file, JSON.stringify(data));
  })
  .parse(process.argv);
