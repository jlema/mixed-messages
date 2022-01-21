let quotes
let authors = require('./authors.json')

const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args))

// Dynamic string width (adds newlines)
// From https://stackoverflow.com/questions/14484787/wrap-text-in-javascript
function wrap(s, w) {
	return s.replace(
		new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'),
		'$1\n'
	)
}

// Justify a string to the right up to the width provided
function rightJustify(s, w) {
	if (s.length < w) return new Array(Math.abs(w + 1 - s.length)).join(' ') + s
	else return s
}

// Load quotes from the philosophy quotes API
// or locally if the API is not available
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
	const wrapLength = 80
	const quotesLength = quotes.length

	// get a random author, philosophy, quote and year
	const randSource = quotes[Math.floor(Math.random() * quotesLength)].source
	const randPhilosophy =
		quotes[Math.floor(Math.random() * quotesLength)].philosophy
	const randQuote = quotes[Math.floor(Math.random() * quotesLength)].quote
	const randAuthor = authors[Math.floor(Math.random() * authors.length)]
	let randYear =
		randAuthor.born +
		Math.floor(Math.random() * Math.abs(randAuthor.born - randAuthor.died))
	if (randYear < 0) randYear = `${-randYear} BC`
	const wrappedQuote = wrap(randQuote, wrapLength)

	// log a nicely formatted string with the 4 elements above
	console.log(
		`${wrappedQuote}\n${rightJustify(
			randSource + ', scholar of ' + randPhilosophy + ', ' + randYear,
			Math.min(wrappedQuote.length, wrapLength)
		)}`
	)
})()
