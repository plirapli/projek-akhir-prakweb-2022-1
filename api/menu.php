<?php

require_once 'connection.php';

if (function_exists($_GET['function'])) {
  $_GET['function']();
}

// GET
function get_menu()
{
  global $connection;

  $query = "SELECT * FROM menu";
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
  $query = "SELECT * FROM menu WHERE menu.id_menu = $id";
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

  $extension  = strtolower(pathinfo($_FILES["img"]["name"], PATHINFO_EXTENSION));
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

  // Query (INSERT DATA)
  $query = "INSERT INTO menu VALUES( 
              '', 
              '$menu', 
              '$newFilename', 
              '$deskripsi', 
              '$stok', 
              '$harga', 
              current_timestamp(), 
              current_timestamp()
            )";
  $result = mysqli_query($connection, $query);

  if ($result) {
    header("Location: ../pages/menu_makanan.php?pesan=add_success");
  } else {
    echo mysqli_error($connection);
  }
}

function edit_menu()
{
  global $connection;

  $file = $_FILES['img']['tmp_name'];
  $extension  = strtolower(pathinfo($_FILES["img"]["name"], PATHINFO_EXTENSION));
  $uploadOk = 1;

  $newFilename = "menu-" .  uniqid() . "-" . time() . "." . $extension;
  $target_dir = "../assets/img/menu/";
  $destination = $target_dir . $newFilename;

  if ($file != '') {
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
  }

  if ($uploadOk == 1) {
    $id = $_GET["id"];
    $menu = htmlspecialchars($_POST["menu"]);
    $deskripsi = htmlspecialchars($_POST["deskripsi"]);
    $stok = htmlspecialchars($_POST["stok"]);
    $harga = htmlspecialchars($_POST["harga"]);

    if ($file != '') {
      $res = mysqli_query($connection, "SELECT * from menu WHERE id_menu = $id LIMIT 1");
      if ($row = mysqli_fetch_array($res)) {
        $deleteimage = $row['img_menu'];
      }

      unlink($target_dir . $deleteimage);
      move_uploaded_file($file, $destination);

      $sql = "UPDATE menu 
              SET 
                menu = '$menu', 
                deskripsi = '$deskripsi',
                img_menu = '$newFilename',
                stok = '$stok', 
                harga = '$harga', 
                updated_at = current_timestamp()
              WHERE id_menu = $id";
    } else {
      $sql = "UPDATE menu 
              SET 
                menu = '$menu', 
                deskripsi = '$deskripsi',
                stok = '$stok', 
                harga = '$harga', 
                updated_at = current_timestamp()
              WHERE id_menu = $id";
    }

    $query = mysqli_query($connection, $sql);

    if ($query) {
      header("Location: ../pages/menu_makanan.php?pesan=update_success");
    } else {
      echo 'Error: ' . mysqli_error($connection);
    }
  } else {
    echo "Error" . $error;
  }
}

function edit_menu_stock()
{
  global $connection;

  $req_body = json_decode(file_get_contents('php://input'), true);

  $id_menu = $req_body["id_menu"];
  $stok = $req_body["qty"];

  $command = "UPDATE menu 
              SET stok = stok - '$stok', updated_at = current_timestamp()
              WHERE id_menu = $id_menu";
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
  $target_dir = "../assets/img/menu/";

  $search_sql = "SELECT * from menu WHERE id_menu = $id LIMIT 1";
  $search_query = mysqli_query($connection, $search_sql);

  if ($search_query) {
    // Delete menu image
    $row = mysqli_fetch_array($search_query);
    $delete_image = $row['img_menu'];
    unlink($target_dir . $delete_image);

    // Delete menu
    $delete_sql = "DELETE FROM menu WHERE id_menu = $id";
    $delete_query = mysqli_query($connection, $delete_sql);
    if ($delete_query) {
      header("Location: ../pages/menu_makanan.php?pesan=delete_success");
    } else {
      echo "Error: " . mysqli_error($connection);
    }
  } else {
    echo "Error: " . mysqli_error($connection);
  }
}
