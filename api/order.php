<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// POST ORDER
function add_order()
{
  global $connection;

  $req_body = json_decode(file_get_contents('php://input'), true);
  $id_user = $req_body["id_user"];

  $command = "INSERT INTO pesanan 
              VALUE ( '', '$id_user', current_timestamp())";
  $query = mysqli_query($connection, $command);

  if ($query) {
    $response = [
      'status' => 1,
      'message' => 'Insert Success',
    ];
  } else {
    $response = [
      'status' => 0,
      'message' => 'Insert Failed.'
    ];
  }

  header('Content-Type: application/json');
  echo json_encode($response);
}

// ADD TO TRANSACTION
