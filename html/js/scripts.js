var strings = 6;
var stringNotes = ["E", "A", "D", "G", "B", "E"];

var singleInlays = {
  "string": 3,
  "frets": [3, 5, 7, 9, 15, 17, 19, 21]
};

var doubleInlays = {
  "strings": [2, 5],
  "frets": [12, 24]
};

$(document).ready(function() {

    drawStringNotes();
    queryNotes();
    drawInlays();
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
        $(".string" + singleInlays.string + "> .fret" + fret).append(singleInlayHtml);
    });

    // double inlays
    $.each(doubleInlays.frets, function(index, fret) {

        $.each(doubleInlays.strings, function(index, string) {
            $(".string" + string + "> .fret" + fret).append(doubleInlayHtml);
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
        var stringNumber = strings - i;
        $(".string" + (stringNumber) + "> .fret0").html(stringNoteHtml);
    }
}

/**
 * Queries notes from database.
 */
function queryNotes() {

    $.ajax({
      url: "notes.php",
      data: {
        testdata: 1
      },
      success: function(notes) {

         drawNotes(notes);
      }
    });
}

/**
 * Draws fretted notes.
 */
function drawNotes(notes) {

    // for each string
    $.each(notes, function(index, frettedNotes) {

        // for each note
        $.each(frettedNotes.notes, function(fret, note) {

            if (note != null)
            {
                var noteHtml = '<div class="note">' + note + "</div>";
                $(".string" + frettedNotes.string + "> ." + fret).append(noteHtml);
            }
        });
    });
}
