<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$host = "localhost";
$username = "root";
$passwd = "";
$db_name = "olive_chicken";

$connection = mysqli_connect($host, $username, $passwd, $db_name);

if (!$connection) {
  die("Koneksi Error: " . mysqli_connect_error());
}
