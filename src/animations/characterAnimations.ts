import type { ModelAnimationOpts } from "../types_interfaces/abstract/genericUserModel"

type CharacterAnimations = {
  PUNK_ANIMATIONS: Array<ModelAnimationOpts>;
};

const characterAnimations: CharacterAnimations = {
  PUNK_ANIMATIONS: [
    { key: "punkIdle", frameStart: 0, frameEnd: 3, repeat: true },
    { key: "punkRun", frameStart: 0, frameEnd: 5, repeat: true },
    { key: "punkJump", frameStart: 0, frameEnd: 4, repeat: true }
  ]
};

export default characterAnimations;
