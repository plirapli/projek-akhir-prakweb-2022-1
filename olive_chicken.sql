-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2022 at 03:28 AM
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
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id_cart`, `id_menu`, `qty`, `id_user`) VALUES
(139, 1, 1, 30),
(140, 2, 1, 2),
(141, 1, 2, 2);

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
(1, 'Paket Ayam Goreng 1 ', 'ayamgoreng.jpg', 'Ayam bagian paha bawah dan dada yang digoreng', 14, 34000, '2022-11-22 20:23:11', '2022-12-07 23:40:14'),
(2, 'Ayam Spicy', 'ayampedes.jpg', 'Ayam goreng yang dibalur dengan saos spicy', 21, 11000, '2022-11-22 22:03:22', '2022-12-07 23:40:14'),
(3, 'Ayam Geprek', 'ayamgeprek.jpg', 'Ayam goreng yang digeprek dengan cabai', 0, 12000, '2022-11-22 19:12:34', '2022-11-30 02:27:17'),
(4, 'Ayam Goreng Sayap', 'menu-6390a8802921c-1670424704.jpeg', 'Ayam bagian sayap yang digoreng dengan lezat', 23, 9250, '2022-11-20 20:04:43', '2022-12-07 23:40:14'),
(5, 'Chicken Wings', 'chickenwings.jpg', 'Ayam goreng bagian sayap yang dibalur dengan saos spicy', 12, 12000, '2022-11-23 08:21:32', '2022-11-30 01:51:38'),
(6, 'Ayam Spicy', 'chickenspicy.jpg', 'Ayam goreng yang dibalur dengan saos spicy', 8, 11000, '2022-11-23 06:10:23', '2022-12-01 03:00:17'),
(8, 'Buttermilk Chicken', 'buttermilkchicken.jpg', 'Ayam goreng yang dibalur dengan saos buttermilk ', 18, 14500, '2022-11-23 00:09:23', '2022-12-01 10:38:09'),
(9, 'Ayam Goreng Paha Bawah', 'menu-6390a9422dd92-1670424898.png', 'Ayam bagian paha bawah yang digoreng', 49, 10000, '2022-11-21 00:04:17', '2022-12-07 21:54:58'),
(11, ' Paket Ayam goreng 2', 'friedchicken.jpg', 'Ayam bagian dada yang berjumlah dua yang di goreng', 18, 37500, '2022-11-23 11:34:55', '2022-12-01 09:59:31'),
(14, 'Ayam Geprek Sambal Ijo', 'gepreksambalijo.jpg', 'Ayam goreng yang digeprek dengan cabai hijau', 14, 12000, '2022-11-23 14:54:32', '2022-12-01 03:00:17');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `id_pesanan` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`id_pesanan`, `id_user`, `created_at`) VALUES
(56, 2, '2022-12-07 17:48:54'),
(57, 2, '2022-12-07 17:58:49'),
(58, 2, '2022-12-07 20:27:07'),
(59, 2, '2022-12-07 23:40:14');

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
  `menu` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_pesanan`, `menu`, `qty`, `harga`) VALUES
(105, 56, 'Ayam Spicy', 3, 11000),
(106, 56, 'Paket Ayam Goreng 1 ', 1, 34000),
(107, 57, 'Ayam Spicy', 3, 11000),
(108, 58, 'Paket Ayam Goreng 1 ', 3, 34000),
(109, 58, 'Ayam Spicy', 2, 11000),
(110, 59, 'Paket Ayam Goreng 1 ', 4, 34000),
(111, 59, 'Ayam Spicy', 2, 11000),
(112, 59, 'Ayam Goreng Sayap', 3, 9250);

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
(5, 'Awang HP', 'awang@awang', 'awanghp', '12345678', '', '2022-11-18 01:34:57', '2022-11-20 14:43:44', 2),
(17, 'Kayisa Barikina', 'kayisa@caca', 'kayisa', '12345678', '', '2022-11-20 15:15:22', '2022-11-25 00:08:14', 1),
(28, 'Admin', 'admin@admin', 'admin', 'admin', '', '2022-11-30 14:45:24', '2022-11-30 14:45:32', 1),
(30, 'User 1', 'user1@user.com', 'user_satu', '123210078', '', '2022-12-08 01:16:55', '2022-12-08 01:16:55', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `id_menu` (`id_menu`),
  ADD KEY `id_user` (`id_user`);

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
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE SET NULL;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`) ON DELETE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
