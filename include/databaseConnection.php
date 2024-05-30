<?php
   function OpenConnection(){
      
      $host = "localhost";
      $username = "aiiot_lms";
      $password = "strong#dux13";
      $dbname = "aiiot_lms";
      
      $conn = new mysqli($host, $username, $password, $dbname) or die("Connection to database failed: %s\n". $conn -> error);

      return $conn;
   }
 
   function CloseConnection($conn){
      $conn -> close();
   }