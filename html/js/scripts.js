// default tuning abbr
var defaultTuning = "e_std";

// default number of fret
var defaultFrets = 15;

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

    // draw default fretboard
    drawFretboard(defaultFrets, defaultTuning);

    // draw notes of selected tuning
    $("#tunings_select").change(function() {

        var tuning = $("#tunings_select").val();
        drawNotes(tuning);
    });

    // draw fretboard with selected number of frets
    $("#frets_select").change(function() {

        var tuning = $("#tunings_select").val();
        var frets = $("#frets_select").val();
        drawFretboard(frets, tuning);
    });

    // toggle half-steps on checkbox change
    $("#toggle_halfsteps").change(function() {

        if (this.checked) {
            $(".halfstep").show();
        } else {
            $(".halfstep").hide();
        }
    });
});

/**
 * Draws the fretboard on the page.
 */
function drawFretboard(frets, tuning) {

    $.ajax({
      url: "index.php",
      data: {
        frets: frets
      },
      success: function(fretboardHtml) {

          $("#fretboard").html(fretboardHtml);
          drawInlays();
          drawNotes(tuning);
      }
    });
}

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

    // center double inlays
    center(".double_inlay");
}

/**
 * Queries and draws notes.
 */
function drawNotes(tuning) {

    $.ajax({
      url: "notes.php",
      data: {
        tuning: tuning
      },
      success: function(strings) {

          clearNotes();

          // for each string
          $.each(strings, function(string_number, string) {

              // draw open string note
              var stringNoteHtml = '<div class="open_note">' + string.open + "</div>";
              $("." + string_number + " > .fret0").html(stringNoteHtml);

              // for each note
              $.each(string.notes, function(note, frets) {

                  // custom class for half-steps notes
                  if (note.length > 1) {
                      var noteHtml = '<div class="halfstep">' + note + "</div>";
                  } else {
                      var noteHtml = '<div class="note">' + note + "</div>";
                  }

                  // draw note
                  $("." + string_number + " > .fret" + frets).append(noteHtml);

                  // draw note an octave higher
                  $("." + string_number + " > .fret" + (parseInt(frets) + octave)).append(noteHtml);

                  // hide half-steps by default
                  if ($("#toggle_halfsteps").prop("checked") == false) {
                      $(".halfstep").hide();
                  }
              });
          });

          // center notes
          center(".note");
          center(".halfstep");
      }
    });
}

/**
 * Centers each element of given class on their frets.
 */
function center(elementClass) {

    $(elementClass).each(function() {

        var yPos = ($(this).parent().width() / 2) - ($(this).width() / 2);
        $(this).css("left", yPos);
    });
}

/**
 * Clears notes on the fretboard.
 */
function clearNotes() {

    $(".note").remove();
    $(".halfstep").remove();
}
