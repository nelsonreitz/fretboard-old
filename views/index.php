<!DOCTYPE html>

<html lang="en">
  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Fretboard</title>

    <link rel="stylesheet" href="../css/normalize.css">
    <link rel="stylesheet" href="../css/style.css">

    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
    <script type="text/javascript" src="js/scripts.js"></script>

  </head>
  <body>

    <div id="fretboard">
    </div><!-- #fretboard -->

    <select id="tunings_select">

      <?php foreach ($tunings as $tuning): ?>
          <option value="<?= $tuning['abbr'] ?>"><?= $tuning['name'] ?></option>
      <?php endforeach ?>

    </select>

    <select id="frets_select">
      <option value="12">12</option>
      <option value="15">15</option>
      <option value="24">24</option>
    </select>

    <label for="toggle_halfsteps">Show half-steps:</label>
    <input type="checkbox" id="toggle_halfsteps">

  </body>
</html>
