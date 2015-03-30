var strings = 6;

var stringNotes = ["E", "A", "D", "G", "B", "E"];

var singleInlays = {
  "string": 4,
  "frets": [3, 5, 7, 9, 15, 17, 19, 21]
};

var doubleInlays = {
  "strings": [2, 5],
  "frets": [12, 24]
};

$(document).ready(function() {

    drawInlays();
    drawStringNotes();
});

/**
 * Draws inlays on the fretboard.
 */
function drawInlays() {

    // html divs
    var singleInlayHtml = '<div class="single_inlay"></div>';
    var doubleInlayHtml = '<div class="double_inlay"></div>';

    // single inlays
    $.each(singleInlays.frets, function(index, fret) {
        $(".string" + singleInlays.string + "> .fret" + fret).html(singleInlayHtml);
    });

    // double inlays
    $.each(doubleInlays.frets, function(index, fret) {

        $.each(doubleInlays.strings, function(index, string) {
            $(".string" + string + "> .fret" + fret).html(doubleInlayHtml);
        });
    });
}

/**
 * Draws open string notes.
 */
function drawStringNotes() {

    for (i = 0; i < strings; i++) {

        // html div
        var stringNoteHtml = '<div class="string_note">' + stringNotes[i] + "</div>";

        // draw note on corresponding string
        $(".string" + (i + 1) + "> .fret0").html(stringNoteHtml);
    }
}
