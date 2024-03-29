/**
 * scripts.js
 *
 * Fretboard Chart
 *
 * Nelson Reitz
 * http://github.com/nelsonreitz/fretboard
 */

// default tuning abbr
var defaultTuning = "e_std";

// default number of frets to display
var defaultFrets = 12;

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
    $("#tuning_select").submit(function() {

        var tuning = $("input[type=submit][clicked=true]").attr("name");
        drawNotes(tuning);

        // prevent form submission
        return false;
    });

    // give clicked attribute to clicked inputs
    $("#tuning_select input[type=submit]").click(function() {
        $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
        $(this).attr("clicked", "true");
    });

    // give clicked attribute to default tuning
    $("#tuning_select input[name=" + defaultTuning + "]").attr("clicked", "true");

    // toggle half-steps on checkbox change
    $("#toggle_halfsteps").change(function() {

        if (this.checked) {
            $(".halfstep").fadeIn(200);
        } else {
            $(".halfstep").fadeOut(200);
        }
    });

    // center elements on resize
    $(window).resize(function() {
        center(".note");
        center(".halfstep");
        center(".double_inlay");
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
              $("." + string_number + " > .open").html(stringNoteHtml);

              // for each note
              $.each(string.notes, function(note, frets) {

                  // custom class for half-steps notes
                  if (note.length > 1) {
                      var noteHtml = '<div class="halfstep ' + note + '">' + note + "</div>";
                  } else {
                      var noteHtml = '<div class="note ' + note + '">' + note + "</div>";
                  }

                  // draw note
                  $("." + string_number + " > .fret" + frets).append(noteHtml);

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
