var defaultIngredients = [
	"Barley", "Wheat", "Cheese", "Extract"
]

var RecipeForm = React.createClass({
  getInitialState: function() {
  	return {
  		recipeName: "",
  		description: "",
  		ingredients: []
  	}
  },
  handleUserInput: function(fieldName, value) {
  	this.setState({
  		[fieldName]: value
  	});
  	console.log(this.state)
  },
  render: function() {
  	return (
  		<div className="recipeForm">
  			<NameInput field="name" recipeName={this.state.recipeName} onUserInput={this.handleUserInput}></NameInput>
  			<DescriptionInput field="description" description={this.state.description} onUserInput={this.handleUserInput}></DescriptionInput>
  			<IngredientsSection field="ingredients" ingredients={this.state.ingredients} onUserInput={this.handleUserInput}></IngredientsSection>
  		</div>
  	)
  }
});

var NameInput = React.createClass({
	handleChange: function() {
		this.props.onUserInput('recipeName', this.refs.nameInput.value)
	},
	render: function() {
		return (
			<div className="form-group">
				<label>Name</label>
				<input value={this.props.recipeName} type="text" ref="nameInput" onChange={this.handleChange} className="form-control" id={this.props.field} />
			</div>
		)
	}
})

var DescriptionInput = React.createClass({
	handleChange: function() {
		this.props.onUserInput('description', this.refs.descriptionInput.value)
	},
	render: function() {
		return (
			<div className="form-group">
				<label>Description</label>
				<input value={this.props.description} type="text" ref="descriptionInput" onChange={this.handleChange} className="form-control" id={this.props.field} />
			</div>
		)
	}
})


var IngredientsSection = React.createClass({
	getInitialState: function() {
		return {
			ingredient: "",
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
		var newList = this.props.ingredients;
		if(suggestion) {
			newList.push(suggestion);
		} else {
			newList.push(this.state.ingredient.trim());
		}
		this.props.onUserInput('ingredients', newList)
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
					{this.props.ingredients.map(function(i, index){
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