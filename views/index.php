<!DOCTYPE html>

<html lang="en">
  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Fretboard Chart</title>

    <link href='http://fonts.googleapis.com/css?family=Roboto:700,400' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="../css/normalize.css">
    <link rel="stylesheet" href="../css/style.css">

    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
    <script type="text/javascript" src="js/scripts.js"></script>

  </head>
  <body>

    <header class="header" role="banner">
        <h1 class="site-title"><a href="/">Fretboard Chart</a></h1>
        <h2 class="subtitle">Change this text in the future</h2>
    </header>

    <div id="fretboard">
    </div><!-- #fretboard -->

    <div class="options">

      <div class="option tuning">
        <label for="tuning_select">Select tuning:</label>
        <form id="tuning_select">

          <?php foreach ($tunings as $tuning): ?>
              <input class="button" type="submit" name="<?= $tuning['abbr'] ?>" value="<?= $tuning['name'] ?>">
          <?php endforeach ?>

        </form>
      </div><!-- .option.tuning -->

      <div class="option toggle_halfsteps">

        <label for="toggle_halfsteps">Show half steps notes</label>
        <label class="switch">
          <input type="checkbox" id="toggle_halfsteps">
          <div class="slider round"></div>
        </label>

      </div><!-- .option.toggle_halfsteps -->

    </div><!-- .options -->

    <footer class="footer">
      <p>&copy; <?= date("Y") ?> fretboard-notes.com - Nelson Reitz - <a href="https://github.com/nelsonreitz/fretboard">View the project on GitHub</a></p>
    </footer>

  </body>
</html>
