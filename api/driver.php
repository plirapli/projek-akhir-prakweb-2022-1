<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// GET USER
function get_user()
{
  global $connection;

  $command = "SELECT * FROM user 
              INNER JOIN role ON user.id_role = role.id_role
              INNER JOIN driver ON user.id_user = driver.id_user
              INNER JOIN status ON driver.id_status = status.id_status
              WHERE role.id_role = 3";
  $query = mysqli_query($connection, $command);

  if ($query) {
    while ($row = mysqli_fetch_object($query)) {
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
      'message' => 'Failed',
    ];
  }

  header('Content-Type: application/json');
  echo json_encode($response);
}

function get_user_id()
{
  global $connection;

  $id = $_GET['id'];
  $query = "SELECT * FROM user 
            INNER JOIN role ON user.id_role = role.id_role 
            INNER JOIN driver ON user.id_user = driver.id_user
            INNER JOIN status ON driver.id_status = status.id_status
            WHERE user.id_user = $id LIMIT 1";
  $result = mysqli_query($connection, $query);

  if ($result) {
    $data = mysqli_fetch_object($result);

    $response = [
      'status' => 1,
      'message' => 'Success',
      'data' => $data
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

// POST USER
function add_user()
{
  global $connection;

  $check = [
    'id_user' => '',
  ];
  $req_body = json_decode(file_get_contents('php://input'), true);
  $check_match = count(array_intersect_key($req_body, $check));

  if ($check_match == count($check)) {
    $id_user = $req_body["id_user"];

    $command = "INSERT INTO driver VALUE ('', 0, 0, '$id_user', 1)";
    $query = mysqli_query($connection, $command);

    if ($query) {
      $response = [
        'status' => 1,
        'message' => 'Insert Success'
      ];
    } else {
      $response = [
        'status' => 0,
        'message' => 'Insert Failed.'
      ];
    }
  } else {
    $response = array(
      'status' => 0,
      'message' => 'Wrong Parameter'
    );
  }
  header('Content-Type: application/json');
  echo json_encode($response);
}

function delete_user()
{
  global $connection;

  $id = $_GET['id'];
  $query = "DELETE FROM driver WHERE id_user=$id";

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