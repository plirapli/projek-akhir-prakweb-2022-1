<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// GET ORDER
function get_order()
{
  global $connection;

  $query = "SELECT * FROM pesanan INNER JOIN user ON pesanan.id_user = user.id_user";
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

// GET ORDER BY ID
function get_order_id()
{
  global $connection;

  $id_user = $_GET["id_user"];
  $query = "SELECT * FROM pesanan INNER JOIN user ON pesanan.id_user = user.id_user WHERE pesanan.id_user = $id_user";
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

// GET TRANSACTION BY ID
function get_transaction_id()
{
  global $connection;

  $id_order = $_GET["id_order"];
  $query = "SELECT id_transaksi, id_pesanan, menu.menu AS menu, qty, t.harga AS harga
            FROM transaksi t
            INNER JOIN menu ON t.id_menu = menu.id_menu 
            WHERE t.id_pesanan = $id_order";
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

// ADD TO TRANSACTION
function add_transaction()
{
  global $connection;

  $check = [
    'id_order' => '',
    'id_menu' => '',
    'qty' => '',
    'harga' => '',
  ];
  $req_body = json_decode(file_get_contents('php://input'), true);
  $check_match = count(array_intersect_key($req_body, $check));

  if ($check_match == count($check)) {
    $id_order = $req_body['id_order'];
    $id_menu = $req_body['id_menu'];
    $qty = $req_body['qty'];
    $harga = $req_body['harga'];

    $command = "INSERT INTO transaksi 
                VALUE ( '', '$id_order', '$id_menu', '$qty', $harga )";
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
