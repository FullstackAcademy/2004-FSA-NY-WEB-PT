### NOTE: Make sure to allow it to SYNC and SEED the first time, then disable that if you want sessions to work!


(Did not remember to keep writing in here, will try to update later)
# Authentication

Authentication at its simplest could be describe as:

> Verifying that someone is who they claim they are.

On the internet this is an incredibly difficult task.

IP
 - Modern routers (the things in your house that connect you to the internet) are liars. What they do is two things that make this impossible: 1. they don't keep the same ip address for longer than 24 hours, 30 seconds. 2. Routers are the only thing in your house with an IP address - all the devices connected to a router, talk through that one ip by each using  a sub-address that only the router understands.
Subnet Address
 - No, this is below an IP.
GPS
 - Relies on two different devices receiving some sort radio frequency from you, traditionally on a phone this is a satellite plus a cell tower, and using those two and PT you can calculate mathematically where someone is.

People on the internet actually are mysterious. We do not know anything about anyone.

The question of authentication isn't

> How do I know Judith is Judith?

The question instead becomes:

> How do I know this computer is the same computer as before?

The very first answer that the world came up with for this is the all too famous:

username/password combination.

The assumption (and its a bad assumption) is that people are good at keeping secrets, and can tell us two secrets and we both are the only people who know those two secrets. If you tell it to us again later, we believe you are the same person who told us the first time!
