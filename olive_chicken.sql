-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2022 at 08:47 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `olive_chicken`
--

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `menu` varchar(128) NOT NULL,
  `img_menu` varchar(255) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `stok` int(11) NOT NULL,
  `harga` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id_menu`, `menu`, `img_menu`, `deskripsi`, `stok`, `harga`, `created_at`, `updated_at`) VALUES
(1, 'Paket Ayam Goreng 1 ', 'ayamgoreng.jpg', 'Ayam bagian paha bawah dan dada yang digoreng', 9, 10000, '2022-11-22 20:23:11', '2022-11-30 12:31:34'),
(2, 'Ayam Spicy', 'ayampedes.jpg', 'Ayam goreng yang dibalur dengan saos spicy', 34, 11000, '2022-11-22 22:03:22', '2022-11-30 11:39:08'),
(3, 'Ayam Geprek', 'ayamgeprek.jpg', 'Ayam goreng yang digeprek dengan cabai', 0, 12000, '2022-11-22 19:12:34', '2022-11-30 02:27:17'),
(4, 'Ayam Goreng Sayap', 'fried_chicken.jpg', 'Ayam bagian sayap yang digoreng', 11, 9000, '2022-11-20 20:04:43', '2022-11-30 00:17:52'),
(5, 'Chicken Wings', 'chickenwings.jpg', 'Ayam goreng bagian sayap yang dibalur dengan saos spicy', 12, 12000, '2022-11-23 08:21:32', '2022-11-30 01:51:38'),
(6, 'Ayam Spicy', 'chickenspicy.jpg', 'Ayam goreng yang dibalur dengan saos spicy', 20, 11000, '2022-11-23 06:10:23', '2022-11-30 01:51:38'),
(8, 'Buttermilk Chicken', 'buttermilkchicken.jpg', 'Ayam goreng yang dibalur dengan saos buttermilk ', 15, 13000, '2022-11-23 00:09:23', '2022-11-29 22:59:00'),
(9, 'Ayam Goreng Paha Bawah', 'fried_chicken.jpg', 'Ayam bagian paha bawah yang digoreng', 22, 10000, '2022-11-21 00:04:17', '2022-11-30 00:19:27'),
(11, ' Paket Ayam goreng 2', 'friedchicken.jpg', 'Ayam bagian dada yang berjumlah dua yang di goreng', 18, 14000, '2022-11-23 11:34:55', '2022-11-30 00:19:27'),
(14, 'Ayam Geprek Sambal Ijo', 'gepreksambalijo.jpg', 'Ayam goreng yang digeprek dengan cabai hijau', 15, 12000, '2022-11-23 14:54:32', '2022-11-30 16:43:32');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `id_pesanan` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`id_pesanan`, `id_user`, `created_at`) VALUES
(47, 5, '2022-11-30 11:39:08');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `role` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id_role`, `role`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `id_pesanan` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_pesanan`, `id_menu`, `qty`, `harga`) VALUES
(81, 47, 1, 1, 10000),
(82, 47, 2, 3, 11000);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telepon` varchar(20) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama`, `email`, `username`, `password`, `telepon`, `created_at`, `updated_at`, `id_role`) VALUES
(2, 'Muhammad Rafli', 'rafli@rafli', 'plirapli', '123210078', '', '2022-11-16 21:06:40', '2022-11-20 02:49:35', 1),
(5, 'Awang HP', 'awang@awang', 'awanghp', '123210078', '', '2022-11-18 01:34:57', '2022-11-20 14:43:44', 2),
(17, 'Kayisa Barikina', 'kayisa@caca', 'kayisa', '12345678', '', '2022-11-20 15:15:22', '2022-11-25 00:08:14', 1),
(25, 'Komang Yuda', 'komang@komang', 'yudasptr', '123210181', '', '2022-11-29 20:15:25', '2022-11-29 20:15:25', 2),
(28, 'Admin', 'admin@admin', 'admin', 'admin', '', '2022-11-30 14:45:24', '2022-11-30 14:45:32', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id_pesanan`),
  ADD KEY `pesanan_ibfk_1` (`id_user`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `transaksi_ibfk_2` (`id_pesanan`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_role` (`id_role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`),
  ADD CONSTRAINT `transaksi_ibfk_3` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
