<?php

require_once '../api/connection.php';

$username = $_POST["username"];
$password = $_POST["password"];

$query = "SELECT * FROM user WHERE username = '$username' AND password = '$password'";
$result = mysqli_query($connection, $query);
$data = mysqli_fetch_assoc($result);
$is_found = mysqli_num_rows($result);

if ($is_found) {
  // Bikin unique session id
  $session_id = uniqid() . "-" . time();

  // Inisiasi session
  session_id($session_id);
  session_start();
  $_SESSION["userID"] = $data["id_user"];
  $_SESSION["name"] = $data["nama"];
  $_SESSION["role"] = $data["id_role"];
  session_write_close();

  if ($data["id_role"] == 1) {
    header("Location: ../pages/index.php");
  } else {
    header("Location: ../pages_user/index.php");
  }
} else {
  header("Location: ../index.php?pesan=login_gagal");
}
