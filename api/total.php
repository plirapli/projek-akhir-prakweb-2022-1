<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// GET USER TOTAL
function get_total()
{
  global $connection;

  $query_user = "SELECT 'Pelanggan' AS name, 
                 'mdi:user' AS icon,
                 'user.php' AS url,
                 COUNT(*) AS total FROM user WHERE id_role = 2";

  $query_menu = "SELECT 'menu makanan' AS name, 
                 'mdi:food-drumstick' AS icon,
                 'menu_makanan.php' AS url,
                 COUNT(*) AS total FROM menu";

  $query_order = "SELECT 'pesanan' AS name, 
                  'mdi:clipboard-text' AS icon,
                  'transaksi.php' AS url,
                  COUNT(*) AS total from pesanan";

  $query_total_transaksi = "SELECT 'total transaksi' AS name, 
                            'transaksi.php' AS url,
                            'mingcute:bill-fill' AS icon,
                            CONCAT('Rp', SUM(qty * harga)) AS total FROM transaksi";


  $res_user = mysqli_query($connection, $query_user);
  $res_menu = mysqli_query($connection, $query_menu);
  $res_order = mysqli_query($connection, $query_order);
  $res_total_transaksi = mysqli_query($connection, $query_total_transaksi);

  $data[0] = mysqli_fetch_object($res_user);
  $data[1] = mysqli_fetch_object($res_menu);
  $data[2] = mysqli_fetch_object($res_order);
  $data[3] = mysqli_fetch_object($res_total_transaksi);

  $response = [
    'status' => 200,
    'message' => 'Success',
    'data' => $data
  ];

  header('Content-Type: application/json');
  echo json_encode($response);
}
