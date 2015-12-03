var defaultIngredients = [
	"Barley", "Wheat", "Cheese", "Extract"
]

var RecipeForm = React.createClass({
  render: function() {
  	return (
  		<div className="recipeForm">
  			<div className="form-group">
	  			<label htmlFor="name">Recipe Name:</label>
	  			<input type="text" className="form-control" id="name" />
  			</div>
  			<div className="form-group">
	  			<label htmlFor="description">Description:</label>
	  			<input type="text" className="form-control" id="description" />
  			</div>
  			<IngredientsSection></IngredientsSection>
  		</div>
  	)
  }
});

var IngredientsSection = React.createClass({
	getInitialState: function() {
		return {
			ingredient: "",
			ingredientsList: []
		}
	},
	handleSubmit: function(e) {
		e.preventDefault();
		if(!this.state.ingredient) {
			return;
		} else {
			this.addIngredient();
			this.setState({ingredient: ""});
		}
	},
	updateIngredient: function(e) {
		this.setState({ingredient: e.target.value.trim()});
	},
	addIngredient: function() {
		var newList = this.state.ingredientsList;
		newList.push(this.state.ingredient);
		this.setState({
			ingredientsList: newList
		});
	},
	render: function(){
		return (
			<form className="ingredientsSection" onSubmit={this.handleSubmit}>
				<div className="input-group">
				  <input type="text" value={this.state.ingredient} onChange={this.updateIngredient} className="form-control" placeholder="Search for ingredients..." />
				  <span className="input-group-btn">
				    <button className="btn btn-default" type="submit">Add</button>
				  </span>
				</div>
				<ul className="ingredientsList">
					{this.state.ingredientsList.map(function(i, index){
						return (
							<li key={index}>{i}</li>
						)
					})}
				</ul>
			</form>
		)
	}
})

ReactDOM.render(
  <RecipeForm />,
  document.getElementById('new-recipe-form')
);