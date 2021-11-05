delete from emailconfirmation
where dateAdded > CURRENT_DATE - INTERVAL '3 months';