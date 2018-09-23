var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Problems look mighty small from 150 miles up"
]

/*eslint no-undef: "warn"*/
exports.getFortune = function() {
  var idx = Math.floor(Math.random() * fortunes.length)
  return fortunes[idx]
}
  