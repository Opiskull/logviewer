#!/usr/bin/env node
const program = require("commander");
const fs = require("fs");
const faker = require("faker");
const process = require("process");

function getAllProperties(object) {
  var properties = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      properties.push(key);
    }
  }
  return properties;
}

function executeCommand(type) {
  var typePart = type.split(".");
  if (typePart.length === 2) {
    return faker[typePart[0]][typePart[1]]();
  }
  console.error("no type given");
  process.exit(1);
}

function getAllAvailableTypes() {
  var types = [];
  var firstLevelProperties = getAllProperties(faker);
  firstLevelProperties.forEach(firstLevel => {
    var secondLevelProperties = getAllProperties(faker[firstLevel]);
    secondLevelProperties.forEach(secondLevel => {
      types.push(`${firstLevel}.${secondLevel}`);
    });
  });
  return types;
}

function generateTestData(type, count) {
  var data = [];
  for (var i = 0; i < count; i++) {
    data.push(executeCommand(type));
  }
  return data;
}

function isValidInputType(inputType) {
  return getAllAvailableTypes().includes(inputType);
}

program
  .version(require("./package.json").version)
  .command("list")
  .alias("l")
  .description("List all available types that can be generated")
  .action(() => {
    getAllAvailableTypes().forEach(type => console.log(type));
  });

program
  .command("generate <type>")
  .alias("g")
  .description("Generate data from the provided type")
  .option(
    "-f, --file <file>",
    "Provide output filename (default:'test-data.json')"
  )
  .option(
    "-c, --count <count>",
    "How many messages should be created (default:100)"
  )
  .option("-l, --locale <locale>", "What language should be used (default:'en')")
  .action(type => {
    if (!isValidInputType(type)) {
      console.error("An invalid type has been found. Please provide a valid type from 'list'");
      process.exit(1);
    }

    faker.setLocale(program.locale || "en");

    var count = program.count || 100;
    var outputFile = program.file || "test-data.json";
    var output = generateTestData(type, count);

    fs.writeFileSync(outputFile, JSON.stringify(output));
  });

program.parse(process.argv);

// Output help if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
