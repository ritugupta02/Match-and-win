let cards = document.querySelectorAll('.card_inner')
const cscore = document.querySelector('.cscore')
const cmove = document.querySelector('.cmove')
//let firstClick = false
let cardPair = []

var score = 0;
var move = 32;
cmove.innerHTML = move;
cscore.innerHTML = score;

cards.forEach((card) => {
    card.state = 'unclicked'
})

shuffle()


for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => {
        if (move == 0) {
            moveover()
        }
        move -= 1;
        cmove.innerHTML = move;

        if (cards[i].state == 'unclicked') {
            cards[i].style.transform = 'rotateY(180deg)'
            cards[i].state = 'clicked'
            cardPair.push(cards[i])
            check()
        }

        else if (cards[i].state == 'clicked') {
            cards[i].style.transform = 'rotateY(0deg)'
            cards[i].state = 'unclicked'
            cardPair = []
        }
    })
}

function check() {
    if (cardPair.length == 2) {
        if (cardPair[0].querySelector('img').src == cardPair[1].querySelector('img').src) {
            matched()
        }
        else {
            unmatched(cardPair[0], cardPair[1])
        }
    }
}

function matched() {

    cardPair[0].style.display = 'none'
    cardPair[1].style.display = 'none'
    cardPair = []
    score += 1;
    cscore.innerHTML = score;


    if (score == 8) {
        scoreachived();
    }
}

function unmatched(x, y) {
    setTimeout(() => {
        x.state = 'unclicked'
        y.state = 'unclicked'
        x.style.transform = "rotateY(0deg)"
        y.style.transform = "rotateY(0deg)"
    }, 750)
    cardPair[0].state = 'blocked'
    cardPair[1].state = 'blocked'
    cardPair = []

    //move -= 2;
    //cmove.innerHTML = move;


}

function shuffle() {
    let images = document.querySelectorAll('img')
    let srcs = ['all-might.png', 'all-might.png', 'deku.png', 'deku.png', 'L.png', 'L.png', 'light.png', 'light.png', 'momo2.png', 'momo2.png', 'naruto.png', 'naruto.png', 'saitama.png', 'saitama.png', 'uraraka.png', 'uraraka.png']

    for (let i = srcs.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let temp = srcs[i]
        srcs[i] = srcs[j]
        srcs[j] = temp
    }

    for (let i = 0; i < images.length; i++) {
        images[i].src = srcs[i]
    }
}

function scoreachived() {
    alert(`congratulations!!\n You won.`)
    location.reload();

}

function moveover() {
    alert(`GameOver! \n You have run out of moves.`)
    location.reload();
}