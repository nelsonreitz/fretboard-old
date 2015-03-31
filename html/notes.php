<?php

    // configuration
    require('../models/model.php');

    if (isset($_GET['tuning']))
    {
        // query notes
        $strings = query_notes($_GET['tuning']);

        // set MIME type
        header('Content-type: application/json');

        // output JSON
        print(json_encode($strings));
    }

?>
