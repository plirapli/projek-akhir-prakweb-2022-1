<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// GET ROLE
function get_role()
{
  global $connection;

  $command = "SELECT * FROM role";
  $query = mysqli_query($connection, $command);

  while ($row = mysqli_fetch_object($query)) {
    $data[] = $row;
  }

  $response = [
    'status' => 200,
    'message' => 'Success',
    'data' => $data
  ];


  header('Content-Type: application/json');
  echo json_encode($response);
}
