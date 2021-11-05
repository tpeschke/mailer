update mailinglistbodies 
set nextmailinglistbodyid = $1
where nextmailinglistbodyid is null;

update mailinglist
set mailinglistbodyid = $1
where mailinglistbodyid = 'waiting';
