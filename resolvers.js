const fetch = require('node-fetch');

const API_URL = 'https:ghostly-witch-92778.herokuapp.com/'; //'http://localhost:1000/sa';

const Query = {
    turtle: async (parent, args, context, info) => {
        const { ScientificName } = args;
        const response = await fetch(`${API_URL}/turtles/L1/${ScientificName}`);
        const result = await response.json();
        return result;
    },

	food: async (parent, args, context, info) => {
        const { id } = args;
        const response = await fetch(`${API_URL}/foods/${id}`);
        const result = await response.json();
        return result;
    }
};

const Turtle = {
	async foods(parent, args, context, info) {
		const { ScientificName } = parent;
		const url = `${API_URL}/pairs?turtleName=${ScientificName}`;

		const ftpairs = await fetch(url).then(response => response.json());

		const arrayOfFoodPromises = ftpairs.map(p => fetch(`${API_URL}/foods/${p.foodid}`).then(res => res.json()));
			
		const foods = await Promise.all(arrayOfFoodPromises);
		return foods;
	}	
};

const Food = {
	async turtles (parent, args, context, info) {
		const { id } = parent;
		const url = `${API_URL}/pairs?foodid=${id}`;
	
		const ftpairs = await fetch(url).then(response => response.json());

		const arrayOfTurtlePromises = ftpairs.map(t => fetch(`${API_URL}/turtles/L1/${t.turtleName}`).then(res => res.json()));
			
		const turtles = await Promise.all(arrayOfTurtlePromises);
		return turtles;
	}
};

module.exports = { Query, Turtle, Food };