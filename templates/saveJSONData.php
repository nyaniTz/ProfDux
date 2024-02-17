<?php

$filename = $_POST['filename'];
$path = 'json/'.$filename;
$jsonString = $_POST['jsonString'];

$fp = fopen($path, 'w');
fwrite($fp, $jsonString);
fclose($fp);

echo "success";