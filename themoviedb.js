//Namespace
var theMovieDb = {};

//Access configuration
theMovieDb.api_key = "3d197569c7f13f60d61a7d61d5c83427";
theMovieDb.base_uri = "http://api.themoviedb.org/3/";
theMovieDb.images_uri = "http://image.tmdb.org/t/p/";
theMovieDb.timeout = 2000;
theMovieDb.query_options = [
                            "page",
                            "start_date",
                            "end_date",
                            "language",
                            "append_to_response",
                            "include_image_language",
                            "sort_by",
                            "include_adult",
                            "year",
                            "primary_release_year",
                            "vote_count_gte",
                            "vote_average_gte",
                            "with_genres",
                            "release_date_gte",
                            "release_date_lte",
                            "certification_country",
                            "certifications_lte",
                            "with_companies"
                            ];


//Common methods
theMovieDb.generateQuery = function (options) {
    
    var options = options || {};
    
    var query = "?api_key=" + theMovieDb.api_key;
    
    if(Object.keys(options).length > 0) {        
        for(var option in options) {
            if(options.hasOwnProperty(option)) {
                if(theMovieDb.query_options.indexOf(option) != -1) {
                    query = query + "&" + option + "=" + options[option];
                }
            }
        }
    }
    
    return query;
};

//API
theMovieDb.configurations = {
    getConfiguration: function (success, error){
        theMovieDb.client(
            {
                url: "configuration" + theMovieDb.generateQuery(),
            },
            success, error);
    }
};

theMovieDb.images = {
    getImage: function (options) {
        return theMovieDb.images_uri + options.size + "/" + options.file;
    }
}

theMovieDb.account = {
    getInformation: function (options, success, error) {
        theMovieDb.client(
            {
                url: "account" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getList: function (options, success, error) {
        theMovieDb.client(
            {
                url: "account" + options.id + "/lists" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getFavoritesMovies: function (options, success, error) {
        theMovieDb.client(
            {
                url: "account" + options.id + "/favorite_movies" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    addFavorite: function (options, success, error) {
        theMovieDb.client(
            {
                url: "account" + options.id + "/favorite" + theMovieDb.generateQuery(options),
                status: 201,
                method: "POST",
                body: options.body
            },
            success, error);
    },
    getRatedMovies: function (options, success, error) {
        theMovieDb.client(
            {
                url: "account" + options.id + "/rated_movies" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getWatchlist: function (options, success, error) {
        theMovieDb.client(
            {
                url: "account" + options.id + "/movie_watchlist" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    addMovieToWatchlist: function (options, success, error) {
        theMovieDb.client(
            {
                url: "account" + options.id + "/movie_watchlist" + theMovieDb.generateQuery(options),
                method: "POST",
                status: 201,
                body: options.body
            },
            success, error);
    }
};

theMovieDb.authentication = {
    getToken: function (options, success, error) {
        theMovieDb.client(
            {
                url: "authentication/token/new" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getSessionId: function (options, success, error) {
        theMovieDb.client(
            {
                url: "authentication/session/new" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getGuestSession: function (options, success, error) {
        theMovieDb.client(
            {
                url: "authentication/guest_session/new" + theMovieDb.generateQuery(options)
            },
            success, error);
    }
};

theMovieDb.certifications = {
    getList: function (success, error) {
        theMovieDb.client(
            {
                url: "certification/movie/list" + theMovieDb.generateQuery()
            }, 
            success, error);
    }
};

theMovieDb.changes = {
    getMovieChanges: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/changes" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getPersonChanges: function (options, success, error) {
        theMovieDb.client(
            {
                url: "person/changes" + theMovieDb.generateQuery(options)
            },
            success, error);
    }
};


theMovieDb.collections = {
    getCollection: function (options, success, error) {
        theMovieDb.client(
            {
                url: "collection/" + options.id + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getCollectionImages: function (options, success, error) {
        theMovieDb.client(
            {
                url: "collection/" + options.id + "/images" + theMovieDb.generateQuery(options)
            },
            success, error);
    }
    
};

theMovieDb.companies = {
    getCompany: function (options, success, error) {
        theMovieDb.client(
            {
                url: "company/" + options.id + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getCompanyMovies: function (options, success, error) {  
        theMovieDb.client(
            {
                url: "company/" + options.id + "/movies" + theMovieDb.generateQuery(options)
            },
            success, error);
    }
    
};

theMovieDb.credits = {
    getCredit: function (options, success, error) {
        theMovieDb.client(
            {
                url: "credit/" + options.id + theMovieDb.generateQuery(options)
            },
            success, error);
    }
};


theMovieDb.discover = {
    getMovies: function (options, success, error) {
        theMovieDb.client(
            {
                url: "discover/movie" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getTvShows: function (options, success, error) {
        theMovieDb.client(
            {
                url: "discover/tv" + theMovieDb.generateQuery(options)
            },
            success, error);
    }
    
};

theMovieDb.find = {
    getById: function(options, success, error) {
        theMovieDb.client(
            {
                url: "find" + options.id + theMovieDb.generateQuery(options)
            },
            success, error);
    }
};

theMovieDb.genres = {
    getList: function (options, success, error) {
        theMovieDb.client(
            {
                url: "genre/list" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getMovies: function (options, success, error) {
        theMovieDb.client(
            {
                url: "genre/" + options.id + "/movies" + theMovieDb.generateQuery(options)
            },
            success, error);
    }
    
};

theMovieDb.jobs = {
    getList: function (success, error) {
        theMovieDb.client(
            {
                url: "job/list" + theMovieDb.generateQuery()
            },
            success, error);
    }
};

theMovieDb.keywords = {
    getById: function (success, error) {
        theMovieDb.client(
            {
                url: "keyword/" + options.id + theMovieDb.generateQuery()
            },
            success, error);
    },
    getMovies: function (success, error) {
        theMovieDb.client(
            {
                url: "keyword/" + options.id + "/movies" + theMovieDb.generateQuery()
            },
            success, error);
    }
};

theMovieDb.lists = {
    getById: function (success, error) {
        theMovieDb.client(
            {
                url: "list/" + options.id + theMovieDb.generateQuery()
            },
            success, error);
    },
    getStatusById: function (options, success, error) {
        theMovieDb.client(
            {
                url: "list/" + options.id + "/item_status" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    addList: function (options, body, success, error) {
        theMovieDb.client(
            {
                method:  "POST",
                status: 201,
                url: "list/" + theMovieDb.generateQuery(options),
                body: body
            },
            success, error);
    },
    addItem: function (options, body, success, error) {
        theMovieDb.client(
            {
                method:  "POST",
                status: 201,
                url: "list/" + options.id + "/add_item" + theMovieDb.generateQuery(options),
                body: body
            },
            success, error);
    },
    removeItem: function (options, body, success, error) {
        theMovieDb.client(
            {
                method:  "POST",
                status: 201,
                url: "list/" + options.id + "/remove_item" + theMovieDb.generateQuery(options),
                body: body
            },
            success, error);
    },
    removeList: function (options, success, error) {
        theMovieDb.client(
            {
                method:  "DELETE",
                status: 204,
                url: "list/" + options.id + theMovieDb.generateQuery()
            },
            success, error);
    }
};

theMovieDb.movies = {
    getById: function (options, body, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getAlternativeTitles: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/alternative_titles" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getCredits: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/credits" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getImages: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/images" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getKeywords: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/keywords" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getReleases: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/releases" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getTrailers: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/trailers" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getTranslations: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/translations" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getSimilarMovies: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/similar_movies" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getReviews: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/reviews" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getLists: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/lists" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getChanges: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/changes" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getLatest: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/latest" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getUpcoming: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/upcoming" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getNowPlaying: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/now_playing" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getPopular: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/popular" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getTopRated: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/top_rated" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getStatus: function (options, success, error) {
        theMovieDb.client(
            {
                url: "movie/" + options.id + "/account_states" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    rate: function (options, body, success, error) {
        theMovieDb.client(
            {
                method:  "POST",
                status: 201,
                url: "list/" + options.id + "/rating" + theMovieDb.generateQuery(options),
                body: body
            },
            success, error);
    }
};

theMovieDb.networks = {
    getById: function (options, success, error) {
        theMovieDb.client(
            {
                url: "network/" + options.id + theMovieDb.generateQuery(options)
            },
            success, error);
    }
};

theMovieDb.people = {
    getById: function (options, success, error) {
        theMovieDb.client(
            {
                url: "person/" + options.id + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getMovieCredits: function (options, success, error) {
        theMovieDb.client(
            {
                url: "person/" + options.id + "/movie_credits" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getTvCredits: function (options, success, error) {
        theMovieDb.client(
            {
                url: "person/" + options.id + "/tv_credits" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getCredits: function (options, success, error) {
        theMovieDb.client(
            {
                url: "person/" + options.id + "/combined_credits" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getExternalIds: function (options, success, error) {
        theMovieDb.client(
            {
                url: "person/" + options.id + "/external_ids" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getImages: function (options, success, error) {
        theMovieDb.client(
            {
                url: "person/" + options.id + "/images" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getChanges: function (options, success, error) {
        theMovieDb.client(
            {
                url: "person/" + options.id + "/changes" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getPopular: function (options, success, error) {
        theMovieDb.client(
            {
                url: "person/popular" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getLatest: function (options, success, error) {
        theMovieDb.client(
            {
                url: "person/latest" + theMovieDb.generateQuery(options)
            },
            success, error);
    }
};

theMovieDb.reviews = {
    getById: function (options, success, error) {
        theMovieDb.client(
            {
                url: "review" + options.id + theMovieDb.generateQuery(options)
            },
            success, error);
    }
};

theMovieDb.search = {
    getMovie: function (options, success, error) {
        theMovieDb.client(
            {
                url: "search/movie" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getCollection: function (options, success, error) {
        theMovieDb.client(
            {
                url: "search/collection" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getTv: function (options, success, error) {
        theMovieDb.client(
            {
                url: "search/tv" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getPerson: function (options, success, error) {
        theMovieDb.client(
            {
                url: "search/person" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getList: function (options, success, error) {
        theMovieDb.client(
            {
                url: "search/list" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getCompany: function (options, success, error) {
        theMovieDb.client(
            {
                url: "search/company" + theMovieDb.generateQuery(options)
            },
            success, error);
    },
    getKeyword: function (options, success, error) {
        theMovieDb.client(
            {
                url: "search/keyword" + theMovieDb.generateQuery(options)
            },
            success, error);
    }
};

theMovieDb.timezones = {
    getList: function (options, success, error) {
        theMovieDb.client(
            {
                url: "timezones/list" + theMovieDb.generateQuery(options)
            },
            success, error);
    }
};

theMovieDb.tv = {
    getById: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/" + options.id + theMovieDb.generateQuery()
            },
            success, error);
    },
    getCredits: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/" + options.id + "/credits" + theMovieDb.generateQuery()
            },
            success, error);
    },
    getExternalIds: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/" + options.id + "/external_ids" + theMovieDb.generateQuery()
            },
            success, error);
    },
    getImages: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/" + options.id + "/images" + theMovieDb.generateQuery()
            },
            success, error);
    },
    getTranslations: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/" + options.id + "/translations" + theMovieDb.generateQuery()
            },
            success, error);
    },
    getOnTheAir: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/on_the_air" + theMovieDb.generateQuery()
            },
            success, error);
    },
    getAiringToday: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/airing_today" + theMovieDb.generateQuery()
            },
            success, error);
    },
    getTopRated: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/top_rated" + theMovieDb.generateQuery()
            },
            success, error);
    },
    getPopular: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/popular" + theMovieDb.generateQuery()
            },
            success, error);
    }
};

theMovieDb.tvSeasons = {
    getById: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + theMovieDb.generateQuery()
            },
            success, error);
    },
    getCredits: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/credits" + theMovieDb.generateQuery()
            },
            success, error);
    },
    getExternalIds: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/external_ids" + theMovieDb.generateQuery()
            },
            success, error);
    },
    getImages: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/images" + theMovieDb.generateQuery()
            },
            success, error);
    }
};

theMovieDb.tvEpisodes = {
    getById: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + theMovieDb.generateQuery()
            },
            success, error);
    },
    getEpisode: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/credits" + theMovieDb.generateQuery()
            },
            success, error);
    },
    getExternalIds: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/external_ids" + theMovieDb.generateQuery()
            },
            success, error);
    },
    getImages: function (options, success, error) {
        theMovieDb.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/images" + theMovieDb.generateQuery()
            },
            success, error);
    }
};

//Client
theMovieDb.client = function (options, success, error){
    var method = options.method || "GET";
    var status = options.status || 200;
    var xhr = new XMLHttpRequest();
    
    xhr.ontimeout = function () {
        error("Timeout");
    };
    
    
    
    xhr.open(method, theMovieDb.base_uri + options.url, true);
        
    xhr.onload = function (e) {
        if(xhr.readyState === 4) {
            if(xhr.status === status) {
                success(xhr.responseText);
            } else {
                error(xhr.statusText);
            }
        }
    }

    xhr.onerror = function (e) {
        error(JSON.stringify(xhr));
    };
    
    if(options.method === "POST") {
        xhr.send(options.body);
    } else {
        xhr.send(null);
    }
};