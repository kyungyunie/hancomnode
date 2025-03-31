-- users테이블 생성
use nodejs;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `age` int	unsigned NOT NULL,
  `married` tinyint NOT NULL,
  `comment` text NOT NULL,
  `created_at` datetime NULL DEFAULT now(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;