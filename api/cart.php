<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// GET ORDER
function get_cart()
{
  global $connection;

  $query = "SELECT * FROM cart INNER JOIN menu ON cart.id_menu = menu.id_menu";
  $result = mysqli_query($connection, $query);

  if ($query) {
    while ($row = mysqli_fetch_object($result)) {
      $data[] = $row;
    }

    if (isset($data)) {
      $response = [
        'status' => 1,
        'message' => 'Success',
        'data' => $data
      ];
    } else {
      $response = [
        'status' => 1,
        'message' => 'Data Kosong',
        'data' => []
      ];
    }
  } else {
    $response = [
      'status' => 0,
      'message' => 'Error: ' . mysqli_error($connection),
    ];
  }

  header('Content-Type: application/json');
  echo json_encode($response);
}

// GET ORDER
function get_cart_id()
{
  global $connection;

  $id = $_GET["id"];
  $query = "SELECT * FROM cart INNER JOIN menu ON cart.id_menu = menu.id_menu WHERE cart.id_menu=$id";
  $result = mysqli_query($connection, $query);

  if ($query) {
    $data = mysqli_fetch_object($result);

    if (isset($data)) {
      $response = [
        'status' => 1,
        'message' => 'Success',
        'data' => $data
      ];
    } else {
      $response = [
        'status' => 1,
        'message' => 'Data Kosong',
        'data' => []
      ];
    }
  } else {
    $response = [
      'status' => 0,
      'message' => 'Error: ' . mysqli_error($connection),
    ];
  }

  header('Content-Type: application/json');
  echo json_encode($response);
}

// POST ORDER
function add_cart()
{
  global $connection;

  $req_body = json_decode(file_get_contents('php://input'), true);
  $id_menu = $req_body["id_menu"];
  $qty = $req_body["qty"];

  $query = "INSERT INTO cart 
            VALUE ( '', $id_menu, $qty)";
  $result = mysqli_query($connection, $query);

  if ($result) {
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

  header('Content-Type: application/json');
  echo json_encode($response);
}

function update_qty()
{
  global $connection;

  $req_body = json_decode(file_get_contents('php://input'), true);
  $id = $_GET["id"];
  $qty = $req_body["qty"];

  $command = "UPDATE cart SET qty = $qty WHERE id_menu = $id";
  $query = mysqli_query($connection, $command);

  if ($query) {
    $response = [
      'status' => 1,
      'message' => 'Update Success'
    ];
  } else {
    $response = [
      'status' => 0,
      'message' => 'Error: ' + mysqli_error($connection)
    ];
  }

  header('Content-Type: application/json');
  echo json_encode($response);
}

function delete_cart()
{
  global $connection;

  $id = $_GET['id'];
  $query = "DELETE FROM cart WHERE id_menu=$id";

  if (mysqli_query($connection, $query)) {
    $response = [
      'status' => 1,
      'message' => 'Delete Success'
    ];
  } else {
    $response = [
      'status' => 0,
      'message' => mysqli_error($connection)
    ];
  }

  header('Content-Type: application/json');
  echo json_encode($response);
}
