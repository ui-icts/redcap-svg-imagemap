$(document).ready(function() {
    $.each(UIOWA_SvgMap.embedFields, function(index, field) {
        let $embedField = $("[sq_id='" + field + "'] > td");

        // if embed target field exists on this form, embed SVG
        if ($embedField.length > 0) {
            $embedField
                .append(`<object
                    class="svg-map"
                    svg-index="${index}"
                    svg-choice-field="${UIOWA_SvgMap.choiceFields[index]}"
                    data="${UIOWA_SvgMap.svgUrl + '&svg_id=' + index}"
                    type="image/svg+xml"
                ></object>`);
        }
    })

    $('.svg-map').each(function() {
        this.addEventListener('load', function() {
            let $svg = $(this);
            let $contents = $svg.contents();
            let $choiceField = $('#' + $svg.attr('svg-choice-field') + '-tr');

            // update field td to fit loaded SVG
            $svg.parent().height($contents.height());

            $choiceField.find('.data input')
                // update map if input clicked
                .on('click', function() {
                    updateMap($svg, this);
                })
                // sync map to previously saved selections
                .each(function() {
                    updateMap($svg, this);
                })

            // update input if map clicked
            $contents.find('a').on('click', function(e) {
                e.preventDefault();

                let code = $(this).data('rc-choice');
                $choiceField.find('[code="' + code + '"]').trigger('click');
            })
        }, true)
    })

    function updateMap($svg, input) {
        let code = $(input).attr('code');
        let $a = $svg.contents().find('a[data-rc-choice="' + code +'"]');

        // todo add support for radio/dropdown fields
        $(input).prop('checked') ? $a.addClass('selected') : $a.removeClass('selected');
    }
})