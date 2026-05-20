---
title: 'Neural Agents with Continual Learning Capacities'
author: 'Luis Zhinin-Vera, Elena Pretel, Alejandro Moya, Javier Jiménez-Ruescas, Jaime Astudillo'
authors:
    - 'Luis Zhinin-Vera'
    - 'Elena Pretel'
    - 'Alejandro Moya'
    - 'Javier Jiménez-Ruescas'
    - 'Jaime Astudillo'
authorPosition: 'fifth author of 5'
date: '2024'
order: 4
venue: 'TICEC 2024'
summary: "Reinforcement-learning agent with continual learning that reaches advanced Tic-Tac-Toe play on a physical robot, using an energy-barrier mechanism to prevent catastrophic forgetting. Implemented in C++/OpenCV with a webcam-based perception loop. 92% task-completion accuracy, 15% improvement in task retention vs traditional methods. Fifth author of five."
image:
    url: '/neu.png'
    alt: 'Robotic Tic-Tac-Toe setup used to evaluate the continual-learning RL agent.'
external_url: 'https://orcid.org/0009-0009-0602-2458'
---

## Problem

Artificial neural networks suffer from *catastrophic forgetting*:
training on a new task overwrites what the network learned for the
old one. Animals do not have this problem, children learn new
skills without losing previous ones. The paper proposes a
reinforcement-learning agent with a biologically inspired *continual
learning* mechanism, validated on a physical robot playing 3×3×3
Tic-Tac-Toe.

## My contribution

Fifth author of five. The methodology, the energy-barrier formulation,
the Bellman-equation extension, and the paper itself were led by the
LoUISE Research Group (University of Castilla-La Mancha) and the MIND
Research Group. **I contributed to the C++ / OpenCV implementation of
the agent and to the physical robot integration**, the webcam
perception loop, the sparse-code generation from board state, and the
robot-arm action layer that places tokens on the board.

## Method

The agent has three coupled components:

1. **Webcam + CNN** convert a 480×480 board image into a sparse code
   ("000" = empty, "100" = X, "001" = O) over the nine squares.
2. **Adviser network**, a fully connected classifier, proposes
   playing policies from that sparse code.
3. **Neural agent** of nine mutually inhibiting sigmoidal neurons,
   driven by a shared ramp input K. As K grows, neurons race toward a
   threshold (0.7); the first to cross wins and selects the next
   square. Adviser outputs bias this race.

The novel mechanism is the **energy barrier**: previously learned
policies are stored in read-only adviser networks per learning stage,
preventing later training from overwriting them. The Bellman equation
is extended to a three-term form to incorporate one-step lookahead.

Implemented in C++ / OpenCV on a physical robot with a webcam and a
controlled arm.

## Results

- **92% accuracy** in task completion (averaged across the
  experimental protocol described in the paper).
- **15% improvement in task retention** compared to traditional
  (non-continual) RL methods on the same setup.
- Demonstrated the agent can acquire and retain Tic-Tac-Toe strategies
  across staged training without catastrophic forgetting.

## Risks & limits

- **Tic-Tac-Toe is a small proof of concept.** The state space is
  manageable; whether the energy-barrier mechanism scales to richer
  domains (Chess, Go, real-world robotics) is an open question and
  the paper says so.
- **Physical-world overhead.** The robot-arm + webcam loop is slow
  relative to a pure simulator; experimental throughput is the
  bottleneck.
- **Two-stage curriculum.** The agent learns "token location" first,
  then "advanced strategy" second. Curriculum design matters; the
  paper does not exhaustively explore alternatives.

## Reference

Published at TICEC 2024. Full derivation of the energy-barrier
mechanism, the Bellman extension, and the staged-learning protocol
are in the paper, read on ORCID.
