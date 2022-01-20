let quotes
let authors = require('./authors.json')

const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args))

async function loadQuotes() {
	await fetch('https://philosophy-quotes-api.glitch.me/quotes')
		.then(response => response.json())
		.then(data => (quotes = data))
		.catch(error => {
			console.log('Attempting to load local quotes copy.')
			quotes = require('./quotes.json')
		})
}

// Demo function
;(async function () {
	await loadQuotes()

})()
