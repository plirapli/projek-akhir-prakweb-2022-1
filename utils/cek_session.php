<?php

session_start();

function cek_session()
{
  if (!isset($_SESSION["userID"])) {
    header("location: ../index.php?pesan=belum_login");
  }
}
