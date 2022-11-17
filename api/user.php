<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// GET USER
function get_user()
{
  global $connection;

  $command = "SELECT * FROM user";
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

function add_user()
{
  global $connection;

  $check = [
    'nama' => '',
    'email' => '',
    'username' => '',
    'password' => '',
    'id_role' => '',
  ];
  $req_body = json_decode(file_get_contents('php://input'), true);
  $check_match = count(array_intersect_key($req_body, $check));

  if ($check_match == count($check)) {
    $nama = $req_body["nama"];
    $email = $req_body["email"];
    $username = $req_body['username'];
    $password = $req_body['password'];
    $id_role = $req_body['id_role'];

    $command = "INSERT INTO user VALUE (
      '', 
      '$nama', 
      '$email', 
      '$username', 
      '$password', 
      '', 
      '', 
      current_timestamp(), 
      current_timestamp(), 
      '$id_role'
    )";
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

function add_lab($data)
{
  global $connection;

  $nama = htmlspecialchars($data["nama"]);

  // Query (INSERT DATA)
  $query = "INSERT INTO lab VALUES( '', '$nama' )";
  mysqli_query($connection, $query);

  return mysqli_affected_rows($connection);
}

function delete_lab($id)
{
  global $connection;

  // Query (INSERT DATA)
  $query = "DELETE FROM lab WHERE id='$id'";
  mysqli_query($connection, $query);

  return mysqli_affected_rows($connection);
}
