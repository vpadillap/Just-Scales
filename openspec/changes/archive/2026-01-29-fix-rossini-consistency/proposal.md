# Proposal: Unify Rossini Scale Definitions

## Problem
Currently, the "Rossini Scale" is defined differently in two categories:
1.  **Range**: Uses a standard 13-note pattern with uniform eighth notes.
2.  **Connection**: Uses a complex pattern with mixed sixteenth notes and rhythmic variations.

The user has identified that the **Range** version is the correct one.

## Solution
Update the "Rossini Scale" in the **Connection** category to match the definition used in the **Range** category.

## Impact
-   `src/data/scales.ts`: Replace `connect-rossini` pattern and description with `range-rossini` values.
