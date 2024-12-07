const handType = ['rock', 'paper', 'scissor', 'finger']

const wins: Map<string, string[]> = new Map([
  ['rock', ['scissor', 'finger']],
  ['paper', ['rock']],
  ['scissor', ['paper']],
  ['finger', ['paper', 'scissor']],
])

const handToEmoji = new Map<string, string>([
  ['rock', '✊'],
  ['paper', '🖐️'],
  ['scissor', '✌️'],
  ['finger', '🖕'],
])

const hands = new Map<string, Sprite>()
let enemyHand: string
let enemyHandSprite: Sprite

let level = 1
let lastResult = ''

const generateSprite = (size: number, emoji: string) => {
  const sprite = new Sprite()
  sprite.width = size
  sprite.height = size
  sprite.image = emoji
  return sprite
}

const judge = (a: string, b: string) => {
  if (a === b) {
    return 0
  }
  if (wins.get(a)?.includes(b)) {
    return 1
  }
  return -1
}

function setup() {
  new Canvas(500, 500, 'webgl')
  displayMode('centered', 'smooth', 1)

  const playerHandType = ['rock', 'paper', 'scissor']
  playerHandType.forEach((hand) => {
    const sprite = generateSprite(100, handToEmoji.get(hand) || '')
    sprite.y = 300
    hands.set(hand, sprite)
  })

  const enemyHandNumber = Math.floor(random(0, 4))
  enemyHand = handType[enemyHandNumber]
  enemyHandSprite = generateSprite(150, handToEmoji.get(enemyHand) || '')
  enemyHandSprite.y = 100
  enemyHandSprite.velocity.x = 5
}

function draw() {
  background(220)

  textSize(32)

  text(`Level: ${level}`, 16, 40)

  if (enemyHandSprite.x > width + 100) {
    enemyHandSprite.x = -100
  }

  for (const [hand, sprite] of hands) {
    if (sprite.mouse.presses('left')) {
      enemyHandSprite.velocity.x = 0
      enemyHandSprite.x = width / 2
      const result = judge(hand, enemyHand)
      if (result === 1) {
      } else if (result === 0) {
      } else {
      }
    }

    sprite.scale = sprite.mouse.pressing('left') ? 2.0 : 1.0
  }
}
