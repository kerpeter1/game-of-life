function redrawMap() {
    for (let row = 0; row < fields.length; row++) {
        for (let column = 0; column < fields[row].length; column++) {
            let id = row + "_" + column;
            let $field = $(`#${id}`);

            switch (fields[row][column]) {
                case 0:
                    $field.removeClass('');
                    $field.addClass($field.data('terrain'));
                    break;
                case 1:
                    $field.removeClass('');
                    $field.addClass('pop-1');
                    break;
                case 2:
                    $field.removeClass('');
                    $field.addClass('pop-2');
                    break;
            }
        }
    }
    console.log("ready");

}