# Travolic Task

[![AbdelrahmanSadat](https://circleci.com/gh/AbdelrahmanSadat/travolic.svg?style=svg)](https://circleci.com/gh/AbdelrahmanSadat/travolic)
[![Maintainability](https://api.codeclimate.com/v1/badges/16625ecb7ed48cee0d4b/maintainability)](https://codeclimate.com/github/AbdelrahmanSadat/travolic/maintainability)
<!-- [![Test Coverage](https://api.codeclimate.com/v1/badges/16625ecb7ed48cee0d4b/test_coverage)](https://codeclimate.com/github/AbdelrahmanSadat/travolic/test_coverage) -->

## Install

Clone The Repo:

```sh
$ git clone https://github.com/AbdelrahmanSadat/travolic.git
```

Install Dependencies:

We prefer using Yarn over npm

```sh
$ yarn
```

## Run

To run in development:

```sh
$ yarn run dev
```

To run in production:

```sh
$ yarn run start
```
The app runs on port 3000 by default

## Test

To run all tests:

```sh
$ yarn run test
```

## Usage

The app has one route called "/hotels". 
We can pass optional parameters as a query string to filter the results. 
These include:

### **name**

_String_

### **city**

_String_

### **lowestPrice**

_Numeric_

### **highestPrice**

_Numeric_

### **date_start**

_ISO8601 Date_

### **date_end**

_ISO8601 Date_

### **sortBy**

One of "_name_" or "_price_"

## Example

*localhost:3000/hotels?city=cairo&highestPrice=1000&date_start=2020-04-09T02:33:18.252Z*
