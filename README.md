# Express Server

Has two routes, POST and GET

## POST

The post requst checks the db doesn't have a candidate with same name (can't remember inital field to compare). If the user does not exist they are added.

## GET

Using aggregate to find the best candidates by comparing the query params and the skills field each candidate has. Each candidate gets a field with their total number of matches, which is then sorted. The one with the most matches (or the first in the list if there are two or more equal number of equal candicates) is sent back
