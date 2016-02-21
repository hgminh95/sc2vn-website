# SC2VN Website - Project overview
This document is under heavy development.

## About this document

This document provides outline functional specifications and requirements for
Starcraft 2 VN website. It is designed to guide system development and design,
including database structure, site architecture, functionality and use cases.

This document will change, continuously, as the project proceeds. We will add
details and edit existing information as database structure, site architecture
and use cases evolve in the course of the project.

## Introduction

This project is a web based application which aim to help Vietnamese Starcraft 2
event organizers, teams, and players to run, compete in, and follow tournament
and event in the easiest way possible.

## Functional Description

The following are the major functionalities:
- Provide tools that help event organizers create, manage and schedule a
Starcraft 2 tournament.
- Allow users to register for the tournament, follow the current tournament, and
browse the previous.
- Provide ranking system.
- Provide administrator control panel.

Non-functional requirements:
- Easy to use interface
- Mobile friendly

For more information on how the website work, see [user_stories]
(https://github.com/hgminh95/sc2vn-website/blob/master/docs/stories.md).

## Site Structure and Navigation

First level navigation will be as follows:
- News. Current news.
- Tournaments.
- Clans. Information about clans.
- Guide. Tutorial, and replay which is contributed by community.

All pages will include a set of secondary 'standard' links, as well:
- Feedback.
- Search. A full-text search for entire site.
- Login. Log in to the site using Battle.net account.
- Contact. Contact information for sc2.vn headquarters and staff.

Site map here.

## Modules
Can be divided into modules:
- User Module
  - Authentication
  - Notification
  - Permission
- Clan Module
  - Basic actions: create, read, update, delete (CRUD)
- Tournament Module (see [tournament]
(https://github.com/hgminh95/sc2vn-website/blob/master/docs/tournament.md) for
more details)
  - CRUD
  - Game
    - CRUD
    - Use replay file as input data
  - Match
    - CRUD
  - Tournament scheduling
- Article Module
  - CRUD
  - WYSIWYG text editor for editing

## Plan

_**February 22 - April 3: Create a website that can perform all core functions
basically**_

*Week 1*:
- Implement Article Module
- Implement part of User Module: Authentication
- Implement simple admin interface

*Week 2*:
- Implement parts of Tournament Module: CRUD, Game (CRUD), Match (CRUD)
- Implement part of User Module: Notification

*Week 3*:

*Week 4*:

*Week 5*:

*Week 6*:

_**April 4 - April 30: Do something**_
