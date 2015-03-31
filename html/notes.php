<?php

    // configuration
    require('../models/model.php');

    if (isset($_GET['tuning']))
    {
        // build associative array
        $notes = [];
        $notes["fretted_notes"] = query_notes($_GET['tuning']);
        $notes["open_notes"] = query_open_strings($_GET['tuning']);

        // set MIME type
        header('Content-type: application/json');

        // output JSON
        print(json_encode($notes));
    }

?>
