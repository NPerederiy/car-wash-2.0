CREATE DATABASE CarWashDB

GO

USE CarWashDB

CREATE TABLE Statuses
(
	StatusId int PRIMARY KEY IDENTITY,
	Name varchar(15) NOT NULL
)

CREATE TABLE WashServices
(
	ServiceId int PRIMARY KEY IDENTITY,
	Name nvarchar(50) NOT NULL,
    Description nvarchar(250) NULL,
	Price money NOT NULL,
	LeadTime int NOT NULL
)
	
CREATE TABLE TimeSlots
(
	SlotId int PRIMARY KEY IDENTITY,
	CellId int NOT NULL,
	CellCount int NOT NULL,
	IsFree bit NOT NULL
)

CREATE TABLE Orders
(
	OrderId int PRIMARY KEY IDENTITY,
	StatusId int NOT NULL REFERENCES Statuses(StatusId),
	TimeSlotId int NOT NULL REFERENCES TimeSlots(SlotId),
	ExecutionDate datetime NOT NULL,
	CreatedDate datetime NOT NULL
)
	
CREATE TABLE OrderDetails
(
	OrderId int REFERENCES Orders(OrderId),
	LineItem int IDENTITY,
	ServiceId int REFERENCES WashServices(ServiceId)

	CONSTRAINT PK_OrderDetails PRIMARY KEY NONCLUSTERED ([OrderId], [LineItem])
)

CREATE TABLE Boxes
(
	BoxId int PRIMARY KEY IDENTITY,
	WorkTimeFrom time NOT NULL, 
	WorkTimeTo time NOT NULL,
	WorkerCount int NOT NULL
)

CREATE TABLE BoxDetails
(
	BoxId int REFERENCES Boxes(BoxId),
	LineItem int IDENTITY,
	TimeSlotId int REFERENCES TimeSlots(SlotId)

	CONSTRAINT PK_BoxDetails PRIMARY KEY NONCLUSTERED ([BoxId], [LineItem])
)

GO