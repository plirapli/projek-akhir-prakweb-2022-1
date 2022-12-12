<?php

require_once '../api/connection.php';

$nama = strip_tags($_POST["nama"]);
$email = strip_tags($_POST["email"]);
$username = strip_tags($_POST["username"]);
$password = strip_tags($_POST["password"]);
$conf_password = strip_tags($_POST["confirm_password"]);

// Query Data dari TB user (SELECT ALL)
$query_check = "SELECT * FROM user WHERE `username` = '$username' OR email = '$email'";
$is_found = mysqli_num_rows(mysqli_query($connection, $query_check));

// Cek username dah ada atau belum
if ($is_found === 0) {
  // Cek password yang ditulis sama kaya confirm password ga
  if ($password === $conf_password) {
    $query_insert = "INSERT INTO user 
                     VALUES( 
                      '', 
                      '$nama', 
                      '$email', 
                      '$username', 
                      '$password',
                      '',
                      current_timestamp(),
                      current_timestamp(),
                      2
                    )";
    $result = mysqli_query($connection, $query_insert);

    if ($result) {
      header("Location: ../index.php?pesan=register_success");
      exit;
    } else {
      echo "Error: " . mysqli_error($connection);
    }
  } else {
    header("Location: ../index.php?pesan=password_beda");
    exit;
  }
} else {
  header("Location: ../index.php?pesan=username_ada");
  exit;
}
