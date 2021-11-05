create table mailingList (
	id serial primary key,
	email varchar(150),
	mailingListBodyId varchar(50)
)

create table mailinglistBodies (
	id serial primary key,
	mailingListBodyId varchar(50),
	subject varchar(25),
	body text,
	nextMailingListBodyId varchar(50)
)

create table emailConfirmation (
	id serial primary key,
	email varchar(150),
	dateAdded date
)