<?php
$host='whirlwar.mysql.ukraine.com.ua'; 
$database='whirlwar_test'; 
$user='whirlwar_test'; 
$pswd='vn9rhnph'; 
 
$dbh = mysql_connect($host, $user, $pswd) or die("Не могу соединиться с MySQL.");
mysql_select_db($database) or die("Не могу подключиться к базе.");

?>