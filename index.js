//Dependencies
const Request = require("request")
const Chalk = require("chalk")

//Variables
const Self_Args = process.argv.slice(2)

var Self = {}
Self.headers = {
    security: [
        "x-xss-protection",
        "x-frame-options",
        "x-content-type-options",
        "strict-transport-security",
        "content-security-policy",
        "x-permitted-cross-domain-policies",
        "referrer-policy",
        "expect-ct",
        "permissions-policy",
        "cross-origin-embedder-policy",
        "cross-origin-resource-policy",
        "cross-origin-opener-policy"
    ],
    information: [
        "x-powered-by",
        "server"
    ],
    cache: [
        "cache-control",
        "pragma",
        "last-modified",
        "expires",
        "etag"
    ]
}

//Main
if(!Self_Args.length){
    console.log("node index.js <url>")
    process.exit()
}

Request(Self_Args[0], function(err, res, body){
    if(err){
        console.log("Unable to make a request in the website.")
        process.exit()
    }

    let headers = res.headers

    for( i in Self.headers.security ){
        if(headers.hasOwnProperty(Self.headers.security[i])){
            console.log(`Security header found: ${Chalk.redBright(Self.headers.security[i])} | ${Chalk.yellowBright(headers[Self.headers.security[i]])}`)
        }else{
            console.log(`Security header missing: ${Chalk.redBright(Self.headers.security[i])}`)
        }
    }

    for( i in Self.headers.information ){
        if(headers.hasOwnProperty(Self.headers.information[i])){
            console.log(`Information header found: ${Chalk.redBright(Self.headers.information[i])} | ${Chalk.yellowBright(headers[Self.headers.information[i]])}`)
        }else{
            console.log(`Information header missing: ${Chalk.redBright(Self.headers.information[i])}`)
        }
    }

    for( i in Self.headers.cache ){
        if(headers.hasOwnProperty(Self.headers.cache[i])){
            console.log(`Cache header found: ${Chalk.redBright(Self.headers.cache[i])} | ${Chalk.yellowBright(headers[Self.headers.cache[i]])}`)
        }else{
            console.log(`Cache header missing: ${Chalk.redBright(Self.headers.cache[i])}`)
        }
    }
})

