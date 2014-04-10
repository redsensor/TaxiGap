<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

require "config.php";

/*whirlwar_test
vn9rhnph*/

/*var_dump($_POST);*/
$trackID = $_POST['trackID'];
$timeInMinutes = $_POST['timeInMinutes'];
$timeInSeconds = $_POST['timeInSeconds'];
$averageSpeed = $_POST['averageSpeed'];
$distance = $_POST['distance'];
$dateC = $_POST['dateC'];

echo $averageSpeed;
echo $timeInMinutes;
echo $averageSpeed;
echo $distance;
echo $dateC;

$result = mysql_query("INSERT INTO `trackdata` (`trackID`, `timeInMinutes`, `timeInSeconds`, `averageSpeed`, `distance`, `dateC`) VALUES ('$trackID','$timeInMinutes','$timeInSeconds','$averageSpeed','$distance','$dateC')"); 
/*if($result == TRUE)             {
                         echo "Данные добавлены!";
                                  }
                         else
                                {
                              echo "Ошибка добавления данных!";
                                }*/
     
?>