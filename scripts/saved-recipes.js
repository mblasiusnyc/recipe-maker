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
				<li className="ingredient" key={ingredient}>-{ingredient}</li>
			);
		})
		return (
			<div className={this.state.class}>
				<div className="sectionhead" onClick={this.handleClick}>
				  <p className="recipe-title">
				    {this.props.recipe.recipeName}
				  </p>
			  </div>
			  <div className="articlewrap">
				  <p className="recipe-description">{this.props.recipe.description}</p>
				  <ul className="ingredients-list">
					  <p className="ingredients-title">Ingredients: </p>
				  	{ingredientListItems}
				  </ul>
			  </div>
			</div>
		)
	}
})

var RecipeList = React.createClass({
	getInitialState: function() {
		return {
			recipes: []
		}
	},
	componentDidMount: function() {
		this.loadRecipes();
		setInterval(this.loadRecipes, 5000);
	},
	loadRecipes: function() {
		var self = this;
		$.get(this.props.getUrl, function(data) {
			console.log(data)
			if(data === JSON.stringify(this.state)) {
				return
			} else {
				self.setState({
					recipes: JSON.parse(data)
				})
			}
		})
	},
  render: function() {
  	var recipeNodes = this.state.recipes.map(function(recipe) {
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
  <RecipeList getUrl="api/recipes" />,
  document.getElementById('recipe-list')
);