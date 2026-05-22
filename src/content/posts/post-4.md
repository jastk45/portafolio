---
title: 'Drone Detection and Anti-Drone System Using YOLO: An Effective Approach to Airspace Security'
author: 'Jaime Astudillo, Roberth Chachalo, Cristhian Iza, Luis Zhinin-Vera'
authors:
    - 'Jaime Astudillo'
    - 'Roberth Chachalo'
    - 'Cristhian Iza'
    - 'Luis Zhinin-Vera'
authorPosition: 'first author of 4 (corresponding)'
date: '2023'
order: 1
venue: 'Springer 2023'
summary: "End-to-end drone detection and neutralisation: YOLOv8s reached 94% mAP@0.5 and 98% recall on a custom 8,593-image dataset; WiFi deauthentication via MDK4 + Realtek RTL8814AU disconnected DEERC D20 targets in 2.78–4.46 s at 2–10 m. First author."
image:
    src: '../../assets/papers/dronee.png'
    alt: 'TX/RX/jammer geometry: remote controller (TX₁) and jammer (TX₂) acting on the drone receiver (RX), with the two range vectors r_{TX₁,RX} and r_{TX₂,RX} that define the deauthentication condition.'
external_url: 'https://orcid.org/0009-0009-0602-2458'
---

## Problem

Unauthorised drone activity is escalating across civilian, commercial,
and security contexts. Most published anti-drone work optimises one
half of the loop only, either detection accuracy or neutralisation
effectiveness. This paper delivers an integrated prototype covering
both: real-time visual detection with YOLOv8 and WiFi-deauthentication
neutralisation, evaluated under realistic distance and hardware
conditions.

## My contribution

First author of four (corresponding author). Led the work, the
detection pipeline, the WiFi-attack integration, the experimental
protocol, and the manuscript. Collaborators contributed model
benchmarking, hardware integration, and the wireless-attack
implementation.

## Method

The prototype combines three components: a camera for real-time video
capture, a processing unit running YOLOv8 for detection, and an ALFA
AWUS036ACS wireless card driven by MDK4 (Kali Linux) for
deauthentication. Detection and attack run as a single loop:
neutralisation fires on any positive detection above the confidence
threshold.

Trained and benchmarked four YOLO families, v4, v5s, v7, v8, for 100
epochs each on the same dataset, on the CEDIA supercomputer (NVIDIA
A100 SXM, AMD EPYC 7742, 80 GB RAM) plus consumer hardware (Asus
Ryzen 7, NVIDIA RTX 2060). Validated edge deployment on a Raspberry
Pi 4 with Tiny YOLO.

The wireless side targets WPA2 networks without Management Frame
Protection (MFP). The Realtek RTL8814AU adapter, with packet injection
on 2.4 GHz and 5 GHz, sends forged deauthentication frames that
disconnect the drone from its controller. WPA3 with MFP defeats this
attack; adoption sat near 1% as of March 2024, leaving WPA2 as the
realistic threat surface.

## Dataset

Public drone datasets (Roboflow included) proved unsuitable, excessive
object-type variance and insufficient drone-specific labels. Captured
and **manually labelled 8,593 drone images using LabelImg** across a
range of environments. Most images use clear backgrounds, biasing the
model toward open-sky detection; complex clutter remains a known
limit and a follow-up direction.

## Results

**Detection (Table 3 of the paper).** All models trained for 100
epochs on the same dataset:

| Model | mAP@0.5 | mAP@0.5:0.95 | Recall | Train time / epoch |
|---|---|---|---|---|
| YOLOv4 | 89% | 55% | 95% | 30 s |
| YOLOv5s | 91% | 54% | 96% | 43 s |
| YOLOv7 | 92% | 53% | 97% | 4 h 50 m |
| **YOLOv8s** | **94%** | **68%** | **98%** | 6 h 30 m |

YOLOv8s wins on precision and recall at the cost of training time and
model size. v5s offers the right trade-off for resource-limited edge
deployment and is the explicit recommendation for the Raspberry Pi
target.

Classifier confusion (drone vs bird vs plane) on a normalised
confusion matrix: **drone class true-positive rate 0.95**, zero
false negatives for birds, residual bird/plane confusion motivating
further class balancing.

**Neutralisation.** Tested on a DEERC D20 drone at 2 m, 5 m, 10 m,
across Raspberry Pi 4 and a VM-hosted Kali Linux on an Asus Pro 2020,
with an Alfa AC1900 wireless adapter, on both 2.4 GHz and 5.8 GHz
bands. Ten repetitions per distance, 95% confidence intervals:

- Raspberry Pi 4 disconnection time: **3.68–4.46 s** across distances
- VM disconnection time: **2.78–4.26 s** across distances

Attacking all channels simultaneously increased time-to-disconnect
but guaranteed a 100% success rate across the test set.

## Baseline & alternatives considered

| Option | Why not |
|---|---|
| Older YOLO (v4) | Faster epochs, lower mAP@0.5:0.95 and weaker recall. |
| Acoustic / radar detection alone | Higher false-positive rates, more infra. |
| RF-only detection (no vision) | Misses drones operating on uncommon RF profiles. |
| Lasers / nets / EMP for neutralisation | Higher collateral risk, harder to scope. |
| Disassociation attacks | Slower than deauthentication, no auto-reconnect cycle. |
| Targeting WPA3 with MFP | Hardened against this attack class, out of scope. |

## Risks & limits

- **WPA2-only attack surface.** The system has no effect on a drone
  running WPA3 + MFP. The honest framing: effective against the ~99%
  of drone-controller links still using WPA2, useless against the 1%
  that do not.
- **Dataset bias toward clear-sky imagery.** Real-world airspace
  rarely cooperates with that assumption.
- **Range bias toward 2–10 m.** Validation distances remain short for
  real anti-drone operations; longer-range validation is a follow-up.
- **Dual-use ethics.** WiFi deauthentication is regulated in many
  jurisdictions; deployment requires legal review per operator.
- **Bird vs plane confusion.** The model produces zero false negatives
  on birds but mislabels some birds as planes and vice-versa.

## What I would do differently

- Expand the dataset deliberately toward cluttered backgrounds and
  longer ranges, both known gaps at publication.
- Benchmark YOLOv5s + Tiny YOLO on the Raspberry Pi target with frame-
  rate as the primary metric, since on-device latency outweighs
  offline mAP for the edge case.
- Add WPA3 + MFP probing so the system reports "target not vulnerable
  to deauthentication" instead of failing silently.
- Replace the manual LabelImg workflow with a semi-automated labelling
  pipeline; 8,593 hand-labels was a real bottleneck.
- Capture structured per-attack telemetry (time-to-disconnect, channel,
  band, distance) so future improvements work from a reproducible
  baseline.
