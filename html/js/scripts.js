// default tuning
var defaultTuning = "E Standard";

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
    queryNotes(defaultTuning);
    drawInlays();

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
function drawStringNotes(notes) {

    $.each(notes, function(key, value) {

        // html div
        var stringNoteHtml = '<div class="string_note">' + value + "</div>";

        // draw note on corresponding string
        $("." + key + "> .fret0").html(stringNoteHtml);
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
      success: function(notes) {

          clearNotes();
          drawStringNotes(notes.open_notes);
          drawNotes(notes.fretted_notes);
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
                $(".string" + frettedNotes.string + "> ." + fret).html(noteHtml);
            }
        });
    });
}

/**
 * Clears notes on the fretboard.
 */
function clearNotes() {

    $(".note").parent().empty();
}
