var defaultIngredients = [
	"Barley", "Wheat", "Cheese", "Extract"
]

var RecipeFormContainer = React.createClass({
	getInitialState: function(){
		return {
			open: false,
			class: ""
		}
	},
	handleClick: function(){
	  if(this.state.open) {
	    this.setState({
	      open: false,
	      class: ""
	    });
	  }else{
	    this.setState({
	      open: true,
	      class: "open"
	    });
	  }
	},
	render: function(){
		return (
			<div className={this.state.class}>
				<div id="show-recipe-form" onClick={this.handleClick} className="sectionhead btn btn-primary">Create a Recipe</div>
				<RecipeForm />
			</div>
		)
	}
})

var emptyRecipe = {
	ingredients: [],
	recipeName: "",
	description: ""
}

var RecipeForm = React.createClass({
  getInitialState: function() {
  	return emptyRecipe;
  },
  createRecipe: function() {
  	if(!this.state.recipeName || !this.state.description || !this.state.ingredients) return;
  	$.post("/api/recipes", this.state,function(data, err) {})
  	this.setState(emptyRecipe);
  	this.setState({ ingredients: [] });
  },
  handleUserInput: function(fieldName, value) {
  	console.log('fieldName: ',fieldName)
  	console.log('value: ',value)
  	this.setState({
  		[fieldName]: value
  	});
  },
  render: function() {
  	return (
  		<div className="articlewrap" id="recipe-form">
  			<NameInput field="name" recipeName={this.state.recipeName} onUserInput={this.handleUserInput}></NameInput>
  			<DescriptionInput field="description" description={this.state.description} onUserInput={this.handleUserInput}></DescriptionInput>
  			<IngredientsSection field="ingredients" ingredients={this.state.ingredients} onUserInput={this.handleUserInput}></IngredientsSection>
  			<button id="create-recipe-button" className="btn btn-success" onClick={this.createRecipe}>Create Recipe</button>
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
			<form id="ingredients-section" onSubmit={this.handleSubmit}>
				<div className="input-group">
					<label>Ingredients</label>
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
				<ul className="ingredients-list">
					{this.props.ingredients.map(function(i, index){
						return (
							<li className="ingredient" key={index}>-{i}</li>
						)
					})}
				</ul>
			</form>
		)
	}
})

// var InstructionsSection = React.createClass({
// 	handleChange: function() {

// 	},
// 	render: function() {
// 		return (
// 			<div className="instructionsSection">
// 				<input onChange={this.handleChange}
// 			</div>
// 		)
// 	}
// })

ReactDOM.render(
  <RecipeFormContainer />,
  document.getElementById('new-recipe-form')
);