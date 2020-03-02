var cards = [
  {
    id: 1,
    img: "https://clipartmag.com/image/darth-vader-cartoon-drawing-17.png"
  },
  {
    id: 1,
    img: "https://clipartmag.com/image/darth-vader-cartoon-drawing-17.png"
  },
  {
    id: 2,
    img: "http://getdrawings.com/cliparts/princess-leia-clipart-10.jpg"
  },
  {
    id: 2,
    img: "http://getdrawings.com/cliparts/princess-leia-clipart-10.jpg"
  },
  {
    id: 3,
    img: "http://getdrawings.com/cliparts/boba-fett-clipart-3.jpg"
  },
  {
    id: 3,
    img: "http://getdrawings.com/cliparts/boba-fett-clipart-3.jpg"
  },
  {
    id: 4,
    img: "https://clipartmag.com/images/luke-skywalker-cliparts-15.jpg"
  },
  {
    id: 4,
    img: "https://clipartmag.com/images/luke-skywalker-cliparts-15.jpg"
  },
  {
    id: 5,
    img: "https://clipartmag.com/images/starwars-clipart-33.jpg"
  },
  {
    id: 5,
    img: "https://clipartmag.com/images/starwars-clipart-33.jpg"
  },
  {
    id: 6,
    img: "https://clipartmag.com/images/yoda-clipart-17.png"
  },
  {
    id: 6,
    img: "https://clipartmag.com/images/yoda-clipart-17.png"
  },
  {
    id: 7,
    img: "https://clipartmag.com/images/luke-skywalker-cliparts-30.png"
  },
  {
    id: 7,
    img: "https://clipartmag.com/images/luke-skywalker-cliparts-30.png"
  },
  {
    id: 8,
    img:
      "https://www.paintingwithdiamondskits.com/assets/images/Obi-wan%20Kenobi%20Star%20Wars%20Painting.jpg"
  },
  {
    id: 8,
    img:
      "https://www.paintingwithdiamondskits.com/assets/images/Obi-wan%20Kenobi%20Star%20Wars%20Painting.jpg"
  },
  {
    id: 9,
    img: "https://i.ya-webdesign.com/images/bb8-clipart-storm-trooper-1.png"
  },
  {
    id: 9,
    img: "https://i.ya-webdesign.com/images/bb8-clipart-storm-trooper-1.png"
  }
]

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}
shuffle(cards)
const front = "./starwarsFront.png"
var html = cards.map(
  item =>
    `
    <div class="card" id='${item.id}'>
      <div class="front"></div>
      <div class="back"><img src="${item.img}"/></div>
    </div>
    `
)

$("#memory").html(html)
$("#memory")
  .find(".card")
  .flip()

var card1 = ""
var card2 = ""
var lives = 9
var matched = []
$(".lives").html(`You have ${lives} lives left!!`)

$(".card").on("click", function() {
  $(this).addClass("flipped")
  if (card1 == "") {
    card1 = $(this).attr("id")
  } else {
    card2 = $(this).attr("id")
  }
  setTimeout(() => {
    if (card1 === card2 && card1 !== "" && card2 !== "") {
      $(this)
        .removeClass("flipped")
        .addClass("match")
      $(this)
        .siblings()
        .find("+ .flipped")
        .removeClass("flipped")
        .addClass("match")
      matched.push(this)
      card1 = ""
      card2 = ""
    } else if (card1 !== card2 && card1 !== "" && card2 !== "") {
      $(".match").off(".flip")
      setTimeout(() => {
        $(".flipped").flip(false)
      }, 500)

      setTimeout(() => {
        $(this).removeClass("flipped")
        $(this)
          .siblings()
          .removeClass("flipped")
      }, 600)
      lives--
      $(".lives").html(`You have ${lives} lives left!!`)

      card1 = ""
      card2 = ""
    }
  }, 100)
  setTimeout(() => {
    if (matched.length === 9 && lives >= 0) {
      console.log("winner")
      window.location.href = "winner.html"
    } else if (matched.length < 9 && lives == 0) {
      console.log("loser")
      window.location.href = "loser.html"
    }
  }, 700)
})
