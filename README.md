# StripComment

A small convertor that strips comment for all javascript files in a folder using strip-comments and Walk. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

After downloading, run

```
npm install
```

### Run

Just run the convert.js and provide your target folder as argument

```
node convert.js $DIRECTORY
```

Example

```
node convert.js ../dir 
```
### Skip Directory

Configure skipped.json to skip the directories you don't want to tamper with.

```
[
    "node_modules", 
    "assets", 
    ".git"
]
```

By default, 3 directories as shown above will be ignored while stripping comment.


## Built With

* [strip-comment](https://www.npmjs.com/package/strip-comments) - Strip comments from code
* [Walk](https://maven.apache.org/) - Walk file






