//William Smyth May
//2013-11-18
//This is the JS that prepares the movie shopping page

/* controller.js
    Controller for Shopping Cart page
*/

$(function(){ //document ready function, prepares page
	var formatLabels = {
		dvd: 'DVD',
		bluray: 'Blu-Ray'
	};
	
	var cartModel = createCartModel();
	
	var cartView = createCartView({
		model: cartModel,
		template: $('.cart-item-template'),
		container: $('.cart-items-container'),
		totalPrice: $('.total-price')
	});
	
	var cartJSON = localStorage.getItem('cart'); //Checks for stored cart on local storage
	if (cartJSON && cartJSON.length > 0) {
		cartModel.setItems(JSON.parse(cartJSON));
	}
	
	var moviesModel = createMoviesModel({ //Pulls the list of movies for the page
		url: 'https://courses.washington.edu/info343/ajax/movies/'
	});
	
	var moviesView = createMoviesView({
		model: moviesModel,
		template: $('.movie-template'),
		container: $('.movies-container')
	});
	
	//refresh to get movies from server
	moviesModel.refresh();
	
	moviesView.on('addToCart', function(data){ //function to add item to the shopping cart
		var movie = moviesModel.getItem(data.movieID);
		if (!movie)
			throw 'Invalid movie ID "' + movieID + '"!'; 

		cartModel.addItem({
			id: movie.id,
			title: movie.title,
			format: data.format,
			formatLabel: formatLabels[data.format],
			price: movie.prices[data.format]
		});
	}); //addToCart event
	cartModel.on('change', function(){
		localStorage.setItem('cart', cartModel.toJSON());
	});
}); //doc ready()

