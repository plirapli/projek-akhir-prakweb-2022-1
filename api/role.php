<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// GET ROLE
function get_role()
{
  global $connection;

  $command = "SELECT * FROM role";
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

// GET ROLE TOTAL
function get_role_total()
{
  global $connection;

  $query = 'SELECT role.role AS role, COUNT(*) AS total
            FROM user INNER JOIN role ON user.id_role = role.id_role 
            GROUP BY user.id_role';
  $query = mysqli_query($connection, $query);

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
