export const FRAMES_PER_SCENE = 150;
export const SCENE_FRAME_IDS = [1, 2, 3, 4, 5] as const;
export const SCENE_COUNT = SCENE_FRAME_IDS.length;
export const WHITE_BACKGROUND_SCENE_ID = 4;
export const LITE_MODE_STEP = 2;
export const FRAME_EXTENSION = "webp";
export const CROSSFADE_FRAMES = 15;
export const FRAME_WIDTH = 1280;
export const FRAME_HEIGHT = 720;

export const frameConfig = {
  framesPerScene: FRAMES_PER_SCENE,
  scenes: SCENE_COUNT,
  liteModeStep: LITE_MODE_STEP,
  extension: FRAME_EXTENSION,
  crossfadeFrames: CROSSFADE_FRAMES,
  width: FRAME_WIDTH,
  height: FRAME_HEIGHT,
} as const;

export function framePath(scene: number, frame: number) {
  return `/frames/scene-${scene}/${String(frame).padStart(3, "0")}.${FRAME_EXTENSION}`;
}

export function journeyFramePath(sceneIndex: number, frame: number) {
  const sceneId = SCENE_FRAME_IDS[sceneIndex];
  if (sceneId === undefined) {
    throw new RangeError(`Unknown journey scene index: ${sceneIndex}`);
  }
  return framePath(sceneId, frame);
}
