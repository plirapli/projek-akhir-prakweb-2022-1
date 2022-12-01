-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2022 at 05:21 AM
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
(1, 'Paket Ayam Goreng 1 ', 'ayamgoreng.jpg', 'Ayam bagian paha bawah dan dada yang digoreng', 8, 34000, '2022-11-22 20:23:11', '2022-12-01 11:08:31'),
(2, 'Ayam Spicy', 'ayampedes.jpg', 'Ayam goreng yang dibalur dengan saos spicy', 32, 11000, '2022-11-22 22:03:22', '2022-12-01 11:08:31'),
(3, 'Ayam Geprek', 'ayamgeprek.jpg', 'Ayam goreng yang digeprek dengan cabai', 0, 12000, '2022-11-22 19:12:34', '2022-11-30 02:27:17'),
(4, 'Ayam Goreng Sayap', 'fried_chicken.jpg', 'Ayam bagian sayap yang digoreng', 25, 9000, '2022-11-20 20:04:43', '2022-11-30 19:30:52'),
(5, 'Chicken Wings', 'chickenwings.jpg', 'Ayam goreng bagian sayap yang dibalur dengan saos spicy', 12, 12000, '2022-11-23 08:21:32', '2022-11-30 01:51:38'),
(6, 'Ayam Spicy', 'chickenspicy.jpg', 'Ayam goreng yang dibalur dengan saos spicy', 8, 11000, '2022-11-23 06:10:23', '2022-12-01 03:00:17'),
(8, 'Buttermilk Chicken', 'buttermilkchicken.jpg', 'Ayam goreng yang dibalur dengan saos buttermilk ', 18, 14500, '2022-11-23 00:09:23', '2022-12-01 10:38:09'),
(9, 'Ayam Goreng Paha Bawah', 'fried_chicken.jpg', 'Ayam bagian paha bawah yang digoreng', 49, 10000, '2022-11-21 00:04:17', '2022-12-01 10:38:09'),
(11, ' Paket Ayam goreng 2', 'friedchicken.jpg', 'Ayam bagian dada yang berjumlah dua yang di goreng', 18, 37500, '2022-11-23 11:34:55', '2022-12-01 09:59:31'),
(14, 'Ayam Geprek Sambal Ijo', 'gepreksambalijo.jpg', 'Ayam goreng yang digeprek dengan cabai hijau', 14, 12000, '2022-11-23 14:54:32', '2022-12-01 03:00:17');

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
(47, 5, '2022-11-30 11:39:08'),
(49, 5, '2022-11-30 19:30:07'),
(50, 5, '2022-12-01 03:00:17'),
(51, 5, '2022-12-01 03:18:02'),
(52, 25, '2022-12-01 10:38:09'),
(53, 29, '2022-12-01 11:08:30');

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
(82, 47, 2, 3, 11000),
(84, 49, 1, 1, 10000),
(85, 49, 8, 1, 13000),
(86, 49, 6, 11, 11000),
(87, 49, 4, 7, 9000),
(88, 49, 2, 1, 11000),
(89, 50, 1, 1, 10000),
(90, 50, 6, 1, 11000),
(91, 50, 14, 1, 12000),
(92, 50, 9, 6, 10000),
(93, 50, 2, 1, 11000),
(94, 51, 1, 1, 10000),
(95, 52, 2, 1, 11000),
(96, 52, 9, 1, 10000),
(97, 52, 8, 1, 14500),
(101, 53, 1, 1, 34000),
(102, 53, 2, 1, 11000);

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
(2, 'Muhammad Rafli', 'rafli@rafli', 'plirapli', '123210078', '', '2022-11-16 21:06:40', '2022-12-01 02:40:23', 1),
(5, 'Awang HP', 'awang@awang', 'awanghp', '123210078', '', '2022-11-18 01:34:57', '2022-11-20 14:43:44', 2),
(17, 'Kayisa Barikina', 'kayisa@caca', 'kayisa', '12345678', '', '2022-11-20 15:15:22', '2022-11-25 00:08:14', 1),
(25, 'Seva Giantama', 'seva@giantama', 'sevagf', '12345', '0812345667', '2022-11-29 20:15:25', '2022-12-01 02:38:30', 2),
(28, 'Admin', 'admin@admin', 'admin', 'admin', '', '2022-11-30 14:45:24', '2022-11-30 14:45:32', 1),
(29, 'User 1', 'user1@user', 'user_satu', '12345678', '', '2022-12-01 11:01:45', '2022-12-01 11:01:45', 2);

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
  ADD KEY `id_menu` (`id_menu`),
  ADD KEY `transaksi_ibfk_2` (`id_pesanan`);

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
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`) ON DELETE CASCADE,
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
