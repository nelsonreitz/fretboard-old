<?php

    /**
     * index.php
     *
     * Fretboard Chart
     *
     * Nelson Reitz
     * http://github.com/nelsonreitz/fretboard
     */

    // configuration
    require('../models/model.php');

    if (isset($_GET['frets']))
    {
        // print fretboard html
        extract(['frets' => $_GET['frets']]);
        require('../views/fretboard.php');
    }
    else
    {
        // query tunings
        $tunings = query_tunings();

        // render page
        require('../views/index.php');
    }

?>
