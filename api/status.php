<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// GET STATUS
function get_status()
{
  global $connection;

  $command = "SELECT * FROM status";
  $query = mysqli_query($connection, $command);

  while ($row = mysqli_fetch_object($query)) {
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

// EDIT DRIVER STATUS
function edit_status_driver()
{
  global $connection;

  $id = $_GET['id'];
  $check = ['id_status' => ''];
  $req_body = json_decode(file_get_contents('php://input'), true);
  $check_match = count(array_intersect_key($req_body, $check));

  if ($check_match == count($check)) {
    $id_status = $req_body['id_status'];

    $command = "UPDATE driver SET id_status = '$id_status' WHERE id_user = $id";
    $query = mysqli_query($connection, $command);

    if ($query) {
      $response = [
        'status' => 1,
        'message' => 'Update Success'
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
