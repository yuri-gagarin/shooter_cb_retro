import { ModelAnimationOpts, PunkAnimation } from "../types_interfaces/abstract/genericUserModel"

type CharacterAnimations = {
  PUNK_ANIMATIONS: Array<ModelAnimationOpts>;
};

const characterAnimations: CharacterAnimations = {
  PUNK_ANIMATIONS: [
    { key: PunkAnimation.punkIdle, frameStart: 0, frameEnd: 3, repeat: true },
    { key: PunkAnimation.punkRun, frameStart: 0, frameEnd: 5, repeat: true },
    { key: PunkAnimation.punkJump, frameStart: 0, frameEnd: 3, repeat: true, frameRate: 10 },
    { key: PunkAnimation.punkAttackNormal, frameStart: 0, frameEnd: 5, frameRate: 10, repeat: false },
    { key: PunkAnimation.punkAttackSpecial, frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0 ], repeat: false },
    { key: PunkAnimation.punkAttackCharge, frameStart: 0, frameEnd: 5, frameRate: 10, repeat: false }
  ]
};

export default characterAnimations;
