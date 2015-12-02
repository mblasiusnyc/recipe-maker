var recipes = [
	{
		id: 1,
		title: "My least favorite recipe",
		description: "This is an OK recipe",
		ingredients: [{
			name: 'Wheat',
			quantity: '10lbs'
		},{
			name: 'Barley',
			quantity: '4 oz'
		}]
	},
	{
		id: 2,
		title: "My MOST favorite recipe",
		description: "This is a GREAT recipe",
		ingredients: [{
			name: 'Bread',
			quantity: '6 lbs'
		},{
			name: 'Other',
			quantity: '12 oz'
		}]
	}
]

var Recipe = React.createClass({
	getInitialState: function(){
	  return {
 	    open: false,
 	    class: "recipe"
	  };
	},
	handleClick: function(){
		console.log('click handled')
	  if(this.state.open) {
	    this.setState({
	      open: false,
	      class: "recipe"
	    });
	  }else{
	    this.setState({
	      open: true,
	      class: "recipe open"
	    });
	  }
	},
	render: function() {
		var ingredientListItems = this.props.recipe.ingredients.map(function(ingredient) {
			return (
				<li className="ingredient" key={ingredient.name}>{ ingredient.name + " " + ingredient.quantity }</li>
			);
		})
		return (
			<div className={this.state.class}>
			  <h3 className="recipeTitle" onClick={this.handleClick}>
			    Title: {this.props.recipe.title}
			  </h3>
			  <p className="recipeDescription">Description: {this.props.recipe.description}</p>
			  <h4 className="ingredientsTitle">Ingredients</h4>
			  <ul className="ingredientsList">
			  	{ingredientListItems}
			  </ul>
			</div>
		)
	}
})

var RecipeList = React.createClass({
  render: function() {
  	var recipeNodes = this.props.recipes.map(function(recipe) {
  	  return (
  	    <Recipe key={recipe.id} recipe={recipe} />
  	  );
  	});
  	return (
  		<div className="recipeList">
  			{recipeNodes}
  		</div>
  	)
  }
});

ReactDOM.render(
  <RecipeList recipes={recipes}/>,
  document.getElementById('recipe-list')
);