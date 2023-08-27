-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-08-2023 a las 03:01:32
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `spotify`
--
CREATE DATABASE IF NOT EXISTS `spotify` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `spotify`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `artist`
--

CREATE TABLE `artist` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `artist`
--

INSERT INTO `artist` (`Id`, `Name`) VALUES
(1, 'The White Stripes'),
(3, 'The Beatles'),
(4, 'Van Halen'),
(5, 'Feid'),
(6, 'Eslabon Armado'),
(7, 'Rauw Alejandro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `track`
--

CREATE TABLE `track` (
  `ISRC` varchar(50) NOT NULL,
  `Artist` int(11) DEFAULT NULL,
  `Title` varchar(200) DEFAULT NULL,
  `ImageUrl` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `track`
--

INSERT INTO `track` (`ISRC`, `Artist`, `Title`, `ImageUrl`) VALUES
('GBAYE0601477', 3, 'Yesterday - Remastered 2009', 'https://i.scdn.co/image/ab67616d0000b273e3e3b64cea45265469d4cafa'),
('GBAYE0601498', 3, 'Yellow Submarine - Remastered 2009', 'https://i.scdn.co/image/ab67616d0000b27328b8b9b46428896e6491e97a'),
('TCAET2043267', 6, 'Catorce de Febrero', 'https://i.scdn.co/image/ab67616d0000b2733e59459508943946907ad74f'),
('USSD12100297', 7, 'Cosa Guapa', 'https://i.scdn.co/image/ab67616d0000b273d9525f27b0a9e25b1fa21230'),
('USSD12201170', 7, 'LEJOS DEL CIELO', 'https://i.scdn.co/image/ab67616d0000b27377ca8a929a08890cb6c8691c'),
('USSD12300461', 7, 'Hayami Hana', 'https://i.scdn.co/image/ab67616d0000b273690062738fe0e637c90cbb49'),
('USUM72107364', 5, 'TE MATA', 'https://i.scdn.co/image/ab67616d0000b2733d7b95838b533131d1db6292'),
('USUM72304895', 5, 'Classy 101', 'https://i.scdn.co/image/ab67616d0000b27329ebee2b5fb008871fcd201a'),
('USVT10300001', 1, 'Seven Nation Army', 'https://i.scdn.co/image/ab67616d0000b273a69f71a8794e2d867a52f98f'),
('USWB11403680', 4, 'Jump - 2015 Remaster', 'https://i.scdn.co/image/ab67616d0000b273b414c63fb435b622238c15ed');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `track`
--
ALTER TABLE `track`
  ADD PRIMARY KEY (`ISRC`),
  ADD KEY `Artist` (`Artist`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `artist`
--
ALTER TABLE `artist`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `track`
--
ALTER TABLE `track`
  ADD CONSTRAINT `track_ibfk_1` FOREIGN KEY (`Artist`) REFERENCES `artist` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
