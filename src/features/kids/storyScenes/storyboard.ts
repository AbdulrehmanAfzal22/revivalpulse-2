import inventory from './storyboardInventory.json';

/** Different sets, not crops of the same landscape. Each story reserves a
 * different set for every return to a subject, including its chapter covers. */
export const STORYBOARD_STAGES = [
  'openValley', 'stoneTerrace', 'archway', 'wovenMat', 'terracedSlope', 'canopy',
  'windowSeat', 'rockGorge', 'courtyard', 'shelf', 'gardenWall', 'windingPath',
  'colonnade', 'riverBend', 'sunkenCourt', 'cliffLedge', 'mosaicFloor', 'recess',
  'palmGrove', 'gateway', 'raisedDais', 'sandyBasin', 'timberFrame', 'hillTown',
  'sideStreet', 'roundWindow', 'reedScreen', 'steppedPlatform', 'clothBackdrop',
  'stoneBridge', 'roofTerrace', 'alcove',
] as const;
export type StoryboardStage = typeof STORYBOARD_STAGES[number];
export interface StoryboardShot {
  stage: StoryboardStage;
  /** Encounter across the entire story, rather than restarting each chapter. */
  encounter: number;
  /** Independently drawn object arrangement. */
  pose: number;
}
const shots = inventory as Record<string, StoryboardShot>;
export function storyboardFor(seed: string): StoryboardShot | undefined { return shots[seed]; }
