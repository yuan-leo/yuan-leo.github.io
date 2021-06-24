function showDialog(cardName) {
    $('.dialog').show();

    if (cardName) {
        $('.dialog .detail.' + cardName).show();
    }

    isDialogOpen = true;
}

function hideDialog() {
    $('.dialog').hide();
    $('.dialog .detail').hide();
    isDialogOpen = false;
}

function toggleDialog() {
    if (isDialogOpen) {
        hideDialog();
    } else {
        showDialog();
    }
}

function setupDialog() {
    isDialogOpen = false;
    $('.dialog').click(function(event) {
        if (event.target !== this)
            return;
        toggleDialog();
    });
}

var isDialogOpen;


window.addEventListener("load", function() {
    setupDialog();
});