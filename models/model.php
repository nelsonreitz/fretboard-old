<?php

    /**
     * model.php
     *
     * Nelson Reitz
     * http://github.com/nelsonreitz/fretboard
     */

    // global constants
    define('DB_NAME', 'fretboard');
    define('DB_SERVER', 'localhost');
    define('DB_USERNAME', 'root');
    define('DB_PASSWORD', 'root');

    // global variables
    define('STRINGS', 6);
    define('FRETS', 12);

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
    function query_notes()
    {
        $notes = [];

        // for each string
        for ($i = STRINGS; $i > 0; $i--)
        {
            $query = query('SELECT * FROM notes WHERE string = ?', $i);

            if (!empty($query))
            {
                // build associative array
                foreach ($query[0] as $key => $value)
                {
                    if ($key === 'string')
                    {
                        $notes[STRINGS - $i]['string'] = $value;
                    }
                    else if ($key !== 'tuning')
                    {
                        $notes[STRINGS - $i]["notes"][$key] = $value;
                    }
                }
            }
        }

        return $notes;
    }

?>
