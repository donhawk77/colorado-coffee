# Implementation Plan: APEX Login Screen 🏔️💻

At the intersection of extreme altitude and data security, we will implement a "Vault Login" for the APEX Collective. This will be the gateway to the user's private coffee archives and subscription details.

## Task 1: UI Structure (index.html)
- **Objective:** Create a hidden Login Modal similar to the `vault-checkout` overlay.
- **Components:**
  - Login form with fields for `Membership ID` (Email) and `Access Key` (Password).
  - "Forgot Access Key" link.
  - "Join The Collective" (Register) link.
- **Action:** Add a `<div id="vault-login">` section before the closing `</body>` tag.

## Task 2: Brand Aesthetics (style.css)
- **Objective:** Ensure the login experience feels "Elite" and "High-Contrast."
- **Focus:**
  - Background overlay should use `rgba(18, 18, 18, 0.98)` with a heavy blur.
  - Typography should use `var(--font-heading)` for titles.
  - Inputs should have the signature `1px solid var(--color-gold)` focus state.
- **Action:** Add specific `.login-overlay` and `.login-form` classes to the main stylesheet.

## Task 3: Site Logic (main.js)
- **Objective:** Handle the modal state and a simulated "Authentication" process.
- **Deliverables:**
  - Event listeners for "Login" buttons in the navigation.
  - Form submission logic with a simulated "Database Trace" loading state.
  - Success message: "ACCESS GRANTED. SYNCING PROFILE DATA."
- **Action:** Add `Vault Login Logic` section towards the bottom of `main.js`.

## Task 4: Documentation (README.md)
- **Objective:** Update the feature list to include "Vault Membership Access."
- **Action:** Append the feature to the `Features` section of the README.
