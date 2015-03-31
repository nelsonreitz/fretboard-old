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
      success: function(stringNotes) {

          clearNotes();
          drawNotes(stringNotes);
      }
    });
}

/**
 * Draws fretted notes.
 */
function drawNotes(stringNotes) {

    // for each string
    $.each(stringNotes, function(index, string) {

        // for each note
        $.each(string.notes, function(fret, note) {

            if (fret == "open") {

                // draw open string note
                var stringNoteHtml = '<div class="string_note">' + note + "</div>";
                $("." + string.string + " > .fret0").html(stringNoteHtml);

            } else if (note != null) {

                // draw fretted note
                var noteHtml = '<div class="note">' + note + "</div>";
                $("." + string.string + " > ." + fret).append(noteHtml);
            }
        });
    });
}

/**
 * Clears notes on the fretboard.
 */
function clearNotes() {

    $(".note").remove();
}
