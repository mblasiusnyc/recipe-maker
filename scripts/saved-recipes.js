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
		}],
		instructions: [
			"Light the beer on fire", "celebrate!"
		]
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
		}],
		instructions: [
			"Go have lunch", "come back", "eat the beer"
		]
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
		var instructionListItems = this.props.recipe.instructions.map(function(instruction, index) {
			return (
				<li className="instruction" key={index}>{index+1}. {instruction}</li>
			)
		});
		return (
			<div className={this.state.class}>
				<div className="sectionhead" onClick={this.handleClick}>
				  <h3 className="recipeTitle">
				    Title: {this.props.recipe.title}
				  </h3>
			  </div>
			  <div className="articlewrap">
				  <h4 className="recipeDescription">Description: {this.props.recipe.description}</h4>
				  <ul className="ingredientsList">
					  <h4 className="ingredientsTitle">Ingredients</h4>
				  	{ingredientListItems}
				  </ul>
			    <ul className="instructionsList">
			  	  <h4 className="instructionsTitle">Instructions</h4>
			    	{instructionListItems}
			    </ul>
			  </div>
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