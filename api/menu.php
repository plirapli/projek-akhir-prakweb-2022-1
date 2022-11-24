<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// GET
function get_menu()
{
  global $connection;

  $query = "SELECT * FROM menu INNER JOIN cabang ON menu.id_cabang = cabang.id_cabang";
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
      'message' => 'Failed',
    ];
  }

  header('Content-Type: application/json');
  echo json_encode($response);
}

// GET BY ID
function get_menu_id()
{
  global $connection;

  $id = $_GET['id'];
  $query = "SELECT * FROM menu INNER JOIN cabang ON menu.id_cabang = cabang.id_cabang
            WHERE menu.id_menu = $id";
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
      'message' => 'Failed',
    ];
  }

  header('Content-Type: application/json');
  echo json_encode($response);
}

// POST
function add_menu()
{
  global $connection;

  $filename = $_FILES["img"]["name"];
  $extension  = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
  $uploadOk = 1;

  // Check file size
  if ($_FILES["img"]["size"] > 5000000) {
    $error = "File is too large. " . $_FILES["img"]["size"] . "<br/>";
    $uploadOk = 0;
  }

  // Allow certain file formats
  if ($extension != "jpg" && $extension != "png" && $extension != "jpeg") {
    $error = "Only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
  }

  // Check if $uploadOk is set to 0 by an error
  if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded. (" . $error . ")";
    exit;
  } else {
    $newFilename = "menu-" .  uniqid() . "-" . time() . "." . $extension;
    $target_dir = "../assets/img/menu/";

    $source = $_FILES["img"]["tmp_name"];
    $destination = $target_dir . $newFilename;

    move_uploaded_file($source, $destination);
  }

  $menu = htmlspecialchars($_POST["menu"]);
  $deskripsi = htmlspecialchars($_POST["deskripsi"]);
  $stok = htmlspecialchars($_POST["stok"]);
  $harga = htmlspecialchars($_POST["harga"]);
  $id_cabang = htmlspecialchars($_POST["cabang"]);

  // Query (INSERT DATA)
  $query = "INSERT INTO menu VALUES( 
              '', 
              '$menu', 
              '$newFilename', 
              '$deskripsi', 
              '$stok', 
              '$harga', 
              '$id_cabang',
              current_timestamp(), 
              current_timestamp()
            )";
  $result = mysqli_query($connection, $query);

  if ($result) {
    header("Location: ../pages/menu_makanan.php");
  } else {
    echo mysqli_error($connection);
  }
}

function edit_menu()
{
  global $connection;

  $req_body = json_decode(file_get_contents('php://input'), true);

  $id = $req_body["id"];
  $menu = $req_body["menu"];
  $desc = $req_body["desc"];
  $stok = $req_body["stok"];
  $harga = $req_body['harga'];
  $id_cabang = $req_body['id_cabang'];

  $command = "UPDATE menu 
              SET 
                menu = '$menu', 
                deskripsi = '$desc',
                stok = '$stok', 
                harga = '$harga', 
                id_cabang = '$id_cabang', 
                updated_at = current_timestamp()
              WHERE id_menu = $id";
  $query = mysqli_query($connection, $command);

  if ($query) {
    $response = [
      'status' => 1,
      'message' => 'Update Success'
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

// DELETE
function delete_menu()
{
  global $connection;

  $id = $_GET['id'];
  $query = "DELETE FROM menu WHERE id_menu = $id";

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
