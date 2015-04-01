<?php

    /**
     * model.php
     *
     * Nelson Reitz
     * http://github.com/nelsonreitz/fretboard
     */

    // databse credentials
    define('DB_NAME', 'fretboard');
    define('DB_SERVER', 'localhost');
    define('DB_USERNAME', 'root');
    define('DB_PASSWORD', 'root');

    // global constants
    define('STRINGS', 6);

    // tunings order string for mysql sort
    define('TUNINGS_ORDER', '"E Standard", "Drop D", "Eb Standard", "D Standard", "Drop C"');

    /**
     * Executes SQL statement, possibly with parameters, returning
     * an array of all rows in result set or false on (non-fatal) error.
     *
     * (taken from CS50x 2014 problem set 7: CS50 Finance).
     */
    function query(/* $sql [, ... ] */)
    {
        // database infos for MAMP
        $dsn = 'mysql:dbname=' . DB_NAME . ';host=' . DB_SERVER;

        // SQL statement
        $sql = func_get_arg(0);

        // parameters, if any
        $parameters = array_slice(func_get_args(), 1);

        // try to connect to database
        static $handle;
        if (!isset($handle))
        {
            try
            {
                // connect to database
                $handle = new PDO($dsn, DB_USERNAME, DB_PASSWORD);

                // ensure that PDO::prepare returns false when passed invalid SQL
                $handle->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); 
            }
            catch (Exception $e)
            {
                // trigger (big, orange) error
                trigger_error($e->getMessage(), E_USER_ERROR);
                exit;
            }
        }

        // prepare SQL statement
        $statement = $handle->prepare($sql);
        if ($statement === false)
        {
            // trigger (big, orange) error
            trigger_error($handle->errorInfo()[2], E_USER_ERROR);
            exit;
        }

        // execute SQL statement
        $results = $statement->execute($parameters);

        // return result set's rows, if any
        if ($results !== false)
        {
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }
        else
        {
            return false;
        }
    }

    /**
     * Queries notes.
     */
    function query_notes($tuning)
    {
        // prepare associative array
        $strings = [];

        // query open strings
        $query = query('SELECT * FROM tunings WHERE name = ?', $tuning);

        // for each string
        foreach ($query[0] as $key => $value)
        {
            if ($key !== 'name')
            {
                // select corresponding notes
                $query = query('SELECT * FROM notes WHERE open = ?', $value);

                // for each fret
                foreach ($query[0] as $note => $frets)
                {
                    // build associative array
                    if ($note === 'open')
                    {
                        $strings[$key]['open'] = $frets;
                    }
                    else
                    {
                        $strings[$key]['notes'][$note] = $frets;
                    }
                }
            }
        }

        return $strings;
    }

    /**
     * Queries a list of tunings from database.
     */
    function query_tunings() {

        $query = query('SELECT * FROM tunings ORDER BY FIELD(name,' . TUNINGS_ORDER . ')');
        return $query;
    }

?>
