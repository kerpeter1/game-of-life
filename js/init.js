$(() => {
    settings();
    initMap();
    addPopulations();
    redrawMap();
    /*setInterval(function () {
        nextRound();
        redrawMap();
    }, 500)*/
})

var fields;
var mapHeight;
var mapWidth;
var countOfPopulations;

function settings() {
    mapHeight = 75;
    mapWidth = 2 * mapHeight;
    fieldSize = 10;
    countOfPopulations = 2;
}

function initMap() {
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