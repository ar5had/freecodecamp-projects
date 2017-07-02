"use strict";

// React component Model
// -->Container
// ---->ButtonSection
// ------>AddButton
// ---->ModalSection
// ---->RecipeSection
// ------>Recipe
// -------->Ingredients

var App = React.createClass({
  displayName: "App",

  getInitialState: function getInitialState() {
    return { recipies: [], localKeys: localStorage.arshdkhn1keys ? localStorage.arshdkhn1keys : "Apple pie|Another Apple pie", showModal: false, isEditing: false, editingRecipeId: null };
  },
  alotId: function alotId() {
    return Math.floor(Math.random() * 1000000000 + 1);;
  },
  removeRecipe: function removeRecipe(id) {
    var stateVar = this.state.recipies;
    var targetName = "";
    stateVar = stateVar.map(function (elem) {
      if (elem.id.toString() === id) {
        targetName = elem.name;
        elem.showRecipe = false;
      }
      return elem;
    });

    var keys = this.state.localKeys.split("|");

    var index = keys.indexOf(targetName);
    console.log("Keys", keys, "index", index);
    if (index !== -1) {
      localStorage.removeItem(keys[index]);
      keys.splice(index, 1);
      keys = keys.join("|");
    }
    this.setState({ recipies: stateVar, localKeys: keys });
  },
  openModal: function openModal(isEditing, id) {
    if (isEditing === "editMode") this.setState({ showModal: true, isEditing: true, editingRecipeId: id });else this.setState({ showModal: true });
    setTimeout(function () {
      $(".recipeModal").removeClass("mainModal");
      $(".modalBackground").removeClass("mainModal");
    }, 200);
  },
  editModal: function editModal(name, id) {
    this.openModal("editMode", id);
    var parent_this = this;
    setTimeout(function () {
      document.getElementById("nameInput").value = name;
      var elem = parent_this.state.recipies.filter(function (recipe) {
        if (recipe.name === name) return true;
      });
      document.getElementById("ingredientsInput").value = elem[0]["ingredients"].join(", ");
    }, 200);
  },
  closeModal: function closeModal() {
    $(".recipeModal").addClass("mainModal");
    $(".modalBackground").addClass("mainModal");
    var parent_this = this;
    setTimeout(function () {
      parent_this.setState({ showModal: false, isEditing: false, editingRecipeId: null });
    }, 400);
  },
  closeAndSave: function closeAndSave(name, ingredients, localKeys) {

    var parent_this = this;
    var id = this.alotId();
    var state = this.state.recipies;
    state.push({ id: id, showRecipe: true, name: name, ingredients: ingredients });

    $(".recipeModal").addClass("mainModal");
    $(".modalBackground").addClass("mainModal");

    setTimeout(function () {
      if (localKeys) parent_this.setState({ recipies: state, localKeys: localKeys, showModal: false });else parent_this.setState({ recipies: state, showModal: false });
    }, 400);
  },
  getRecipeObj: function getRecipeObj(name, ingredients) {
    return { id: this.alotId(), showRecipe: true, name: name, ingredients: ingredients };
  },
  getLocalStorageData: function getLocalStorageData() {
    var local = localStorage;
    var keys = local.arshdkhn1keys.split("|");
    var parent_this = this;
    var state = this.state.recipies;
    keys.forEach(function (elem) {
      var name = elem;
      if (local[elem]) {
        var ingredients = local[elem].split(",");
        state.push(parent_this.getRecipeObj(name, ingredients));
      }
    });
    this.setState({ recipies: state });
  },
  editAndSave: function editAndSave(name, ingredients, localKeys) {
    var recipies = this.state.recipies;
    var parent_this = this;
    var previousName = undefined;
    recipies = recipies.map(function (elem) {
      if (elem.id.toString() === parent_this.state.editingRecipeId && elem.showRecipe) {
        previousName = elem.name;
        elem.name = name;
        elem.ingredients = ingredients;
      }
      return elem;
    });
    localStorage.removeItem(previousName);
    localStorage.setItem(name, ingredients);
    localKeys = localKeys.split("|");
    var index = localKeys.indexOf(previousName);
    localKeys.splice(index, 1, name);
    localStorage.arshdkhn1keys = localKeys.join("|");
    //console.log("After", recipies);
    this.setState({ recipies: recipies, localKeys: localKeys.join("|"), isEditing: false, editingRecipeId: null, showModal: false });
  },
  componentDidMount: function componentDidMount() {
    if (!localStorage.arshdkhn1keys) {
      localStorage.setItem("arshdkhn1keys", "Apple pie|Another Apple pie");
      localStorage.setItem("Apple pie", "Apple, Flour, Sugar, Cream");
      localStorage.setItem("Another Apple pie", "Apple, Flour, Sugar, Cream");
    }
    this.getLocalStorageData();
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement(ButtonSection, { openModal: this.openModal }),
      React.createElement(ModalSection, { showModal: this.state.showModal, closeModal: this.closeModal, saveClick: this.state.isEditing ? this.editAndSave : this.closeAndSave, isEditingGoingOn: this.state.isEditing }),
      React.createElement(RecipeSection, { editRecipe: this.editModal, recipies: this.state.recipies, removeRecipe: this.removeRecipe })
    );
  }
});

var ButtonSection = React.createClass({
  displayName: "ButtonSection",

  render: function render() {
    return React.createElement(
      "div",
      { className: "row buttonSect" },
      React.createElement(
        "div",
        { className: "col-xs-8" },
        React.createElement(
          "h2",
          { className: "heading" },
          "Recipe Box"
        )
      ),
      React.createElement(
        "div",
        { className: "col-xs-4" },
        React.createElement(
          "button",
          { className: "addBtn bs ts", onClick: this.props.openModal },
          "Add recipe"
        )
      )
    );
  }
});

var ModalSection = React.createClass({
  displayName: "ModalSection",

  editRecipe: function editRecipe() {
    var name = document.getElementById("nameInput").value;
    var ingredients = document.getElementById("ingredientsInput").value;
    name = name ? name : "Untitled";
    ingredients = ingredients ? ingredients : "No ingredients";
    this.props.saveClick(name, ingredients.split(","), localStorage.arshdkhn1keys);
  },
  saveRecipe: function saveRecipe() {
    var name = document.getElementById("nameInput").value;
    var ingredients = document.getElementById("ingredientsInput").value;
    name = name ? name : "Untitled";
    ingredients = ingredients ? ingredients : "No ingredients";
    localStorage.setItem(name, ingredients);
    if (!localStorage.arshdkhn1keys) localStorage.setItem("arshdkhn1keys", name);else localStorage.arshdkhn1keys += "|" + name;
    this.props.saveClick(name, ingredients.split(","), localStorage.arshdkhn1keys);
  },
  render: function render() {
    var modal = this.props.showModal ? React.createElement(
      "div",
      null,
      React.createElement("div", { className: "modalBackground mainModal ts" }),
      React.createElement(
        "div",
        { className: "recipeModal bs mainModal ts" },
        React.createElement(
          "div",
          { className: "nameSect" },
          React.createElement(
            "label",
            { "for": "nameInput" },
            "Enter recipe name"
          ),
          React.createElement("input", { className: "input", placeholder: "Name", id: "nameInput" })
        ),
        React.createElement(
          "div",
          { className: "ingredientsSect" },
          React.createElement(
            "label",
            { "for": "ingredientsInput" },
            "Enter ingredients"
          ),
          React.createElement("input", { className: "input", placeholder: "Ingredients separated by comma", id: "ingredientsInput" })
        ),
        React.createElement(
          "div",
          { className: "buttonSect" },
          React.createElement(
            "button",
            { className: "saveBtn", onClick: this.props.isEditingGoingOn ? this.editRecipe : this.saveRecipe },
            "Save"
          ),
          React.createElement(
            "button",
            { className: "closeBtn", onClick: this.props.closeModal },
            "Close"
          )
        )
      )
    ) : null;
    return React.createElement(
      "div",
      null,
      modal
    );
  }
});

var RecipeSection = React.createClass({
  displayName: "RecipeSection",

  editRecipe: function editRecipe(id) {
    var stateVar = this.props.recipies;
    var targetName = "";
    stateVar.forEach(function (elem) {
      if (elem.id.toString() === id) {
        targetName = elem.name;
      }
    });
    this.props.editRecipe(targetName, id);
  },
  render: function render() {
    var recipies = [];
    var parent_this = this;
    this.props.recipies.forEach(function (elem) {
      if (elem.showRecipe) recipies.push(React.createElement(Recipe, { id: elem.id, name: elem.name, ingredients: elem.ingredients, removeRecipe: parent_this.props.removeRecipe, editRecipe: parent_this.editRecipe }));
    });
    return React.createElement(
      "div",
      { className: "recipeSect", id: "recipeSect" },
      recipies
    );
  }
});

var Recipe = React.createClass({
  displayName: "Recipe",

  handleClickOnMain: function handleClickOnMain(e) {
    if (e.target.classList.contains("deleteBtn") || e.target.classList.contains("editBtn")) {
      return;
    }
    var condition = e.currentTarget.classList.contains('opened');
    $(".opened").removeClass("opened");
    if (!condition) e.currentTarget.classList.add("opened");
  },
  remove: function remove(e) {
    this.props.removeRecipe(e.currentTarget.parentNode.parentNode.id);
  },
  edit: function edit(e) {
    this.props.editRecipe(e.currentTarget.parentNode.parentNode.id);
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "row recipe ts", onClick: this.handleClickOnMain, id: this.props.id },
      React.createElement(
        "div",
        { className: "col-xs-12 recipeHeader ts" },
        React.createElement(
          "h3",
          { className: "recipeName" },
          this.props.name
        ),
        React.createElement("span", { "data-toggle": "tooltip", className: "btn editBtn ts glyphicon glyphicon-pencil", title: "Edit", "data-placement": "top", onClick: this.edit }),
        React.createElement("span", { className: "btn deleteBtn ts glyphicon glyphicon-trash", "data-toggle": "tooltip", title: "Delete", "data-placement": "top", onClick: this.remove })
      ),
      React.createElement(
        "div",
        { className: "col-xs-12 recipeContent" },
        React.createElement(
          "h4",
          null,
          "Ingridients:"
        ),
        React.createElement(Ingredients, { data: this.props.ingredients })
      )
    );
  }
});

var Ingredients = React.createClass({
  displayName: "Ingredients",

  render: function render() {
    var ingredients = [];
    this.props.data.forEach(function (elem) {
      ingredients.push(React.createElement(
        "button",
        { className: "ingredients" },
        elem.trim()
      ));
    });
    return React.createElement(
      "div",
      { className: "ingridientsList" },
      ingredients
    );
  }
});

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
