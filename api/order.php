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

  $query = "INSERT INTO pesanan 
            VALUE ( '', $id_user, current_timestamp())";
  $result = mysqli_query($connection, $query);
  $id = mysqli_query($connection, "SELECT LAST_INSERT_ID() AS id_order");

  $data = mysqli_fetch_object($id);

  if ($result) {
    $response = [
      'status' => 1,
      'message' => 'Insert Success',
      'data' => $data,
    ];
  } else {
    $response = [
      'status' => 0,
      'message' => 'Error: ' . mysqli_error($connection)
    ];
  }

  header('Content-Type: application/json');
  echo json_encode($response);
}

// ADD TO TRANSACTION
function add_transaction()
{
  global $connection;

  $check = [
    'id_order' => '',
    'id_menu' => '',
    'qty' => '',
  ];
  $req_body = json_decode(file_get_contents('php://input'), true);
  $check_match = count(array_intersect_key($req_body, $check));

  if ($check_match == count($check)) {
    $id_order = $req_body['id_order'];
    $id_menu = $req_body['id_menu'];
    $qty = $req_body['qty'];

    $command = "INSERT INTO transaksi 
                VALUE ( '', '$id_order', '$id_menu', '$qty' )";
    $query = mysqli_query($connection, $command);

    if ($query) {
      $response = [
        'status' => 1,
        'message' => 'Insert Success',
      ];
    } else {
      $response = [
        'status' => 0,
        'message' => 'Error: ' . mysqli_error($connection)
      ];
    }
  } else {
    $response = [
      'status' => 0,
      'message' => 'Wrong Parameter'
    ];
  }
  header('Content-Type: application/json');
  echo json_encode($response);
}
