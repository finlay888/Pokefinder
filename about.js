
//obtaining query string for pokemon url from page url

let queryString = new URLSearchParams(window.location.search);
let url = queryString.get("extra");
loadPokemon(url)


//function for loading pokemon data

async function loadPokemon(url){
	try {
		const response = await fetch(url)
		const data = await response.json()
		setUI(data)
		} catch {
		document.getElementById("destination").innerHTML = "No Pokemon found under that name :("
	}
}

//function for setting about page UI

function setUI(data){
	console.log(data)
	document.getElementById("name").innerHTML = data.forms[0].name
	document.getElementById("image").src = data.sprites.versions["generation-v"]["black-white"].animated.front_default
	document.getElementById("image-back").src = data.sprites.versions["generation-v"]["black-white"].animated.back_default
	document.getElementById("type").innerHTML = typeGenerator(data.types)
	statsGenerator(data.stats)
}

//Pokemon type generator

function typeGenerator(types){
	let type = "Type : ";
	for(i in types){
		type += (types[i].type.name.toUpperCase() + " ")
	}
	console.log(type);
	return type;
}

//Pokemon stats generator

function statsGenerator(stats){
	for(i in stats){
		let stat = stats[i].stat.name.toUpperCase() + " : " + stats[i].base_stat
		document.getElementById("stats").innerHTML += `<li>${stat}</li>`
	}
}

