<table>
  <thead>
    <tr>

      <?php for ($i = 0; $i < $frets + 1; $i++): ?>
          <td><?= ($i == 0) ? '' : $i ?></td>
      <?php endfor ?>

    </tr>
  </thead>
  <tbody>

    <?php for ($i = 0; $i < STRINGS + 1; $i++): ?>

        <tr class="string<?= $i ?>">

          <?php for ($j = 0; $j < $frets + 1; $j++): ?>
              <td class="fret<?= $j ?>"></td>
          <?php endfor ?>

        </tr>

    <?php endfor ?>

  </tbody>
</table>
