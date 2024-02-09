<?php
   function OpenConnection(){
      
      $host = "localhost";
      $username = "aiiovdft_dux";
      $password = "strong#dux13";
      $dbname = "aiiovdft_dux";
      
      $conn = new mysqli($host, $username, $password, $dbname) or die("Connection to database failed: %s\n". $conn -> error);

      return $conn;
   }
 
   function CloseConnection($conn){
      $conn -> close();
   }