// TODO(confirm): verify the supplied visual sequence depicts approved agricultural/export content.
export const frameConfig = {
  extension: "jpg",
  scenes: 7,
  framesPerScene: 60,
  width: 1280,
  height: 720,
} as const;

export function framePath(scene: number, frame: number) {
  return `/frames/scene-${scene}/${String(frame).padStart(3, "0")}.${frameConfig.extension}`;
}
