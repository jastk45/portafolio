---
title: 'Physics Informed Neural Networks and Gaussian Processes-Hamiltonian Monte Carlo  to solve Ordinary Differential Equations'
author: Jaime Astudillo
date: '13-10-2024'
image:
    url: '/tabla.png'
    alt: 'Post Thumbnail'
---

Non-linear systems of differential equations are vital in fields like biology, finance, ecology, and engineering for modeling dynamic systems. This paper explores two advanced function approximation techniques Physics Informed Neural Networks (PINNs) and Gaussian Processes (GPs) combined with Hamiltonian Monte Carlo (HMC) for solving Ordinary Differential Equations (ODEs) that represent complex physical phenomena. The proposed approach integrates PINNs and GP-HMC, demonstrated through two synthetic models (Lotka Volterra and Fitzhugh Nagumo) and a real dataset (COVID-19 SIR model). The results show that the methodology effectively estimates parameters with low Root Mean Squared Error (RMSE) and Mean Absolute Error (MAE). For example, in the Lotka-Volterra model, GP-HMC achieved an RMSE of 0.044 and MAE of 0.041 for one state variable, while PINNs yielded an RMSE of 0.106 and MAE of 0.081. These results highlight the robustness of the methodology in accurately reconstructing system states across varying levels of variability.

<div class="center">
  <img class="pro-img" width="500px" height="281" src="/Physics.png" alt="Second Image" />
</div>
