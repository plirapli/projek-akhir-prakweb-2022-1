<?php

require_once '../api/connection.php';

$username = $_POST["username"];
$password = $_POST["password"];

$query = "SELECT * FROM user WHERE username = '$username' AND password = '$password'";
$result = mysqli_query($connection, $query);
$data = mysqli_fetch_assoc($result);
$is_found = mysqli_num_rows($result);

var_dump($data);

if ($is_found) {
  $_SESSION["userID"] = $data["id_user"];
  $_SESSION["name"] = $data["nama"];
  $_SESSION["roles"] = $data["id_role"];

  if ($data["id_role"] == 1 || $data["id_role"] == 3) {
    header("Location: ../pages/index.php");
  } else {
    header("Location: ../pages_user/index.php");
  }
} else {
  header("Location: ../index.php?pesan=login_gagal");
}
