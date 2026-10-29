export const FRAMES_PER_SCENE = 150;
export const SCENE_COUNT = 7;
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
