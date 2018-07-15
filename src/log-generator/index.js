#!/usr/bin/env node
var program = require("commander");
var fs = require("fs");
var faker = require("faker");
var process = require("process");

function getAllProperties(object) {
  var properties = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      properties.push(key);
    }
  }
  return properties;
}

function executeTypeString(type) {
  var typePart = type.split(".");
  if (typePart.length === 2) {
    return faker[typePart[0]][typePart[1]]();
  }
  if (typePart.length === 3) {
    return faker[typePart[0]][typePart[1]][typePart[2]]();
  }
  console.error("no type given");
  process.exit(1);
}

function getTypes() {
  var types = [];
  var properties = getAllProperties(faker);
  properties.forEach(property => {
    var propertyProperties = getAllProperties(faker[property]);
    propertyProperties.forEach(propertyProperty => {
      types.push(`${property}.${propertyProperty}`);
    });
  });
  return types;
}

function generateData(type, count) {
  var data = [];
  for (var i = 0; i < count; i++) {
    data.push(executeTypeString(type));
  }
  return data;
}

function validate(inputType) {
  if(getTypes().includes(inputType)){
    return;
  }
  console.error("no correct type provided");
  process.exit(1);
}

program
  .command("list", "Prints all available types", { isDefault: true })
  .alias("l")
  .action(() => {
    getTypes().forEach(type => console.log(type));
  });

program
  .command("generate <type>")
  .alias("g")
  .option("-f, --file <file>", "Provide output name")
  .option("-c, --count <count>", "How many messages should be created")
  .action(type => {
    validate(type);

    var count = program.count || 100;
    var outputFile = program.file || "test-data.json";
    var output = generateData(type, count);

    fs.writeFileSync(outputFile, JSON.stringify(output));
  });

program.parse(process.argv);
