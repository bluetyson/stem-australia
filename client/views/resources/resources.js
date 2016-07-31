Session.set("resourcesState", "GRAPH");

Template.resources.helpers({

	active: function(section){
		return Session.equals("resourcesState", section);
	},

	births: function(){
		return Math.round(Session.get("birthTotal"));
	},

	deaths: function(){
		return Math.round(Session.get("deathTotal"));
	},

	population: function(){
		return Math.round(Session.get("populationTotal"));
	},

	time: function(){
		return Session.get("populationTime");
	}

});

Template.resources.events({

	"click .section-trigger": function (e) {
		Session.set("resourcesState", e.target.dataset.section);
	},

	"change .projection-select": function (e) {
		PopulationClock.speedMultiplier = e.target.value;
	}

});

Template.resources.onRendered(function(){
	Resources.init();
	PopulationClock.init();
});

Resources = {

	map: null,

	init: function(){
		this.initMap();
	},

	initMap: function(){

		L.Icon.Default.imagePath = '/leaflet';
		var CartoDB_DarkMatterNoLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
			subdomains: 'abcd',
			maxZoom: 19
		});

		this.map = L.map('resources-map', {
			layers: [ CartoDB_DarkMatterNoLabels ]
		}).setView([-20, 137], 4);

	}
};