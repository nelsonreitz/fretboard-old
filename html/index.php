<?php

    // configuration
    require('../models/model.php');

    // query tunings
    $tunings = query_tunings();

    // render page
    require('../views/index.php');

?>
