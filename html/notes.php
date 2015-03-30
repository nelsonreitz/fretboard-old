<?php

    // configuration
    require('../models/model.php');

    if (isset($_GET['testdata']))
    {
        // set MIME type
        header('Content-type: application/json');

        // output JSON
        print(json_encode(query_notes()));
    }

?>
