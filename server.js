//bedzie to server http bedzie to wspólpracowac z przegladarka internetową
//wyslemy reques i dostaniemy dane od servera 

var http = require('http')
var static = require('node-static')
var queryString = require('query-string');


var httpServer = http.createServer();
var fileServer = new static.Server('./public')

var serveError = (res, code ) =>{
    res.writeHead(code, {'Content-Type': 'text/plain; charset=utf-8'})
    res.write('Error')
    res.end()

}


var person = {
    firstName: 'Marcin',
    lastName: 'Kowalczyk',
    year: 1998 
}

httpServer.on('request', (req, res) =>{
        console.log(req.method , req.url)
        var q = queryString.parseUrl(req.url);
        // console.log(q)


        switch(req.method){
        case 'GET': 
            switch(q.url){
            case '/get':
                res.writeHead(200, {'Content-Type': 'application/json ; charset=utf-8'})
                res.write(JSON.stringify(person))
                res.end()
                break
            case '/set':
                person.firstName = q.query.firstName;
                person.lastName = q.query.lastName;
                person.year = parseInt(q.query.year);
                if(isNaN(person.year)) person.year= 1970  
                res.writeHead(200, {'Content-Type': 'application/json ; charset=utf-8'})
                res.write(JSON.stringify(person))
                res.end()
                break
            default: 
                fileServer.serve(req, res)         
                break
            }
        break
        case 'POST': 
            serveError(res, 404)
        break
        default:
            serveError(res, 404)
                
        }
    }
)


httpServer.listen(8888) 


//serowanie statycznego kontentu 


