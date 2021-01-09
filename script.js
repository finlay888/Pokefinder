
let offset = Math.random()*1000;
getPokemon(offset)

//function gets the pokemon from poke api

async function getPokemon(offset){
	try {const link = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=6`
		const response = await fetch(link);
		const data = await response.json();
		//clearing the results
		listedPokemon = [];
		document.getElementById("destination").innerHTML = ""
		for(i in data.results){
			const url = await data.results[i].url
			const response2 = await fetch(url)
			const data2 = await response2.json()
			addPokemon(url, "destination",data2.forms[0].name, data2.sprites.versions["generation-v"]["black-white"].animated.front_default, url)
		}
	} catch {
		document.getElementById("destination").innerHTML = "No Pokemon found under that name :("
	}
	
}

async function getSpecific(pokemon){
	try {
		const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
		const response = await fetch(url)
		const data = await response.json()
		addPokemon(url, "destination", data.forms[0].name, data.sprites.versions["generation-v"]["black-white"].animated.front_default, url)
	} catch {
		document.getElementById("destination").innerHTML = "No Pokemon found under that name :("
	}
}

//putting in the pokemon to the html

function addPokemon(id, elementId, name, imgUrl, url){
	document.getElementById(elementId).innerHTML += `<div id="${id}" class="item grow shadow" onclick="viewPokemon(this.id)""> <img class="pokemonGif" src=${imgUrl}> <h2 class="capitalise">${name}</h2> </div>`;
}

//search pokemon function for search button functionality

function searchPokemon(){
	const searchValue = document.getElementById("search").value
	console.log(searchValue)
	document.getElementById("destination").innerHTML = ""
	getSpecific(searchValue)
}

//load different pokemon button functionality

function loadPreviousPokemon(){
	offset-=6;
	document.getElementById("destination").innerHTML = "<h3>Loading<h3>";
	getPokemon(offset);
}

function loadNewPokemon(){
	offset+=6;
	document.getElementById("destination").innerHTML = "<h3>Loading<h3>";
	getPokemon(offset);
}

//onClick function for pokemon cardviews

function viewPokemon(extra){
	open(`about.html?extra=${extra}`)
}
