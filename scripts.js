$(document).ready(function () {

    $('#search').on('keypress', function (e) {

        if (e.which == 13) {

            let title = $('#search').val();
            $(".card").remove();

            if (title != '') {

                $('#search').addClass('hidden');
                $('#new_research').removeClass('hidden');

                $.ajax({
                    url: 'https://api.themoviedb.org/3/search/movie',
                    method: 'GET',
                    data: {
                        api_key: 'bcccc94a26e86cc0e1b5f4f3268d8d81',
                        query: title,
                    },
                    success: function (data) {

                        for (var i = 0; i < data.results.length; i++) {
                            generateHtml(data.results[i]);
                        }
                    },
                    error: function () {
                        alert("Page not found. An error has occurred.");
                    }
                });
            };

            $('#new_research').on('click', function () {

                $('#search').removeClass('hidden');
                $('#new_research').addClass('hidden');
                $('.card').remove();
            });

        };
    });

    $('#search_series').on('keypress', function (e) {

        if (e.which == 13) {

            let title = $('#search_series').val();
            $(".card").remove();

            if (title != '') {

                $('#search_series').addClass('hidden');
                $('#new_research').removeClass('hidden');

                $.ajax({

                    url: 'https://api.themoviedb.org/3/search/tv',
                    method: 'GET',
                    data: {
                        api_key: 'e84c7d2ede59ead3397581c0ad7d4dec',
                        query: title,
                    },
                    success: function (data) {

                        for (var i = 0; i < data.results.length; i++) {
                            generateHtml(data.results[i]);
                        }

                    },
                    error: function () {
                        alert("Page not found. An error has occurred.");
                    }
                });
            };

            $('#new_research').on('click', function () {

                $('#search_series').removeClass('hidden');
                $('#new_research').addClass('hidden');
                $('.card').remove();
            });

        };
    });

}); // Close Jquery



function generateHtml(data) {

    var source = $('#template').html();
    var template = Handlebars.compile(source);

    var urlPoster = 'https://image.tmdb.org/t/p/w185/' + data.poster_path;

    if (data.poster_path == null) {
        urlPoster = 'asset/notfound.png';
    }

    var data = {
        title: data.title,
        poster: urlPoster,
        overview: data.overview,
    };

    var html = template(data);

    $('#card-wrapper').append(html);
    $('#search').val('');
    $('#search_series').val('');
}


