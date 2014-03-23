var theMovieDb = {};

theMovieDb.common = {
    api_key: "3d197569c7f13f60d61a7d61d5c83427",
    base_uri: "http://api.themoviedb.org/3/",
    images_uri: "http://image.tmdb.org/t/p/",
    timeout: 2000,
    query_options: [
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
    ],
    generateQuery: function (options) {
        'use strict';
        var myOptions, query, option;
        
        myOptions = options || {};
        query = "?api_key=" + theMovieDb.common.api_key;
        
        if (Object.keys(myOptions).length > 0) {
            for (option in myOptions) {
                if (myOptions.hasOwnProperty(option)) {
                    if (theMovieDb.common.query_options.indexOf(option) !== -1) {
                        query = query + "&" + option + "=" + myOptions[option];
                    }
                }
            }
        }
        return query;
    },
    validateCallbacks: function (callbacks) {
        'use strict';
        if (typeof callbacks[0] !== "function" || typeof callbacks[1] !== "function") {
            throw "Success and error parameters must be functions!";
        }
    },
    getImage: function (options) {
        'use strict';
        return theMovieDb.common.images_uri + options.size + "/" + options.file;
    },
    client: function (options, success, error) {
        'use strict';
        var method, status, xhr;
        
        method = options.method || "GET";
        status = options.status || 200;
        xhr = new XMLHttpRequest();
        
        xhr.ontimeout = function () {
            error("Timeout");
        };
        
        xhr.open(method, theMovieDb.common.base_uri + options.url, true);
        
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === status) {
                    success(xhr.responseText);
                } else {
                    error(xhr.statusText);
                }
            } else {
                error(xhr.statusText);
            }
        };
        
        xhr.onerror = function (e) {
            error(JSON.stringify(xhr));
        };
        if (options.method === "POST") {
            xhr.send(options.body);
        } else {
            xhr.send(null);
        }
    }
};

theMovieDb.configurations = {
    getConfiguration: function (success, error) {
        'use strict';
        theMovieDb.common.validateCallbacks([success, error]);
        theMovieDb.common.client(
            {
                url: "configuration" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};

theMovieDb.account = {
    getInformation: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "account" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getList: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "account" + options.id + "/lists" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getFavoritesMovies: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "account" + options.id + "/favorite_movies" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    addFavorite: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "account" + options.id + "/favorite" + theMovieDb.common.generateQuery(options),
                status: 201,
                method: "POST",
                body: options.body
            },
            success,
            error
        );
    },
    getRatedMovies: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "account" + options.id + "/rated_movies" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getWatchlist: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "account" + options.id + "/movie_watchlist" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    addMovieToWatchlist: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "account" + options.id + "/movie_watchlist" + theMovieDb.common.generateQuery(options),
                method: "POST",
                status: 201,
                body: options.body
            },
            success,
            error
        );
    }
};

theMovieDb.authentication = {
    getToken: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "authentication/token/new" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getSessionId: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "authentication/session/new" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getGuestSession: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "authentication/guest_session/new" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.certifications = {
    getList: function (success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "certification/movie/list" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};

theMovieDb.changes = {
    getMovieChanges: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/changes" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getPersonChanges: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "person/changes" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.collections = {
    getCollection: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "collection/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCollectionImages: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "collection/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
    
};

theMovieDb.companies = {
    getCompany: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "company/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCompanyMovies: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "company/" + options.id + "/movies" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
    
};

theMovieDb.credits = {
    getCredit: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "credit/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.discover = {
    getMovies: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "discover/movie" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTvShows: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "discover/tv" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
    
};

theMovieDb.find = {
    getById: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "find" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.genres = {
    getList: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "genre/list" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getMovies: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "genre/" + options.id + "/movies" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
    
};

theMovieDb.jobs = {
    getList: function (success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "job/list" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};

theMovieDb.keywords = {
    getById: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "keyword/" + options.id + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getMovies: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "keyword/" + options.id + "/movies" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};

theMovieDb.lists = {
    getById: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "list/" + options.id + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getStatusById: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "list/" + options.id + "/item_status" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    addList: function (options, body, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                method:  "POST",
                status: 201,
                url: "list/" + theMovieDb.common.generateQuery(options),
                body: body
            },
            success,
            error
        );
    },
    addItem: function (options, body, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                method:  "POST",
                status: 201,
                url: "list/" + options.id + "/add_item" + theMovieDb.common.generateQuery(options),
                body: body
            },
            success,
            error
        );
    },
    removeItem: function (options, body, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                method:  "POST",
                status: 201,
                url: "list/" + options.id + "/remove_item" + theMovieDb.common.generateQuery(options),
                body: body
            },
            success,
            error
        );
    },
    removeList: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                method:  "DELETE",
                status: 204,
                url: "list/" + options.id + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};

theMovieDb.movies = {
    getById: function (options, body, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getAlternativeTitles: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/alternative_titles" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCredits: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/credits" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getImages: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getKeywords: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/keywords" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getReleases: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/releases" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTrailers: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/trailers" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTranslations: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/translations" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getSimilarMovies: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/similar_movies" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getReviews: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/reviews" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getLists: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/lists" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getChanges: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getLatest: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/latest" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getUpcoming: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/upcoming" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getNowPlaying: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/now_playing" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getPopular: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/popular" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTopRated: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/top_rated" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getStatus: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/account_states" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    rate: function (options, body, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                method:  "POST",
                status: 201,
                url: "list/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
                body: body
            },
            success,
            error
        );
    }
};

theMovieDb.networks = {
    getById: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "network/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.people = {
    getById: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "person/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getMovieCredits: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "person/" + options.id + "/movie_credits" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTvCredits: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "person/" + options.id + "/tv_credits" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCredits: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "person/" + options.id + "/combined_credits" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getExternalIds: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "person/" + options.id + "/external_ids" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getImages: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "person/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getChanges: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "person/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getPopular: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "person/popular" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getLatest: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "person/latest" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.reviews = {
    getById: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "review" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.search = {
    getMovie: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "search/movie" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCollection: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "search/collection" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTv: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "search/tv" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getPerson: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "search/person" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getList: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "search/list" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCompany: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "search/company" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getKeyword: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "search/keyword" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.timezones = {
    getList: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "timezones/list" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.tv = {
    getById: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/" + options.id + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getCredits: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/credits" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getExternalIds: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/external_ids" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getImages: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/images" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getTranslations: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/translations" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getOnTheAir: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/on_the_air" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getAiringToday: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/airing_today" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getTopRated: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/top_rated" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getPopular: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/popular" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};

theMovieDb.tvSeasons = {
    getById: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getCredits: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/credits" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getExternalIds: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/external_ids" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getImages: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/images" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};

theMovieDb.tvEpisodes = {
    getById: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getEpisode: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/credits" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getExternalIds: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/external_ids" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getImages: function (options, success, error) {
        'use strict';
        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/images" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};