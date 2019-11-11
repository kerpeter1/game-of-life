const DESTINY_TYPE = {
    BIRTH: 'BIRTH',
    LIVE: 'LIVE',
    DIE: 'DIE'
}

function redrawMap() {
    for (let row = 0; row < fields.length; row++) {
        for (let column = 0; column < fields[row].length; column++) {
            let id = row + "_" + column;
            let $field = $(`#${id}`);

            switch (fields[row][column]) {
                case 0:
                    $field.removeClass();
                    $field.addClass($field.data('terrain') + ' field');
                    break;
                case 1:
                    $field.removeClass();
                    $field.addClass('field pop-1');
                    break;
                case 2:
                    $field.removeClass();
                    $field.addClass('field pop-2');
                    break;
                case 3:
                    $field.removeClass();
                    $field.addClass('field pop-3');
                    break;
                case 4:
                    $field.removeClass();
                    $field.addClass('field pop-4');
                    break;
            }
        }
    }
}

function nextRound() {

    originalFields = fields.map(function (fields) {
        return fields.slice(0);
    });

    for (let row = 1; row < originalFields.length - 1; row++) {
        for (let column = 1; column < originalFields[row].length - 1; column++) {
            let d = destiny(row, column);

            if (!d) {
                fields[row][column] = originalFields[row][column];
            } else if (d.destiny === DESTINY_TYPE.DIE) {
                fields[row][column] = 0;
            } else if (d.destiny === DESTINY_TYPE.BIRTH) {
                fields[row][column] = d.population;
            }
        }
    }

    function destiny(selRow, selColumn) {
        let countOfNeighbours = 0;
        let countOfNeighboursFromSamePopulution = [];

        for (let i = 1; i <= countOfPopulations; i++) {
            countOfNeighboursFromSamePopulution[i] = 0;
        }

        for (let row = selRow - 1; row <= selRow + 1; row++) {
            for (let column = selColumn - 1; column <= selColumn + 1; column++) {

                if (originalFields[row][column] !== 0 && !(row === selRow && column === selColumn)) {

                    countOfNeighboursFromSamePopulution[originalFields[row][column]]++;
                    countOfNeighbours++;

                    //overpopulation

                    if (countOfNeighbours > overpopulationLimit && originalFields[selRow][selColumn] !== 0) {
                        return {
                            destiny: DESTINY_TYPE.DIE,
                            population: 0
                        };
                    }

                }
            }
        }


        for (let i = 0; i < countOfNeighboursFromSamePopulution.length; i++) {

            //birth
            if (originalFields[selRow][selColumn] === 0 && countOfNeighboursFromSamePopulution[i] === countOfNeighbours &&
                countOfNeighbours === 3) {
                return {
                    destiny: DESTINY_TYPE.BIRTH,
                    population: i
                };
            }

            //birth 2
            /*if (originalFields[selRow][selColumn] !== 0 && countOfNeighboursFromSamePopulution[i] > 3) {

                return {
                    destiny: DESTINY_TYPE.BIRTH,
                    population: i
                };
            }*/
        }

        //isolation
        if (originalFields[selRow][selColumn] != 0 && countOfNeighboursFromSamePopulution[originalFields[selRow][selColumn]] < 2) {
            return {
                destiny: DESTINY_TYPE.DIE,
                population: 0
            };
        }

        return null;

    }
}