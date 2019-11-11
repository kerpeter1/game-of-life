$(() => {
    settings();
    addEventListeners();
})

var fields;
var mapHeight;
var mapWidth;
var countOfPopulations;
var overpopulationLimit;

function settings() {

    mapHeight = 65;
    mapWidth = 150;
    fieldSize = 10;

    countOfPopulations = parseInt($('#population-count').val());
    overpopulationLimit = parseInt($('#overpopulation-limit').val());
}


//overpopulation-limit
//population-count

function initMap() {

    $('#map').children().remove();

    let width = mapWidth * fieldSize;
    $('#map').css('max-width', `${width}px`);

    for (let row = 0; row < mapHeight; row++) {
        for (let column = 0; column < mapWidth; column++) {
            let $newField = $('<div><div>');
            $newField.attr("id", row + "_" + column);

            $newField.addClass('field');

            if (row === 0 || row === mapHeight - 1 ||
                column === 0 || column === mapWidth - 1) {
                $newField.data('terrain', 'water');
            } else {
                $newField.data('terrain', 'land');
            }

            $('#map').append($newField);
        }
    }
}

function addPopulations() {

    fields = [];

    for (let row = 0; row < mapHeight; row++) {
        let arr = [];
        for (let column = 0; column < mapWidth; column++) {
            let rnd = Math.floor(Math.random() * (countOfPopulations + 5)) + 1;
            if (rnd > countOfPopulations ||
                row === 0 || row === mapHeight - 1 || column === 0 ||
                column === mapWidth - 1) {
                arr[column] = 0;
            } else {
                arr[column] = rnd;
            }
        }
        fields[row] = arr;
    }
}

function addEventListeners() {
    var roundInterval;

    $('#start-button').click(function () {
        $('#new-button').removeClass('d-none');
        $('#start-button').addClass('d-none');
        $('#stop-button').removeClass('d-none');
        settings();
        addPopulations();
        initMap();
        roundInterval = setInterval(function () {
            nextRound();
            redrawMap();
        }, 500);
    });

    $('#continue-button').click(function () {
        $('#continue-button').addClass('d-none');
        $('#stop-button').removeClass('d-none');
        roundInterval = setInterval(function () {
            nextRound();
            redrawMap();
        }, 500);
    });

    $('#stop-button').click(function () {
        $('#stop-button').addClass('d-none');
        $('#continue-button').removeClass('d-none');
        clearInterval(roundInterval);
    })

    $('#new-button').click(function () {
        $('#new-button').addClass('d-none');
        $('#start-button').removeClass('d-none');
        $('#stop-button').addClass('d-none');
        $('#continue-button').addClass('d-none');
        clearInterval(roundInterval);
    })
}