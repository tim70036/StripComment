const
    walk = require('walk'),
    fs = require('fs'),
    path = require('path'),
    strip = require('strip-comments');

// Init
const 
    dir = process.argv[2],
    skippedDirs = require('./skipped.json');

if(!dir) {
    console.log('Please provide dir name in second args');
    process.exit(0);
}
if(!skippedDirs){
    console.log('Please provide skipped.json in current directory');
    process.exit(0);
}

console.log(`Walking in directory '${dir}'`)
run(dir, skippedDirs);

// Main func
function run(dir, skippedDirs){

    // Init
    let options = {
        followLinks: false
        // directories with these keys will be skipped
      , filters: skippedDirs
    };

    let walker = walk.walk(dir, options);

    // Set callback
    walker.on("directories", function (root, dirStatsArray, next) {
        // dirStatsArray is an array of `stat` objects with the additional attributes
        // * type
        // * error
        // * name
        next();
    });

    walker.on("file", function (root, fileStats, next) {

        // Skip files that aren't js 
        if(path.extname(fileStats.name) !== '.js' ) 
            return next();
        
        console.log(`dealing :  ${root}/${fileStats.name}`);
        let content = fs.readFileSync(`${root}/${fileStats.name}`, 'utf-8');
        //console.log(content);

        let converted = strip(content);
        //console.log(converted);
        
        fs.writeFileSync(`${root}/${fileStats.name}`, converted)

        return next();
    });

    walker.on("errors", function (root, nodeStatsArray, next) {
        next();
    });

    walker.on("end", function () {
        console.log("Walking is done");
    });

}