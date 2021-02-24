/*
 * The MIT License (MIT)
 *
 * Copyright (c) Franco Cavestri
 *
 * https://github.com/cavestri/themoviedb-javascript-library
 *
 */

var theMovieDb = {};

theMovieDb.common = {
  api_key: "YOUR_KEY",
  base_uri: "http://api.themoviedb.org/3/",
  images_uri: "http://image.tmdb.org/t/p/",
  timeout: 5000,
  language: "en-US",
  generateQuery: function(options) {
    'use strict';
    var myOptions, query, option;

    myOptions = options || {};
    query = "?api_key=" + theMovieDb.common.api_key + "&language=" + theMovieDb.common.language;

    if (Object.keys(myOptions).length > 0) {
      for (option in myOptions) {
        if (myOptions.hasOwnProperty(option) && option !== "id" && option !== "body") {
          query = query + "&" + option + "=" + myOptions[option];
        }
      }
    }
    return query;
  },
  validateCallbacks: function(success, error) {
    'use strict';
    if (typeof success !== "function" || typeof error !== "function") {
      throw "success and error parameters must be functions!";
    }
  },
  validateRequired: function(args, argsReq, opt, optReq, allOpt) {
    'use strict';
    var i, allOptional;

    allOptional = allOpt || false;

    if (args.length !== argsReq) {
      throw "The method requires  " + argsReq + " arguments and you are sending " + args.length + "!";
    }

    if (allOptional) {
      return;
    }

    if (argsReq > 2) {
      for (i = 0; i < optReq.length; i = i + 1) {
        if (!opt.hasOwnProperty(optReq[i])) {
          throw optReq[i] + " is a required parameter and is not present in the options!";
        }
      }
    }
  },
  getImage: function(options) {
    'use strict';
    return theMovieDb.common.images_uri + options.size + "/" + options.file;
  },
  client: function(options, success, error) {
    'use strict';
    var method, status, xhr;

    method = options.method || "GET";
    status = options.status || 200;
    xhr = new XMLHttpRequest();

    xhr.ontimeout = function() {
      error('{"status_code":408,"status_message":"Request timed out"}');
    };

    xhr.open(method, theMovieDb.common.base_uri + options.url, true);

    if (options.method === "POST") {
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");
    }

    xhr.timeout = theMovieDb.common.timeout;

    xhr.onload = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === status) {
          success(xhr.responseText);
        } else {
          error(xhr.responseText);
        }
      } else {
        error(xhr.responseText);
      }
    };

    xhr.onerror = function(e) {
      error(xhr.responseText);
    };
    if (options.method === "POST") {
      xhr.send(JSON.stringify(options.body));
    } else {
      xhr.send(null);
    }
  }
};

theMovieDb.configurations = {
  getConfiguration: function(success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 2);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "configuration" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  },
  getCountries: function(success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 2);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "configuration/countries" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  },
  getJobs: function(success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 2);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "configuration/jobs" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  },
  getLanguages: function(success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 2);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "configuration/languages" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  },
  getPrimaryTranslations: function(success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 2);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "configuration/primary_translations" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  },
  getTimezones: function(success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 2);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "configuration/timezones" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  }
};

theMovieDb.account = {
  getInformation: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "account" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getLists: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "account/" + options.id + "/lists" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getFavoritesMovies: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "account/" + options.id + "/favorite/movies" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getFavoritesTvShows: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "account/" + options.id + "/favorite/tv?" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  addFavorite: function(options, success, error) {
    'use strict';
    var body;

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_type", "media_id", "favorite"]);

    theMovieDb.common.validateCallbacks(success, error);

    body = {
      "media_type": options.media_type,
      "media_id": options.media_id,
      "favorite": options.favorite
    }


    theMovieDb.common.client({
        url: "account/" + options.id + "/favorite" + theMovieDb.common.generateQuery(options),
        status: 201,
        method: "POST",
        body: body
      },
      success,
      error
    );
  },
  getRatedMovies: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "account/" + options.id + "/rated/movies" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getRatedTvShows: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "account/" + options.id + "/rated/tv" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getRatedTvEpisodes: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "account/" + options.id + "rated/tv/episodes" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getMovieWatchlist: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "account/" + options.id + "/watchlist/movies" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getTvShowsWatchlist: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "account/" + options.id + "/watchlist/tv" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  addToWatchlist: function(options, success, error) {
    'use strict';

    var body;

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_type", "media_id", "watchlist"]);

    theMovieDb.common.validateCallbacks(success, error);

    body = {
      "media_type": options.media_type,
      "media_id": options.media_id,
      "watchlist": options.watchlist
    }

    theMovieDb.common.client({
        url: "account/" + options.id + "/watchlist" + theMovieDb.common.generateQuery(options),
        method: "POST",
        status: 201,
        body: body
      },
      success,
      error
    );
  }
};

theMovieDb.authentication = {
  generateToken: function(success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 2);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "authentication/token/new" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  },
  askPermissions: function(options) {
    'use strict';

    window.open("https://www.themoviedb.org/authenticate/" + options.token + "?redirect_to=" + options.redirect_to);

  },
  validateUser: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["request_token", "username", "password"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "authentication/token/validate_with_login" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  generateSession: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["request_token"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "authentication/session/new" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  generateGuestSession: function(success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 2);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "authentication/guest_session/new" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  }
};

theMovieDb.certifications = {
  getMovieList: function(success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 2);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "certification/movie/list" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  },
  getTvList: function(success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 2);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "certification/tv/list" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  }
};

theMovieDb.changes = {
  getMovieChanges: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/changes" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getPersonChanges: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "person/changes" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getTvChanges: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/changes" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }
};

theMovieDb.collections = {
  getDetails: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "collection/" + options.id + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getImages: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "collection/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getTranslations: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "collection/" + options.id + "/translations" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }
};

theMovieDb.companies = {
  getDetails: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "company/" + options.id + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getAlternativeNames: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "company/" + options.id + "/alternative_names" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }

};

theMovieDb.credits = {
  getDetails: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "credit/" + options.id + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }
};

theMovieDb.discover = {
  getMovies: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "discover/movie" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getTvShows: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "discover/tv" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }

};

theMovieDb.find = {
  getById: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id", "external_source"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "find/" + options.id + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }
};

theMovieDb.genres = {
  getMovieList: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "genre/movie/list" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getMovies: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "genre/" + options.id + "/movies" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getTvList: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "genre/tv/list" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }

};

theMovieDb.guestSession = {
  getRatedMovies: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "guest_session/" + options.id + "/rated/movies" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  },
  getRatedTvShows: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "guest_session/" + options.id + "/rated/tv" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  },
  getRatedTvEpisodes: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "guest_session/" + options.id + "/rated/tv/episodes" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  }
};

theMovieDb.keywords = {
  getById: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "keyword/" + options.id + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getMovies: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "keyword/" + options.id + "/movies" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }
};

theMovieDb.lists = {
  getById: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "list/" + options.id + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getStatusById: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id", "movie_id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "list/" + options.id + "/item_status" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  addList: function(options, success, error) {
    'use strict';

    var body;

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "name", "description"]);

    theMovieDb.common.validateCallbacks(success, error);

    body = {
      "name": options.name,
      "description": options.description
    };

    delete options.name;
    delete options.description;

    if (options.hasOwnProperty("language")) {
      body["language"] = options.language;

      delete options.language;
    }

    theMovieDb.common.client({
        method: "POST",
        status: 201,
        url: "list" + theMovieDb.common.generateQuery(options),
        body: body
      },
      success,
      error
    );
  },
  addItem: function(options, success, error) {
    'use strict';

    var body;

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_id"]);

    theMovieDb.common.validateCallbacks(success, error);

    body = {
      "media_id": options.media_id
    };

    theMovieDb.common.client({
        method: "POST",
        status: 201,
        url: "list/" + options.id + "/add_item" + theMovieDb.common.generateQuery(options),
        body: body
      },
      success,
      error
    );
  },
  removeItem: function(options, success, error) {
    'use strict';

    var body;

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_id"]);

    theMovieDb.common.validateCallbacks(success, error);

    body = {
      "media_id": options.media_id
    };

    theMovieDb.common.client({
        method: "POST",
        status: 201,
        url: "list/" + options.id + "/remove_item" + theMovieDb.common.generateQuery(options),
        body: body
      },
      success,
      error
    );
  },
  removeList: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        method: "DELETE",
        status: 204,
        url: "list/" + options.id + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  clearList: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "confirm"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        method: "POST",
        status: 204,
        body: {},
        url: "list/" + options.id + "/clear" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }
};

theMovieDb.movies = {
  getById: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getAccountStates: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/account_states" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getAccountStatesGuest: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/account_states" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getAlternativeTitles: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/alternative_titles" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getChanges: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getCredits: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/credits" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getExternalIds: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/external_ids" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getImages: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getKeywords: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/keywords" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getReleases: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/release_dates" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getVideos: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/videos" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getTranslations: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/translations" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getRecommendations: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/recommendations" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getSimilarMovies: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/similar" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getReviews: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/reviews" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getLists: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/" + options.id + "/lists" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getLatest: function(success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 2);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/latest" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  },
  getUpcoming: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/upcoming" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getNowPlaying: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/now_playing" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getPopular: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/popular" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getTopRated: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "movie/top_rated" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  rate: function(options, rate, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 4, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        method: "POST",
        status: 201,
        url: "movie/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
        body: {
          "value": rate
        }
      },
      success,
      error
    );
  },
  rateGuest: function(options, rate, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 4, options, ["guest_session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        method: "POST",
        status: 201,
        url: "movie/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
        body: {
          "value": rate
        }
      },
      success,
      error
    );
  },
  removeRate: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);


    theMovieDb.common.client({
        method: "DELETE",
        status: 200,
        url: "movie/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
      },
      success,
      error
    );
  },
  removeRateGuest: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);


    theMovieDb.common.client({
        method: "DELETE",
        status: 200,
        url: "movie/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
      },
      success,
      error
    );
  }
};

theMovieDb.networks = {
  getById: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "network/" + options.id + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getAlternativeNames: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "network/" + options.id + "/alternative_names" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }
};

theMovieDb.people = {
  getById: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "person/" + options.id + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getMovieCredits: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "person/" + options.id + "/movie_credits" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getTvCredits: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "person/" + options.id + "/tv_credits" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getCredits: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "person/" + options.id + "/combined_credits" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getExternalIds: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "person/" + options.id + "/external_ids" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getImages: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "person/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getTaggedImages: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "person/" + options.id + "/tagged_images" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getChanges: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "person/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getPopular: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "person/popular" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getLatest: function(success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 2);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "person/latest" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  }
};

theMovieDb.reviews = {
  getById: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "review/" + options.id + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }
};

theMovieDb.search = {
  getMovie: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "search/movie" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getCollection: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "search/collection" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getTv: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "search/tv" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getPerson: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "search/person" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getCompany: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "search/company" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getKeyword: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "search/keyword" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getMulti: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "search/multi" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }
};

theMovieDb.tv = {
  getById: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getAccountStates: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/account_states" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getAccountStatesGuest: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/account_states" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getAlternativeTitles: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/alternative_titles" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getChanges: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getContentRatings: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/content_ratings" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getCredits: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/credits" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getExternalIds: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/external_ids" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getImages: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getKeywords: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/keywords" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );

  },
  getRecommendations: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/recommendations" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getReviews: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/reviews" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getScreenedTheatrically: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/screened_theatrically" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getSimilar: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/similar" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getTranslations: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/translations" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getVideos: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/videos" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getAiringToday: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/airing_today" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getLatest: function(success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 2, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/latest" + theMovieDb.common.generateQuery()
      },
      success,
      error
    );
  },
  getOnTheAir: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/on_the_air" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getPopular: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/popular" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getTopRated: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, "", "", true);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/top_rated" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  rate: function(options, rate, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 4, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        method: "POST",
        status: 201,
        url: "tv/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
        body: {
          "value": rate
        }
      },
      success,
      error
    );
  },
  rateGuest: function(options, rate, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 4, options, ["guest_session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        method: "POST",
        status: 201,
        url: "tv/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
        body: {
          "value": rate
        }
      },
      success,
      error
    );
  },
  removeRate: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);


    theMovieDb.common.client({
        method: "DELETE",
        status: 200,
        url: "tv/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
      },
      success,
      error
    );
  },
  removeRateGuest: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);


    theMovieDb.common.client({
        method: "DELETE",
        status: 200,
        url: "tv/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
      },
      success,
      error
    );
  }
};

theMovieDb.tvSeasons = {
  getById: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getChanges: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/season/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getAccountStates: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + "/account_states" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getAccountStatesGuest: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + "/account_states" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getCredits: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + "/credits" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getExternalIds: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + "/external_ids" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getImages: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + "/images" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getVideos: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + "/videos" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }
};

theMovieDb.tvEpisodes = {
  getById: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getChanges: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/episode/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getAccountStates: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "episode_number", "season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/account_states" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getAccountStatesGuest: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "episode_number", "season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/account_states" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getCredits: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/credits" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getExternalIds: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/external_ids" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getImages: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/images" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  getVideos: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/videos" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  rate: function(options, rate, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 4, options, ["episode_number", "season_number", "session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        method: "POST",
        status: 201,
        url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/rating" + theMovieDb.common.generateQuery(options),
        body: {
          "value": rate
        }
      },
      success,
      error
    );
  },
  rateGuest: function(options, rate, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 4, options, ["episode_number", "season_number", "guest_session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        method: "POST",
        status: 201,
        url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/rating" + theMovieDb.common.generateQuery(options),
        body: {
          "value": rate
        }
      },
      success,
      error
    );
  },
  removeRate: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        method: "DELETE",
        status: 200,
        url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/rating" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  },
  removeRateGuest: function(options, success, error) {
    'use strict';

    theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "guest_session_id", "id"]);

    theMovieDb.common.validateCallbacks(success, error);

    theMovieDb.common.client({
        method: "DELETE",
        status: 200,
        url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/rating" + theMovieDb.common.generateQuery(options)
      },
      success,
      error
    );
  }
};

if ((typeof module != 'undefined') && (module.exports)) {
	module.exports = theMovieDb;
}
