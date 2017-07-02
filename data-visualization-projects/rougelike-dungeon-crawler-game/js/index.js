"use strict";

// React component model
// App
// --Panel
// --Game
var App = React.createClass({
	displayName: "App",

	getInitialState: function getInitialState() {
		return { panelData: { attack: 5, health: 100, weapon: "none", level: 0 } };
	},
	updatePanelData: function updatePanelData(data) {
		this.setState({ panelData: data });
	},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "app container" },
			React.createElement(Panel, { ref: "panel", panelData: this.state.panelData }),
			React.createElement(Game, { ref: "game", updatePanelData: this.updatePanelData, panelData: this.state.panelData })
		);
	}
});

var Panel = React.createClass({
	displayName: "Panel",

	render: function render() {
		return React.createElement(
			"div",
			{ className: "gamePanel" },
			React.createElement(
				"div",
				{ className: "col-xs-12 text-center" },
				React.createElement(
					"h3",
					{ id: "logo" },
					"Roguelike Dungeon Crawler Game"
				)
			),
			React.createElement(
				"div",
				{ className: "col-xs-12" },
				React.createElement(
					"div",
					{ className: "col-xs-3 text-center" },
					"Health: ",
					React.createElement(
						"span",
						{ className: "health" },
						this.props.panelData.health
					)
				),
				React.createElement(
					"div",
					{ className: "col-xs-3 text-center" },
					"Weapon: ",
					React.createElement(
						"span",
						{ className: "weapon" },
						this.props.panelData.weapon
					)
				),
				React.createElement(
					"div",
					{ className: "col-xs-3 text-center" },
					"Attack: ",
					React.createElement(
						"span",
						{ className: "attack" },
						this.props.panelData.attack
					)
				),
				React.createElement(
					"div",
					{ className: "col-xs-3 text-center" },
					"level: ",
					React.createElement(
						"span",
						{ className: "level" },
						this.props.panelData.level
					)
				)
			)
		);
	}
});

var Game = React.createClass({
	displayName: "Game",

	getInitialState: function getInitialState() {
		var levels = this.createLevel();
		return { levels: levels, currentLevel: 0, playerPos: { x: 24, y: 1 }, playerProps: this.props.panelData };
	},
	getPanelData: function getPanelData() {
		return { attack: this.state.attack, health: this.state.health, weapon: this.state.weapon, level: this.state.level };
	},
	createLevel: function createLevel() {
		//51*26
		var levels = [[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]];

		levels.push([]);
		levels[0].forEach(function (arr) {
			levels[1].push(arr.slice(0).reverse());
		});

		levels.push([]);
		for (var k = levels[1]["length"] - 1; k >= 0; k--) {
			levels[2].push(levels[1][k].slice(0));
		}
		return this.createActors(levels);
	},
	createActors: function createActors(levelsArr) {
		var levels = levelsArr.slice(0);
		this.enemiesType = {
			31: { life: 70, harm: 10 },
			32: { life: 60, harm: 15 },
			33: { life: 55, harm: 30 },
			34: { life: 45, harm: 20 },
			35: { life: 35, harm: 25 },
			36: { life: 30, harm: 35 },
			37: { life: 20, harm: 30 },
			6: { life: 400, harm: 50 }
		};
		levels = levels.map(function (arr, k) {
			if (!this.enemies) this.enemies = [];
			this.enemies.push([]);
			var level = arr.slice(0);
			var hc = 7,
			    ec = 7,
			    wc = 7,
			    gc = 1,
			    h = true,
			    e = true,
			    w = true,
			    b = true,
			    g = true;

			for (var i = 0; i < level.length; i++) {
				h = true, e = true, w = true, g = true;
				for (var j = 0; j < level[0].length; j++) {

					if (Math.random() > .95 && h && level[i][j] === 1 && hc > 0 && (hc < 3 ? i > 15 : true)) {
						level[i][j] = 2;
						hc--;
						h = false;
					} else if (Math.random() < .05 && e && level[i][j] === 1 && ec > 0 && (hc < 3 ? i > 15 : true)) {
						var elem = 3 * 10 + ec;
						level[i][j] = elem;
						ec--;
						e = false;
						this.enemies[k].push({ x: i, y: j, life: this.enemiesType[elem].life, id: elem, harm: this.enemiesType[elem].harm });
					} else if (Math.random() > .95 && w && level[i][j] === 1 && wc > 0 && (i > 14 || i < 5)) {
						var elem = 4 * 10 + wc;
						level[i][j] = elem;
						wc--;
						w = false;
					} else if (Math.random() > .95 && g && level[i][j] === 1 && gc > 0 && i > 15 && j > 30 && k < 2) {
						level[i][j] = 5;
						g = false;
						gc--;
					}

					if (k === 2 && b && level[i][j] === 1 && Math.random() < .02 && j < 10) {
						level[i][j] = 6, b = false;
						this.enemies[k].push({ x: i, y: j, life: this.enemiesType[6].life, id: 6, harm: this.enemiesType[6].harm });
					}
				}
			}

			return level;
		}, this);
		return levels;
	},
	componentDidMount: function componentDidMount() {
		this.weapons = {
			41: { name: "whip", attack: 20 },
			42: { name: "knife", attack: 30 },
			43: { name: "dagger", attack: 35 },
			44: { name: "spear", attack: 40 },
			45: { name: "axe", attack: 55 },
			46: { name: "hammer", attack: 60 },
			47: { name: "sword", attack: 65 }
		};
		window.addEventListener('keydown', this.eventHandler);
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener('keydown', this.eventHandler);
	},
	getClassNames: function getClassNames(str, elem) {
		var newClass = "";
		elem = elem.toString()[0];
		if (elem === "0") newClass = " wall";else if (elem === "1") newClass = " movable";else if (elem === "2") newClass = " healthb";else if (elem === "3") newClass = " enemyb";else if (elem === "4") newClass = " weaponb";else if (elem === "5") newClass = " gate";else if (elem === "6") newClass = " boss";else if (elem === "9") newClass = " player";

		return str + newClass;
	},
	eventHandler: function eventHandler(event) {

		var arrowCodes = { 37: "left", 38: "up", 39: "right", 40: "down" };
		var pressed = Object.create(null);
		if (arrowCodes.hasOwnProperty(event.keyCode)) {
			var lev = this.state.currentLevel;
			var px = this.state.playerPos.x;
			var py = this.state.playerPos.y;
			if (arrowCodes[event.keyCode] === "left") {
				// checking for wall
				var elem = this.state.levels[lev][px][py - 1];
				if (!elem) return;
				// movable block
				else if (elem === 1) this.move("left");
					// health
					else if (elem === 2) {
							var obj = this.updatePlayerProps("left", "health", elem);
							this.props.updatePanelData(obj);
						}
						// enemies
						else if (elem.toString()[0] === "3" || elem === 6) {
								this.fightEnemy("left", elem);
							}
							// gate
							else if (elem === 5) {

									var levelNo = (this.state.currentLevel + 1) % 3;
									var pos = {};
									if (levelNo === 1) pos = { x: 24, y: 49 };else if (levelNo === 2) pos = { x: 1, y: 49 };else if (levelNo === 0) pos = { x: 24, y: 1 };
									var levels = this.state.levels.slice(0);
									levels[lev][px][py] = 1;
									this.setState({ levels: levels, playerPos: pos, currentLevel: levelNo });
								}
								// weapons
								else if (elem.toString()[0] === "4") {
										var obj = this.updatePlayerProps("left", "weapon", elem);
										this.props.updatePanelData(obj);
									}
			} else if (arrowCodes[event.keyCode] === "right") {
				var elem = this.state.levels[lev][px][py + 1];
				if (!elem) return;
				// movable block
				else if (elem === 1) this.move("right");
					// health
					else if (elem === 2) {
							var obj = this.updatePlayerProps("right", "health", elem);
							this.props.updatePanelData(obj);
						}
						// enemies
						else if (elem.toString()[0] === "3" || elem === 6) {
								this.fightEnemy("right", elem);
							}
							// gate
							else if (elem === 5) {

									var levelNo = (this.state.currentLevel + 1) % 3;
									var pos = {};
									if (levelNo === 1) pos = { x: 24, y: 49 };else if (levelNo === 2) pos = { x: 1, y: 49 };else if (levelNo === 0) pos = { x: 24, y: 1 };

									var levels = this.state.levels.slice(0);
									levels[lev][px][py] = 1;
									this.setState({ levels: levels, playerPos: pos, currentLevel: levelNo });
								}
								// weapon
								else if (elem.toString()[0] === "4") {
										var obj = this.updatePlayerProps("right", "weapon", elem);
										this.props.updatePanelData(obj);
									}
			} else if (arrowCodes[event.keyCode] === "down") {
				var elem = this.state.levels[lev][px + 1][py];
				if (!elem) return;else if (elem === 1) this.move("down");else if (elem === 2) {
					var obj = this.updatePlayerProps("down", "health", elem);
					this.props.updatePanelData(obj);
				}

				// enemies
				else if (elem.toString()[0] === "3" || elem === 6) {
						this.fightEnemy("down", elem);
					} else if (elem === 5) {

						var levelNo = (this.state.currentLevel + 1) % 3;
						var pos = {};
						if (levelNo === 1) pos = { x: 24, y: 49 };else if (levelNo === 2) pos = { x: 1, y: 49 };else if (levelNo === 0) pos = { x: 24, y: 1 };

						this.setState({ playerPos: pos, currentLevel: levelNo });
					} else if (elem.toString()[0] === "4") {
						var obj = this.updatePlayerProps("down", "weapon", elem);
						this.props.updatePanelData(obj);
					}
			} else if (arrowCodes[event.keyCode] === "up") {
				var elem = this.state.levels[lev][px - 1][py];
				if (!elem) return;else if (elem === 1) this.move("up");else if (elem === 2) {
					var obj = this.updatePlayerProps("up", "health", elem);
					this.props.updatePanelData(obj);
				}
				// enemies
				else if (elem.toString()[0] === "3" || elem === 6) {
						this.fightEnemy("up", elem);
					} else if (elem === 5) {

						var levelNo = (this.state.currentLevel + 1) % 3;
						var pos = {};
						if (levelNo === 1) pos = { x: 24, y: 49 };else if (levelNo === 2) pos = { x: 1, y: 49 };else if (levelNo === 0) pos = { x: 24, y: 1 };

						var levels = this.state.levels.slice(0);
						levels[lev][px][py] = 1;
						this.setState({ levels: levels, playerPos: pos, currentLevel: levelNo });
					} else if (elem.toString()[0] === "4") {
						var obj = this.updatePlayerProps("up", "weapon", elem);
						this.props.updatePanelData(obj);
					}
			}
			event.preventDefault();
		}
	},
	move: function move(dir) {
		var levels = this.state.levels.slice(0);
		var px = this.state.playerPos.x;
		var py = this.state.playerPos.y;
		levels[this.state.currentLevel][px][py] = 1;
		if (dir === "up") {
			px -= 1;
		} else if (dir === "down") {
			px += 1;
		} else if (dir === "left") {
			py -= 1;
		} else if (dir === "right") {
			py += 1;
		}
		levels[this.state.currentLevel][px][py] = 9;
		this.updateState(levels, { x: px, y: py });
	},

	updatePlayerProps: function updatePlayerProps(dir, otherProp, actor) {
		var obj = this.props.panelData;
		if (otherProp === "health") {
			obj[otherProp] += 20;
			this.move(dir, obj);
		} else if (otherProp === "weapon") {
			obj[otherProp] = this.weapons[actor]["name"];
			obj["attack"] = this.weapons[actor]["attack"];
			this.move(dir, obj);
		}
		return obj;
	},

	updateState: function updateState(levels, playerPos) {
		this.setState({ levels: levels, playerPos: playerPos });
	},
	removeEnemy: function removeEnemy(dir) {
		var px = this.state.playerPos.x;
		var py = this.state.playerPos.y;
		var levels = this.state.levels.slice(0);
		if (dir === "up") {
			px -= 1;
		} else if (dir === "down") {
			px += 1;
		} else if (dir === "left") {
			py -= 1;
		} else if (dir === "right") {
			py += 1;
		}
		levels[this.state.currentLevel][px][py] = 1;
		this.setState({ levels: levels });
	},
	fightEnemy: function fightEnemy(dir, elem) {
		this.enemies[this.state.currentLevel] = this.enemies[this.state.currentLevel].map(function (arrElem) {

			var data = this.props.panelData;
			if (arrElem.id === elem) {
				console.log("before", arrElem.life);
				arrElem.life -= this.props.panelData.attack;
				data.health -= arrElem.harm;
				console.log("after", arrElem.life);
				this.props.updatePanelData(data);
				if (data.health <= 0) showResult("loose");
			}
			if (arrElem.life <= 0) {
				data = this.props.panelData;
				data.level += arrElem.harm;
				this.props.updatePanelData(data);
				this.removeEnemy(dir);
				if (arrElem.id === 6) showResult("win");
			}
			return arrElem;
		}, this);
	},
	render: function render() {
		var level = [],
		    arr = [];
		for (var i = 0; i < this.state.levels[this.state.currentLevel]["length"]; i++) {
			arr = [];
			for (var j = 0; j < this.state.levels[this.state.currentLevel][0]["length"]; j++) {
				var elem = this.state.levels[this.state.currentLevel][i][j];
				arr.push(React.createElement("td", { className: this.getClassNames("block", elem) }));
			}
			level.push(React.createElement(
				"tr",
				{ className: "levelRow" },
				arr
			));
		}
		return React.createElement(
			"div",
			{ className: "gameContainer" },
			React.createElement(
				"table",
				{ className: "game text-center" },
				level
			)
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));

function showResult(res) {
	ReactDOM.unmountComponentAtNode(document.getElementById('app'));
	if (res === "win") var text = "You Won!";else if (res === "loose") var text = "You Died :(";

	var rh = document.body.appendChild(document.createElement("h1"));
	rh.className = "result " + res;
	rh.innerHTML = text;
}