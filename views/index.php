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

  <table id="fretboard">
    <thead>
      <tr>

        <?php for ($i = 0; $i < $frets + 1; $i++): ?>
            <td><?= ($i == 0) ? '' : $i ?></td>
        <?php endfor ?>

      </tr>
    </thead>
    <tbody>

      <?php for ($i = 0; $i < $strings + 1; $i++): ?>

          <tr class="string<?= $i ?>">

            <?php for ($j = 0; $j < $frets + 1; $j++): ?>
                <td class="fret<?= $j ?>"></td>
            <?php endfor ?>

          </tr>

      <?php endfor ?>

    </tbody>
  </table>

  </body>
</html>
