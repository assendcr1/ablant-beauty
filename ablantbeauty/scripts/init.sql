-- AblantBeauty database initialisation
-- Runs once when the MySQL container first starts

CREATE DATABASE IF NOT EXISTS `ablantbeauty_wp`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES ON `ablantbeauty_wp`.* TO 'ablant_user'@'%';
FLUSH PRIVILEGES;
