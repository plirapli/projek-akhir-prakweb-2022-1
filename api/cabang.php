<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// GET
function get_cabang()
{
  global $connection;

  $query = "SELECT * FROM cabang";
  $result = mysqli_query($connection, $query);

  while ($row = mysqli_fetch_object($result)) {
    $data[] = $row;
  }

  $response = [
    'status' => 1,
    'message' => 'Success',
    'data' => $data
  ];

  header('Content-Type: application/json');
  echo json_encode($response);
}

// POST
function add_cabang()
{
  global $connection;

  $check = ['cabang' => '', 'alamat' => ''];
  $req_body = json_decode(file_get_contents('php://input'), true);
  $check_match = count(array_intersect_key($req_body, $check));

  if ($check_match == count($check)) {
    $cabang = $req_body["cabang"];
    $alamat = $req_body["alamat"];

    $query = "INSERT INTO cabang VALUE ( '', '$cabang', '$alamat', current_timestamp() )";
    $result = mysqli_query($connection, $query);

    if ($result) {
      $response = [
        'status' => 1,
        'message' => 'Insert Success',
      ];
    } else {
      $response = [
        'status' => 0,
        'message' => mysqli_error($connection)
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

// DELETE
function delete_cabang()
{
  global $connection;

  $id = $_GET['id'];
  $query = "DELETE FROM cabang WHERE id_cabang = $id";

  if (mysqli_query($connection, $query)) {
    $response = [
      'status' => 1,
      'message' => 'Berhasil Meghapus'
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
