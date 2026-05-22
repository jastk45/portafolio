---
title: 'Deep Learning-Based Leukemia Diagnosis from Bone Marrow Images'
author: 'Luis Zhinin-Vera, Alejandro Moya, Elena Pretel, Jaime Astudillo, Javier Jiménez-Ruescas'
authors:
    - 'Luis Zhinin-Vera'
    - 'Alejandro Moya'
    - 'Elena Pretel'
    - 'Jaime Astudillo'
    - 'Javier Jiménez-Ruescas'
authorPosition: 'fourth author of 5'
date: '2024'
order: 3
venue: 'TICEC 2024'
summary: "Deep-learning pipeline for cell detection and classification in Bone Marrow Aspirate Smear (BMAS) images, combining the Munich AML Morphology Dataset (11,058 cells, 15 morphological classes) with a custom 777-cell dataset collected at Hospital 12 de Octubre in Madrid. Reached 90%+ accuracy and 92% precision on leukemia-cell identification. Fourth author of five."
image:
    src: '../../assets/papers/celu.png'
    alt: 'Model output: detection and classification of leukemia cells in bone marrow smear images, with bounding boxes and confidence scores.'
external_url: 'https://orcid.org/0009-0009-0602-2458'
---

## Problem

Differential Cell Count (DCC) on Bone Marrow Aspirate Smear (BMAS)
images is the standard manual workflow for diagnosing blood cancers
such as Acute Myeloid Leukemia. Hematologists count hundreds of cells
per slide, a repetitive, slow process prone to inter-rater variability.
This paper evaluates whether deep learning, trained on a mix of public
and clinical data, performs cell-level detection and classification
well enough to support, not replace, that decision.

## My contribution

Fourth author of five. The LoUISE Research Group (University of
Castilla-La Mancha) led the work in collaboration with Hospital 12 de
Octubre in Madrid. Contributed at the experimental and implementation
level rather than designing the method or owning the clinical data
pipeline.

## Method

Two-stage pipeline: (1) Multi-Otsu thresholding segments background /
cytoplasm / nucleus and removes noise; (2) deep-learning detection and
classification operates on the segmented cells, evaluated through a
confusion matrix. The model outputs bounding boxes with category
labels, scored against IoU (Intersection over Union) and mAP (Mean
Average Precision) at IoU ≥ 0.5. Data augmentation addresses the
structural class imbalance, lymphocytes dominate the Munich dataset
at >3,000 samples, while several pathological classes hold <30.

## Datasets

**Munich AML Morphology Dataset (LMU)**, accessed via TCIA. 18,365
expert-labelled single-cell images, 400×400 pixels, captured at 100×
optical magnification + oil immersion on a Precipoint M8 microscope,
from 100 AML patients at Munich University Hospital (2014–2017) plus
100 non-malignant controls. Used a subset of **11,058 cells across 15
morphological classes** after removing blurred or inconsistently
annotated images:

- Lymphocyte (typical), 3,815
- Myeloblast, 3,150
- Neutrophil (segmented), 1,593
- Monocyte, 1,665
- Eosinophil, 420
- Other 10 classes, totalling ~415

**Hospital 12 de Octubre custom dataset.** Collected 2020–2021 by the
hospital's cytology laboratory across normal bone marrow, chronic
lymphocytic leukemia, Non-Hodgkin lymphoma (incl. Burkitt), Acute
myeloid leukemia, Acute lymphocytic leukemia, and Multiple myeloma.
**Annotated 777 cells across 16 morphological classes** using
COCO-annotator. The 2020 cohort (233 images) reflected the low
photographic quality typical of clinical rather than research data;
the 2021 cohort (104 images, 33 processed) reached higher quality.

## Results

- **>90% accuracy and 92% precision** on the leukemia-cell
  identification task (headline figures from the paper abstract).
- Compared against eight prior published methods (Table 1 of the
  paper) on related blood-smear segmentation tasks, accuracy range
  92–98.9%, on datasets between 29 and 135 images. This work
  differentiates by combining public + clinical data and by handling
  overlapping cells, which most prior methods avoid.

## Risks & limits

- **Class imbalance is structural.** Lymphocytes dominate Munich;
  several pathological classes hold <30 samples. Augmentation mitigates
  but does not resolve the gap.
- **Hospital data is small.** 777 cells from 12 de Octubre demonstrate
  transfer but cannot claim generalisation across hospitals or scanners.
- **Single-scanner training bias.** Munich captures with a Precipoint
  M8 at 100×; clinical deployment elsewhere uses different microscopes.
  Domain shift remains a known and unaddressed risk.
- **No clinical validation reported.** The paper measures model
  performance, not downstream diagnostic outcomes. The framing
  ("support specialists in decision-making") matches that scope.
- **Annotation provenance.** Inter-rater agreement on the custom
  dataset was not quantified.

## Reference

Published at TICEC 2024. The detailed model architecture, class-
specific confusion matrix, and per-class metrics appear in the full
paper; read on ORCID.
