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

var notes = [
  {
    "string": 1,
    "notes": {
      "1": "F",
      "3": "G",
      "5": "A",
      "7": "B",
      "8": "C"
    }
  },{
    "string": 2,
    "notes": {
      "2": "B",
      "3": "C",
      "5": "D"
    }
  },{
    "string": 3,
    "notes": {
      "2": "E",
      "3": "F",
    }
  },{
    "string": 4,
    "notes": {
      "2": "A"
    }
  },{
    "string": 5,
    "notes": {
      "1": "C",
      "3": "D",
    }
  },{
    "string": 6,
    "notes": {
      "1": "F",
      "3": "G",
    }
  }
];

$(document).ready(function() {

    drawInlays();
    drawStringNotes();
    drawNotes();
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

/**
 * Draws fretted notes.
 */
function drawNotes() {

    $.each(notes, function(index, frettedNotes) {

        $.each(frettedNotes.notes, function(fret, note) {

            var noteHtml = '<div class="note">' + note + "</div>";

            $(".string" + frettedNotes.string + "> .fret" + fret).html(noteHtml);
        });
    });
}
