# iso-react-router-alt-loopback

> Cloned from https://github.com/goatslacker/iso
> I've thrown in an isometric data fetching possibility using supersonic on the browser and loopback on the server

Component
```
var App = React.createClass({
    statics: {
        fetch: function (params) {
            return {
                'HelloStore:names': ()=> {
                    return Fetcher.get("hellos", {limit: 5});
                }
            }
        }
    }
})
```

Fetcher
```
module.exports = {
    get: (model, filter)=>{
        return new Promise(function(resolve, reject) {
            request
                .get('/api/' + model + (filter ? ("?filter=" + JSON.stringify(filter)) : ""))
                .end(function (err, res) {
                    if(err) reject();
                    else resolve(res.body);
                })
        });
    }
```

Server-Fetcher
```
module.exports = (app)=>{
    Fetcher.get = (model, filter)=>{
        return new Promise(function(resolve, reject) {
            app.models.Hello.find({}, function(err, items){
                if(err) reject();
                else resolve(items);
            });
        });
    }
    return Fetcher;
}
```

## Running This

```sh
npm install; npm run build; npm start
```

Then open your browser to `localhost:8080` and enjoy.

There are a few routes you can visit directly:

`localhost:8080/hello` and `localhost:8080/time`. Hello will display 3 hello messages from the api whereas time will display the current time.