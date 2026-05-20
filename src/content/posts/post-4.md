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
    url: '/dronee.png'
    alt: 'TX/RX/jammer geometry: remote controller (TX₁) and jammer (TX₂) acting on the drone receiver (RX), with the two range vectors r_{TX₁,RX} and r_{TX₂,RX} that define the deauthentication condition.'
external_url: 'https://orcid.org/0009-0009-0602-2458'
---

## Problem

Unauthorised drone activity is escalating across civilian, commercial,
and security contexts, and most published anti-drone work optimises
for one half of the loop only, either detection accuracy or
neutralisation effectiveness. We set out to build an integrated
prototype that does both: real-time visual detection with YOLOv8 and
WiFi-deauthentication neutralisation, evaluated under realistic
distance and hardware conditions.

## My contribution

First author of four (corresponding author). I led the work, the
detection pipeline, the WiFi-attack integration, the experimental
protocol, and the write-up. Collaborators contributed model
benchmarking, hardware integration, and the wireless-attack
implementation.

## Method

The prototype has three components: a camera for real-time video
capture, a processing unit running YOLOv8 for detection, and an ALFA
AWUS036ACS wireless card driven by MDK4 (Kali Linux) for
deauthentication. The detection and the attack run as a single loop:
on a positive detection above the confidence threshold, the
neutralisation phase fires.

We trained and compared four YOLO families, v4, v5s, v7, v8, for
100 epochs each on the same dataset, on the CEDIA supercomputer
(NVIDIA A100 SXM, AMD EPYC 7742, 80 GB RAM) plus consumer hardware
(Asus Ryzen 7, NVIDIA RTX 2060). Edge-deployment was validated on a
Raspberry Pi 4 with Tiny YOLO.

The wireless side targets WPA2 networks without Management Frame
Protection (MFP). The Realtek RTL8814AU adapter, with packet
injection on 2.4 GHz and 5 GHz, sends forged deauthentication frames
that disconnect the drone from its controller. WPA3 with MFP would
defeat this attack, adoption was around 1% as of March 2024, so
WPA2 remains the realistic threat surface.

## Dataset

Public drone datasets (Roboflow included) proved unsuitable, too
much object-type variance, not enough specific drone labels. We
captured and **manually labelled 8,593 drone images using LabelImg**
across a range of environments. Most images are in clear backgrounds,
which biases the model toward open-sky detection; complex clutter is
a known limit and a follow-up direction.

## Results

**Detection (Table 3 of the paper).** All models trained for 100
epochs on the same dataset:

| Model | mAP@0.5 | mAP@0.5:0.95 | Recall | Train time / epoch |
|---|---|---|---|---|
| YOLOv4 | 89% | 55% | 95% | 30 s |
| YOLOv5s | 91% | 54% | 96% | 43 s |
| YOLOv7 | 92% | 53% | 97% | 4 h 50 m |
| **YOLOv8s** | **94%** | **68%** | **98%** | 6 h 30 m |

YOLOv8s wins on precision and recall but at the cost of training
time and model size. v5s is the right trade-off for resource-limited
edge deployment, and we explicitly recommend it for the Raspberry Pi
target.

Classifier confusion (drone vs bird vs plane) on a normalised
confusion matrix: **drone class true-positive rate 0.95**, zero
false negatives for birds, some bird/plane confusion that motivates
further class balancing.

**Neutralisation.** Tested on a DEERC D20 drone at 2 m, 5 m, 10 m,
across Raspberry Pi 4 and a VM-hosted Kali Linux on an Asus Pro 2020,
with an Alfa AC1900 wireless adapter, on both 2.4 GHz and 5.8 GHz
bands. Ten repetitions per distance, 95% confidence intervals:

- Raspberry Pi 4 disconnection time: **3.68–4.46 s** across distances
- VM disconnection time: **2.78–4.26 s** across distances

Attacking all channels simultaneously increased the time-to-disconnect
but guaranteed a 100% success rate in our test set.

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

- **WPA2-only attack surface.** The system does nothing against a
  drone on WPA3 + MFP. The honest framing is "effective against the
  ~99% of drone-controller links that still use WPA2 today, useless
  against the 1% that don't."
- **Dataset bias toward clear-sky imagery.** Real-world airspace
  rarely cooperates with that.
- **Range bias toward 2–10 m.** We validated at distances that are
  short for real anti-drone operations. Longer-range validation is a
  follow-up.
- **Dual-use ethics.** WiFi deauthentication is regulated in many
  jurisdictions; deployment requires legal review per operator.
- **Bird vs plane confusion.** The model has zero false negatives on
  birds but mislabels some birds as planes and vice-versa.

## What I would do differently

- Expand the dataset deliberately toward cluttered backgrounds and
  longer ranges, both of which were known gaps at publication.
- Run a YOLOv5s + Tiny YOLO comparison on the Raspberry Pi target
  with frame-rate as the primary metric, since on-device latency
  matters more than offline mAP for the edge case.
- Add WPA3 + MFP probing to the system so it can report "this target
  is not vulnerable to deauthentication" instead of failing silently.
- Replace the manual LabelImg workflow with a semi-automated labelling
  pipeline; 8,593 hand-labels was a real bottleneck.
- Add structured per-attack telemetry (time-to-disconnect, channel,
  band, distance) so future improvements have a reproducible baseline.
