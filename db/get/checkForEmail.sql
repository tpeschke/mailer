select * from mailinglist ml
full join emailconfirmation ec on ml.email = ec.email
where ml.email = $1 or ec.email = $1