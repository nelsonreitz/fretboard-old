// default tuning
var defaultTuning = "E Standard";

// number of frets to change octave
var octave = 12;

// inlays positions
var singleInlays = {
  "string": 3,
  "frets": [3, 5, 7, 9, 15, 17, 19, 21]
};

var doubleInlays = {
  "strings": [2, 5],
  "frets": [12, 24]
};

$(document).ready(function() {

    // draw default tuning notes 
    drawInlays();
    queryNotes(defaultTuning);

    // draw notes of selected tuning
    $("#tunings_select").change(function() {

        var tuning = $("#tunings_select").val();
        queryNotes(tuning);
    });
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
 * Queries notes from database.
 */
function queryNotes(tuning) {

    $.ajax({
      url: "notes.php",
      data: {
        tuning: tuning
      },
      success: function(strings) {

          clearNotes();
          drawNotes(strings);
      }
    });
}

/**
 * Draws notes.
 */
function drawNotes(strings) {

    // for each string
    $.each(strings, function(string_number, string) {

        // draw open string note
        var stringNoteHtml = '<div class="open_note">' + string.open + "</div>";
        $("." + string_number + " > .fret0").html(stringNoteHtml);

        // for each note
        $.each(string.notes, function(note, frets) {

            // draw fretted note
            var noteHtml = '<div class="note">' + note + "</div>";
            $("." + string_number + " > .fret" + frets).append(noteHtml);

            // draw fretted note an octave higher
            $("." + string_number + " > .fret" + (parseInt(frets) + octave)).append(noteHtml);
        });
    });
}

/**
 * Clears notes on the fretboard.
 */
function clearNotes() {

    $(".note").remove();
}
