<?php

session_start();

function cek_session()
{
  if (!isset($_SESSION["userID"])) {
    header("location: ../index.php?pesan=belum_login");
  }
}

function cek_admin()
{
  if ($_SESSION["role"] != 1) {
    header("location: ../pages_user/index.php");
    exit;
  }
}
