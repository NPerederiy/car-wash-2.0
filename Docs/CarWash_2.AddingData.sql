USE CarWashDB

insert Statuses values
	('To do'),
	('In progress'),
	('Done')

insert Boxes values
	('08:00','22:00',4),
	('08:00','22:00',4),
	('08:00','22:00',4)

insert WashServices values
	('Hand Wash', 'Hand wash and dry \nClean windows \nVacuum interior \nCleen wheels \nDress tires \nWipe down dash', $55, 15),
	('Hand Wash & Wax', 'Degrease door jambs \nHand wax with carnauba paste', $150, 20),
	('Wash Polish & Wax', 'Clean and vacuum entire truck \nShampoo all floor mats \nProfessionally applied machine \nPolishing on all painted surfaces', $170, 30),
	('Complete W/O Engine', 'Shampoo carpets and clean leather or vinyl \nDegrease truck jambs', $250, 15),
	('Complete Including Engine', 'Degrease and clean engine', $280, 30),
	('Interior OR Exterior Detail', 'Depending on condition of vehicle', $139, 20)

GO