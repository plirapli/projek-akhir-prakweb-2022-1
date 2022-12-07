<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// GET ALL CART BY USER
function get_cart()
{
  global $connection;

  $id = $_GET["id"];
  $query = "SELECT * FROM cart 
            INNER JOIN menu ON cart.id_menu = menu.id_menu
            WHERE id_user = $id";
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

// GET CART BY ID
function get_cart_id()
{
  global $connection;

  $menu = $_GET["id_menu"];
  $user = $_GET["id_user"];
  $query = "SELECT * FROM cart c
            INNER JOIN menu m ON c.id_menu = m.id_menu 
            WHERE c.id_menu = $menu AND c.id_user = $user";
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

// ADD CART BY USER
function add_cart()
{
  global $connection;

  $req_body = json_decode(file_get_contents('php://input'), true);
  $id_menu = $req_body["id_menu"];
  $id_user = $req_body["id_user"];
  $qty = $req_body["qty"];

  $query = "INSERT INTO cart 
            VALUE ( '', $id_menu, $qty, $id_user)";
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

// UPDATE CART QTY
function update_qty()
{
  global $connection;

  $req_body = json_decode(file_get_contents('php://input'), true);
  $id_menu = $req_body["id_menu"];
  $id_user = $req_body["id_user"];
  $qty = $req_body["qty"];

  $command = "UPDATE cart SET qty = $qty 
              WHERE id_menu = $id_menu AND id_user = $id_user";
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

// DELETE CART
function delete_cart()
{
  global $connection;

  $menu = $_GET["id_menu"];
  $user = $_GET["id_user"];
  $query = "DELETE FROM cart 
            WHERE id_menu = $menu AND id_user = $user";

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
