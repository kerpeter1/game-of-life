$(() => {
    settings();
    initMap();
    addPopulations();
    console.log(fields);

})

var fields;
var mapHeight;
var mapWidth;
var countOfPopulations;

function settings() {
    mapHeight = 50;
    mapWidth = 100;
    fieldSize = 10;
    countOfPopulations = 2;
}

function initMap() {
    let width = mapWidth * fieldSize;
    $('#map').css('max-width', `${width}px`);

    for (let row = 0; row < mapHeight; row++) {
        for (let column = 0; column < mapWidth; column++) {
            let $newField = $('<div><div>');
            $newField.attr("data-row", row);
            $newField.attr("data-column", column);

            if (row === 0 || row === mapHeight - 1 || column === 0 || column === mapWidth - 1) {
                $newField.addClass('field water');
            } else {
                $newField.addClass('field land');
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
            let rnd = Math.floor(Math.random() * 5) + 1;
            if (rnd > countOfPopulations) {
                arr[column] = 0;
            } else {
                arr[column] = rnd;
            }
        }
        fields[row] = arr;
    }
}