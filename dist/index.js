"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("q5/q5");
require("p5play");
const handType = ["rock", "paper", "scissor", "fuck"];
const wins = new Map();
wins.set("rock", ["scissor", "fuck"]);
wins.set("paper", ["rock"]);
wins.set("scissor", ["paper"]);
wins.set("fuck", ["paper", "scissor"]);
const handToEmoji = new Map();
handToEmoji.set("rock", "✊");
handToEmoji.set("paper", "🖐️");
handToEmoji.set("scissor", "✌️");
handToEmoji.set("fuck", "🖕");
const hands = new Map();
let enemyHand;
let resultSprite;
const generateSprite = (size, emoji) => {
    const sprite = new Sprite();
    sprite.width = size;
    sprite.height = size;
    sprite.image = emoji;
    return sprite;
};
const judge = (a, b) => {
    var _a;
    if (a === b) {
        return 0;
    }
    if ((_a = wins.get(a)) === null || _a === void 0 ? void 0 : _a.includes(b)) {
        return 1;
    }
    return -1;
};
function setup() {
    new Canvas(500, 500, "webgl");
    displayMode("centered", "smooth", 1);
    hands.set("rock", generateSprite(100, "✊"));
    hands.set("paper", generateSprite(100, "🖐️"));
    hands.set("scissor", generateSprite(100, "✌️"));
    //   hands["fuck"] = generateSprite(100, "🖕");
    const enemyHandNumber = Math.floor(random(0, 4));
    enemyHand = handType[enemyHandNumber];
    const enemyHandSprite = generateSprite(150, handToEmoji.get(enemyHand) || "");
    enemyHandSprite.y = 100;
    resultSprite = generateSprite(150, "?");
    resultSprite.y = 300;
}
function draw() {
    background(220);
    for (const [hand, sprite] of hands) {
        if (sprite.mouse.presses("")) {
            const result = judge(hand, enemyHand);
            if (result === 1) {
                resultSprite.image = "W";
            }
            else if (result === 0) {
                resultSprite.image = "-";
            }
            else {
                resultSprite.image = "L";
            }
        }
        sprite.scale = sprite.mouse.pressing("") ? 2.0 : 1.0;
    }
}
