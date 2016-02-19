# Tournament

This document provides technical information about tournament managing which is
key feature of the website. It is supposed to contain definition, requirement of
tournament and related objects as well as details on how to implement them.

__*NOTE*__: *This document is under heavy development*

## Background Information

### Game
A game is an activity where 2 players compete with each other.

### Match
A match is an activity where 2 players/clans compete with each other. This
usually consist of several games which are played by same players (match between
players) or different players (match between clans). The one who win more games
wins the match.

The format of a match can be Bo1, Bo3, Bo5, and Bo7.

## Tournament Overview

A tournament is a set of matches which are played by some particular rules in
order to determine the winners from a specific group of players/clans.

A tournament MUST contain the following information:

- **Name**: A string containing name of tournament.
- **Start date**:
- **Tournament information**: It is divided into sections. Each section is just
a text providing information about the tournament. Three sections (Overview,
Rule, Prize) is required.
- **Stages**: will be discussed below

Additionally, a tournament COULD contain the following information:

- **Logo, banner**.
- **Additional information**: Similar to tournament information, it contains
sections. However, these sections are defined by event organizer.
-

## Stages

A tournament consists of one or more stage. Each stage starts with a certain
number of players/clans competing against each other in respect to a specific
rule. At the end of a stage, some player with highest score will be select to
advance to the next stage, or receive prize.

Type of a stage can be either Elimination (Single/Double) or Group.

### Group Stage

In group stage, competitors (players or clans) are divided into groups (maybe
only 1 group). In each group, each competitor plays an equal number of match.
Points are awarded to each match, and competitor are ranked based on total
number of points.

How these competitors play is determined by event organizer. It can be manual
or automatic using one of the following ...

*NOT IMPLEMENT YET*

### Elimination Stage

See wiki:
https://en.wikipedia.org/wiki/Single-elimination_tournament
https://en.wikipedia.org/wiki/Double-elimination_tournament
