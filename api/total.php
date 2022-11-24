<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// GET USER TOTAL
function get_total()
{
  global $connection;

  $query_user = "SELECT 'user' AS name, COUNT(*) AS total FROM user WHERE id_role = 2";
  $query_driver = "SELECT 'driver' AS name, COUNT(*) AS total FROM user WHERE id_role = 3";
  $query_cabang = "SELECT 'cabang' AS name, COUNT(*) AS total FROM cabang";
  $query_menu = "SELECT 'menu' AS name, COUNT(*) AS total FROM menu";
  $query_transaksi = '';

  $res_user = mysqli_query($connection, $query_user);
  $res_driver = mysqli_query($connection, $query_driver);
  $res_cabang = mysqli_query($connection, $query_cabang);
  $res_menu = mysqli_query($connection, $query_menu);
  // $res_user = mysqli_query($connection, $query_user);

  $data[0] = mysqli_fetch_object($res_user);
  $data[1] = mysqli_fetch_object($res_driver);
  $data[2] = mysqli_fetch_object($res_cabang);
  $data[3] = mysqli_fetch_object($res_menu);

  $response = [
    'status' => 200,
    'message' => 'Success',
    'data' => $data
  ];

  header('Content-Type: application/json');
  echo json_encode($response);
}
