$(() => {
    settings();
    initMap();
})

var fields;
var mapHeight;
var mapWidth;

function settings() {
    mapHeight = 50;
    mapWidth = 100;
    fieldSize = 10;
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