# JusticeWatch: Software Engineering Group 7 Sp25

## Team Members:

- Gordon Lee / @gordonworldlee
- Gabriel Keller / @gjkeller
- Andres Osornio / @andyo1
- Hari Shankar / @harishankar5
- Long Phan / @longphan084

## Phase 1:

git sha: 9ba7fb1f706a730f2e3d1fde57243de119f99aa2


API Design: https://documenter.getpostman.com/view/42447157/2sAYdZtYvV 

Website Link: https://justicewatch.me/ 

Phase Leader: Gordon Lee
  - Organized team meetings and organized tasks for each member.

- Gordon Lee - est: 5 Hours, actual 3 hours
- Gabriel Keller - est: 5 Hours, actual 3 hours
- Andres Osornio - est: 5 Hours, actual 3 hours
- Hari Shankar - est: 5 Hours, actual 3 hours
- Long Phan - est: 5 Hours, actual 3 hours







## Project Proposal

JusticeWatch is a civic engagement platform that visualizes Texas police brutality hotspots and tracks related legislation, misconduct cases, and police department accountability. Users can explore incidents, legislation, and department scorecards on an interactive map. It guides users to explore all of these across different large and small Texas cities to learn more about how police brutality is present and being addressed in their state.

## Data Sources

Mapping Police Violence Dataset: https://mappingpoliceviolence.us/ (CSV dataset for police killings and misconduct incidents).
National Conference of State Legislatures (NCSL) Policing Legislation Database: https://www.ncsl.org/civil-and-criminal-justice/policing-legislation-databaseas
Police Scorecard API: https://policescorecard.docs.apiary.io/#reference/scorecard/state/get-summary-for-a-single-state (RESTful API for department performance data).

## Models

1. Police Misconduct Incidents
2. Legislation Tracker
3. Police Department Accountability Scorecards

### 1. Police Misconduct Incidents

- **Estimated Instances:** ~13,000

- **Attributes:**

  - Date of Incident: When the misconduct occurred.
  - Location: Street address, city, state, and zip code.
  - Victim Information: Age, race, gender, and image of the victim.
  - Cause of Death or Misconduct Type: Excessive force, shooting, etc.
  - Outcome: Official disposition (e.g., justified or not), criminal charges filed, or disciplinary action taken.

- **Media:** News articles, maps, photos

- **Connections:**
  - Connect to the score to see if they correlate
  - Connect to the legislation passed to see if there's any correlation

### 2. Legislation Tracker

- **Estimated Instances:** ~8000

- **Attributes:**

  - Bill Title and Summary: Name of the bill and its key details.
  - State and Legislative Body: Where the bill was introduced (e.g., California Senate).
  - Status of Bill: Pending, passed or failed status with last action date.
  - Author Information: Name and political party of the bill's sponsor(s).
  - Topics Covered: Areas like use-of-force policies, body cameras, or qualified immunity reforms.

- **Media:** Website, Text

- **Connections:**
  - Connect to incidents to see if they had an effect
  - Connect to scorecards to see if the legislation affects them

### 3. Police Department Accountability Scorecards

- **Estimated Instances:** 1000+

- **Attributes:**

  - Overall Accountability Score: A grade based on metrics like transparency and use-of-force policies.
  - Funding Information: Annual budget allocated to the department.
  - Arrest Data by Race: Number of arrests broken down by racial demographics.
  - Homicide Rates by Race: Rate of homicides committed against specific racial groups within the jurisdiction.
  - State/city

- **Media:** Maps, Images, Text Feeds of Descriptions

- **Connections:**
  - Connect to incidents to see if the amount matches the score
  - Connect to legislation to see if the number passed matches the score

## Questions our Site will Answer:

- Has the passed reform legislation had a positive effect on policing?
- Where and to whom are negative policing incidents likely to happen?
- What types of legislation passed & funding amount affect policing positively/negatively?