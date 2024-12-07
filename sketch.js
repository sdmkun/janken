const handType = ["rock", "paper", "scissor", "fuck"];
const wins = {
  rock: ["scissor", "fuck"],
  paper: ["rock"],
  scissor: ["paper"],
  fuck: ["paper", "scissor"],
};

const handToEmoji = {
  rock: "✊",
  paper: "🖐️",
  scissor: "✌️",
  fuck: "🖕",
};

let hands, enemyHand;
let resultSprite;

const generateSprite = (size, emoji) => {
  const sprite = new Sprite();
  sprite.width = size;
  sprite.height = size;
  sprite.image = emoji;
  return sprite;
};

const judge = (a, b) => {
  if (a === b) {
    return 0;
  }
  if (wins[a].includes(b)) {
    return 1;
  }
  return -1;
};

function setup() {
  new Canvas(500, 500, "webgl");
  displayMode("centered", "smooth", 1);

  hands = new Map();
  hands["rock"] = generateSprite(100, "✊");
  hands["paper"] = generateSprite(100, "🖐️");
  hands["scissor"] = generateSprite(100, "✌️");
  //   hands["fuck"] = generateSprite(100, "🖕");

  const enemyHandNumber = Math.floor(random(0, 4));
  enemyHand = handType[enemyHandNumber];
  const enemyHandSprite = generateSprite(150, handToEmoji[enemyHand]);
  enemyHandSprite.y = 100;

  resultSprite = generateSprite(150, "?");
  resultSprite.y = 300;
}

function draw() {
  background(220);

  for (const [hand, sprite] of Object.entries(hands)) {
    if (sprite.mouse.presses()) {
      const result = judge(hand, enemyHand);
      if (result === 1) {
        resultSprite.image = "W";
      } else if (result === 0) {
        resultSprite.image = "-";
      } else {
        resultSprite.image = "L";
      }
    }

    sprite.scale = sprite.mouse.pressing() ? 2.0 : 1.0;
  }
}
