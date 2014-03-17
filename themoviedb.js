//Namespace
var theMovieDb = {};

//Access configuration
theMovieDb.apiKey = "api_key=3d197569c7f13f60d61a7d61d5c83427";
theMovieDb.baseURI = "http://api.themoviedb.org/3/";
theMovieDb.imagesURI = "http://image.tmdb.org/t/p/";
theMovieDb.timeout = 2000;

//Common methods
theMovieDb.generateQuery = function (parameters) {
    var query = "";
    
    for (var i = 0; i < parameters.length; i++) {
        if(i === 0) {
            query = query + "?" + parameters[i];
        } else {
            query = query + "&" + parameters[i];
        }
    }
    
    return query;
};

//API
theMovieDb.configurations = {
    getConfiguration: function (success, error){
        var options = {
            method: "GET",
            url: "configuration" + theMovieDb.generateQuery([theMovieDb.apiKey]),
            status: 200
        };

        theMovieDb.client(options, success, error);
    }
};

theMovieDb.images = {
    getImage: function (options) {
        return theMovieDb.imagesURI + options.size + "/" + options.file;
    }
}

theMovieDb.account = {};
theMovieDb.authentication = {};

theMovieDb.certifications = {
    getList: function (sucess, error) {
        theMovieDb.client(
            {
                method: "GET",
                status: 200,
                url: "certification/movie/list" + theMovieDb.generateQuery([theMovieDb.apiKey])
            }, 
            sucess, error);
    }
};

theMovieDb.changes = {};
theMovieDb.collections = {};
theMovieDb.companies = {};
theMovieDb.credits = {};
theMovieDb.discover = {};
theMovieDb.find = {};

theMovieDb.genres = {
    getList: function (succes, error) {
        var options = {
                method: "GET",
                status: 200,
                url: "genre/list" + theMovieDb.generateQuery([theMovieDb.apiKey])
        };

        theMovieDb.client(options, succes, error);
    }
};

theMovieDb.jobs = {};
theMovieDb.keywords = {};
theMovieDb.lists = {};
theMovieDb.movies = {};
theMovieDb.networks = {};
theMovieDb.people = {};
theMovieDb.reviews = {};
theMovieDb.search = {};
theMovieDb.tv = {};
theMovieDb.tvSeasons = {};
theMovieDb.tvEpisodes = {};

//Client
theMovieDb.client = function (options, success, error){
    var xhr = new XMLHttpRequest();
    
    xhr.ontimeout = function () {
        error("Timeout");
    };
    
    xhr.open(options.method, theMovieDb.baseURI + options.url, true);
        
    xhr.onload = function (e) {
        if(xhr.readyState === 4) {
            if(xhr.status === options.status) {
                success(xhr.responseText);
            } else {
                error(xhr.statusText);
            }
        }
    }

    xhr.onerror = function (e) {
        error(JSON.stringify(xhr));
    };
    
    xhr.send(null);
};