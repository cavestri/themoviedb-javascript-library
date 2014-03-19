//Namespace
var theMovieDb = {};

//Access configuration
theMovieDb.api_key = "api_key=3d197569c7f13f60d61a7d61d5c83427";
theMovieDb.base_uri = "http://api.themoviedb.org/3/";
theMovieDb.images_uri = "http://image.tmdb.org/t/p/";
theMovieDb.timeout = 2000;
theMovieDb.page = "page=";
theMovieDb.start_date = "start_date=";
theMovieDb.end_date = "end_date=";
theMovieDb.language = "language=";
theMovieDb.append_to_response = "append_to_response=";
theMovieDb.include_image_language = "include_image_language="

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
            url: "configuration" + theMovieDb.generateQuery([theMovieDb.api_key]),
            status: 200
        };

        theMovieDb.client(options, success, error);
    }
};

theMovieDb.images = {
    getImage: function (options) {
        return theMovieDb.images_uri + options.size + "/" + options.file;
    }
}

theMovieDb.account = {};
theMovieDb.authentication = {};

theMovieDb.certifications = {
    getList: function (success, error) {
        theMovieDb.client(
            {
                method: "GET",
                status: 200,
                url: "certification/movie/list" + theMovieDb.generateQuery([theMovieDb.api_key])
            }, 
            success, error);
    }
};

theMovieDb.changes = {
    getMovieChanges: function (options, success, error) {
        
        var query = [theMovieDb.api_key];
        
        if(options.page) {
            query.push(theMovieDb.page + options.page);
        }
        
        if(options.start_date) {
            query.push(theMovieDb.start_date + options.start_date);
        }
        
        if(options.end_date) {
            query.push(theMovieDb.end_date + options.end_date);
        }
        
        theMovieDb.client(
            {
                method: "GET",
                status: 200,
                url: "movie/changes" + theMovieDb.generateQuery(query)
            },
            success, error);
    },
    getPersonChanges: function (options, success, error) {
        
        var query = [theMovieDb.api_key];
        
        if(options.page) {
            query.push(theMovieDb.page + options.page);
        }
        
        if(options.start_date) {
            query.push(theMovieDb.start_date + options.start_date);
        }
        
        if(options.end_date) {
            query.push(theMovieDb.end_date + options.end_date);
        }
        
        theMovieDb.client(
            {
                method: "GET",
                status: 200,
                url: "person/changes" + theMovieDb.generateQuery(query)
            },
            success, error);
    }
};


theMovieDb.collections = {
    getCollection: function (options, success, error) {
        
        var query = [theMovieDb.api_key];
        
        if(options.language) {
            query.push(theMovieDb.language + options.language);
        }
            
        theMovieDb.client(
            {
                method: "GET",
                status: 200,
                url: "collection/" + options.id + theMovieDb.generateQuery(query)
            },
            success, error);
    },
    getCollectionImages: function (options, success, error) {
        
        var query = [theMovieDb.api_key];
        
        if(options.language) {
            query.push(theMovieDb.language + options.language);
        }
        
        if(options.imageLanguage) {
            query.push(theMovieDb.include_image_language + options.imageLanguage);
        }
            
        theMovieDb.client(
            {
                method: "GET",
                status: 200,
                url: "collection/" + options.id + "/images" + theMovieDb.generateQuery(query)
            },
            success, error);
    }
    
};


theMovieDb.companies = {
    getCompany: function (options, success, error) {
        
        var query = [theMovieDb.api_key];
        
        if(options.append_to_response) {
            query.push(theMovieDb.append_to_response + options.append_to_response);
        }
            
        theMovieDb.client(
            {
                method: "GET",
                status: 200,
                url: "company/" + options.id + theMovieDb.generateQuery(query)
            },
            success, error);
    },
    getCompanyMovies: function (options, success, error) {
        
        var query = [theMovieDb.api_key];
        
        if(options.language) {
            query.push(theMovieDb.language + options.language);
        }
        
        if(options.append_to_response) {
            query.push(theMovieDb.append_to_response + options.append_to_response);
        }
        
        if(options.page) {
            query.push(theMovieDb.page + options.page);
        }
            
        theMovieDb.client(
            {
                method: "GET",
                status: 200,
                url: "company/" + options.id + "/movies" + theMovieDb.generateQuery(query)
            },
            success, error);
    }
    
};


theMovieDb.credits = {
    getCredit: function (options, success, error) {
        
        var query = [theMovieDb.api_key];
        
        if(options.language) {
            query.push(theMovieDb.language + options.language);
        }
            
        theMovieDb.client(
            {
                method: "GET",
                status: 200,
                url: "credit/" + options.id + theMovieDb.generateQuery(query)
            },
            success, error);
    },
};


theMovieDb.discover = {};
theMovieDb.find = {};

theMovieDb.genres = {
    getList: function (succes, error) {
        var options = {
                method: "GET",
                status: 200,
                url: "genre/list" + theMovieDb.generateQuery([theMovieDb.api_key])
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
    
    xhr.open(options.method, theMovieDb.base_uri + options.url, true);
        
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