# Firebase Example

It is surprisingly confusing to do simple things in Firebase, such as select a
single entry in the database and use that data in some manner. This package
shows a simple Firebase client for a project called Filmz n' Feast. This
client illustrates how to create basic get/delete methods on single database
entries.

This example is written in ES5 for reasons. I know, it hurts me, too.

## Running tests

To run the Mocha unit tests, clone the repository and run:

```bash
$ npm install
```

Then create a configuration file:

```bash
$ cp config.json.example config.json
```

Open `config.json` and add your Firebase configuration details. Then
run:

```bash
$ npm test
```
