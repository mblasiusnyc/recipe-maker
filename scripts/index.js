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
	render: function() {
		var ingredientListItems = this.props.recipe.ingredients.map(function(ingredient) {
			return (
				<li className="ingredient" key={ingredient.name}>{ ingredient.name + " " + ingredient.quantity }</li>
			);
		})
		console.log(this.props)
		return (
			<div className="recipe">
			  <h3 className="recipeTitle">
			    {this.props.recipe.title}
			  </h3>
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