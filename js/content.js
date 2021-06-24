/**
 * insert all of the card elements into the canvas via.
 * fixed location placement.
 * @param {Mondrian} mondrian
 */
function insertContent(mondrian) {
    var cards = document.getElementsByClassName('card');

    _.forEach(cards, function (card) {
        _(mondrian.squares).filter({ filled: false, color: undefined }).forEach(function (square) {
            if (!_.isNaN(square.area)) {
                card.style.display = "flex";
                square.filled = true;
                card.style.top = square.start.y + 'px';
                card.style.left = square.start.x + 'px';
                card.style.width = square.width + 'px';
                card.style.height = square.height + 'px';
                return false;
            }
        }).run();
    });
}

/**
 * Hide all of the cards
 */
function hideContent() {
    var cards = document.getElementsByClassName('card');

    _.forEach(cards, function (card) {
        card.style.display = "none";
        card.style.top = 0;
        card.style.left = 0;
        card.style.width = 0;
        card.style.height = 0;
    });
}
