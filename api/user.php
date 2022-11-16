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
