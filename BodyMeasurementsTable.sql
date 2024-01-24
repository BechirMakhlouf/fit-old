CREATE TABLE body_measurements (
  id int NOT NULL AUTO_INCREMENT,
  user_id varchar(15) NOT NULL,
  left_arm float,
  right_arm float,
  waist float,
  chest float,
  left_thigh float,
  right_thigh float,
  PRIMARY KEY (id)
)
