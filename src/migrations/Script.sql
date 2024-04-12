CREATE TABLE Users 
(	username		VARCHAR(100) PRIMARY KEY,
	passwords		VARCHAR(100) NOT NULL		
);

CREATE TABLE Garden
(	gardenid		INT			 PRIMARY KEY,
	gardenname		VARCHAR(100) NOT NULL,
	username		VARCHAR(100) NOT NULL,
	comport		VARCHAR(50) NOT NULL,
	CONSTRAINT 	fk_user_name FOREIGN KEY(username) REFERENCES Users(username) 
);

CREATE TABLE Device
(	deviceid		INT			 PRIMARY KEY,
	value				VARCHAR(100) NOT NULL,
	pin 				VARCHAR(50) NOT NULL,
	type				VARCHAR(50) NOT NULL,
	gardenid		INT			 NOT NULL,
	CONSTRAINT 	fk_garden_id FOREIGN KEY(gardenid) REFERENCES Garden(gardenid) 
);

CREATE TABLE ActivityLog
(	logid			INT			 PRIMARY KEY,
	activity		VARCHAR(100) NOT NULL,
	timestamps		TIMESTAMP	 NOT NULL,
	deviceid		INT			 NOT NULL,
	CONSTRAINT 	fk_device_id FOREIGN KEY(deviceid) REFERENCES Device(deviceid) 
);

CREATE TABLE Sensor
(	deviceid		INT			 PRIMARY KEY,
	locations		VARCHAR(100) NOT NULL,
	timestamps		TIMESTAMP	 NOT NULL,
	CONSTRAINT 	fk_device_id1 FOREIGN KEY(deviceid) REFERENCES Device(deviceid) 
);

CREATE TABLE OutputDevice
(	deviceid		INT			 PRIMARY KEY,
	start_time		TIME		 NOT NULL,
	duration		TIME		 NOT NULL,
	thresholds		VARCHAR(100) NOT NULL,
	CONSTRAINT 	fk_device_id2 FOREIGN KEY(deviceid) REFERENCES Device(deviceid) 
);
