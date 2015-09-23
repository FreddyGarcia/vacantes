-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- Host: localhost
-- Generation Time: Sep 23, 2015 at 02:35 PM
-- Server version: 5.0.51
-- PHP Version: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- Database: `rh`
-- 

-- --------------------------------------------------------

-- 
-- Table structure for table `candidatos`
-- 

CREATE TABLE `candidatos` (
  `candidato_id` int(11) NOT NULL auto_increment,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `edad` tinyint(4) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `posicion_id` int(11) NOT NULL,
  `salario` decimal(10,0) NOT NULL,
  `experiencia` int(11) NOT NULL,
  PRIMARY KEY  (`candidato_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- 
-- Dumping data for table `candidatos`
-- 

INSERT INTO `candidatos` (`candidato_id`, `nombre`, `apellido`, `edad`, `foto`, `posicion_id`, `salario`, `experiencia`) VALUES (1, 'Manolo', 'Del Valle', 29, '1.jpg', 0, 0, 0);
INSERT INTO `candidatos` (`candidato_id`, `nombre`, `apellido`, `edad`, `foto`, `posicion_id`, `salario`, `experiencia`) VALUES (2, 'Manuel', 'De La Mancha', 39, '2.jpg', 0, 0, 0);

-- --------------------------------------------------------

-- 
-- Table structure for table `posiciones`
-- 

CREATE TABLE `posiciones` (
  `posicion_id` int(11) NOT NULL auto_increment,
  `descripcion` varchar(30) NOT NULL,
  PRIMARY KEY  (`posicion_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

-- 
-- Dumping data for table `posiciones`
-- 

INSERT INTO `posiciones` (`posicion_id`, `descripcion`) VALUES (1, 'Gerente');
INSERT INTO `posiciones` (`posicion_id`, `descripcion`) VALUES (2, 'Limpieza');
INSERT INTO `posiciones` (`posicion_id`, `descripcion`) VALUES (3, 'Mantenimiento');
