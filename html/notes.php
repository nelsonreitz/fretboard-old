<?php

    // configuration
    require('../models/model.php');

    if (isset($_GET['testdata']))
    {
        // build associative array
        $notes = [];
        $notes["fretted_notes"] = query_notes();
        $notes["open_notes"] = query_open_strings();

        // set MIME type
        header('Content-type: application/json');

        // output JSON
        print(json_encode($notes));
    }

?>
