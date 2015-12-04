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
			ingredientsList: [],
			ingredientMatches: []
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
		var newMatches = [];
		for(var i=0; i<defaultIngredients.length; i++) {
			if(e.target.value && defaultIngredients[i].toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
				newMatches.push(defaultIngredients[i])
			}
		}
		this.setState({
			ingredient: e.target.value,
			ingredientMatches: newMatches
		})
	},
	addIngredient: function(suggestion) {
		var newList = this.state.ingredientsList;
		if(suggestion) {
			newList.push(suggestion);
		} else {
			newList.push(this.state.ingredient.trim());
		}
		this.setState({
			ingredientsList: newList
		});
	},
	handleSuggestionClick: function(suggestion) {
		this.addIngredient(suggestion);
		this.setState({
			ingredient: "",
			ingredientMatches: []
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
		  	<ul className="suggestionsList">
	  			{this.state.ingredientMatches.map(function(suggestion, index){
		  			return (
		  				<li onClick={this.handleSuggestionClick.bind(this, suggestion)} className="suggestion form-control" key={index}>{suggestion}</li>
		  			)
	  			},this)}
		  	</ul>
				<ul className="ingredientsList">
					{this.state.ingredientsList.map(function(i, index){
						return (
							<li key={index}>{index+1}. {i}</li>
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