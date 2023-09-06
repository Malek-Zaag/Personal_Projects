import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";



kaboom({
    background: [ 0, 0, 0, ],
});
//loading images
loadSprite("mario", "./assets/mario.png")
loadSprite("block", "./assets/block.png")
loadSprite("portal", "./assets/portal.png")
loadSprite("enemy", "./assets/enemy.png")
loadSprite("shroom", "./assets/shroom.png")
loadSprite("mysterious", "./assets/misterious.png")
loadSprite("coin", "./assets/coin.png")


//loading sounds
loadSound("score", "./assets/score.mp3")
loadSound("lose", "./assets/lose.mp3")
loadSound("shroom", "./assets/shroom.mp3")
loadSound("portal", "./assets/portal.mp3")
loadSound("eat", "./assets/eat.mp3")
loadSound("box", "./assets/box.mp3")
//patrol function
function patrol(speed = 60, dir = 1) {
    return {
        id: "patrol",
        require: ["pos", "area",],
        add() {
            this.on("collide", (obj, col) => {
                if (col.isLeft() || col.isRight()) {
                    dir = -dir
                }
            })
        },
        update() {
            this.move(speed * dir, 0)
        },
    }
}


//big function 
function big() {
    let timer = 0
    let isBig = false
    let destScale = 2
    return {
        // component id / name
        id: "big",
        // it requires the scale component
        require: ["scale"],
        // this runs every frame
        update() {
            if (isBig) {
                timer -= dt()
                if (timer <= 0) {
                    this.smallify()
                }
            }
            this.scale = this.scale.lerp(vec2(destScale), dt() * 6)
        },
        // custom methods
        isBig() {
            return isBig
        },
        smallify() {
            destScale = 2
            timer = 0
            isBig = false
        },
        biggify(time) {
            destScale = 3
            timer = time
            isBig = true
        },
    }
}


//scene game
scene("game", ({ id, score } = { id: 0, score: 0 }) => {
    //speed 
    const SPEED = 320
    //falling death 
    const FALL_DEATH = 1200
    //gravity
    gravity(2400);
    //levels
    const levels = [
        [
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '=                                                                                      =',
            '=          =?===?===               ==                                                  =',
            '=                                                                                      =',
            '=                                                                                      =',
            '=                                                                                      =',
            '=                                                          *                           =',
            '=                                                =    =                                =',
            '==================================================    ==================================',
        ],
        [
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                    ^                                                   ',
            '                                 =?==        0 0                                        ',
            '=                                            0 0                                       =',
            '=                                            0 0                                       =',
            '=        =?===?===     ====                  0 0                                       =',
            '=                                            0 0                                       =',
            '=                                  =                                                   =',
            '=                                  =                                                   =',
            '=                                 ==                          *                        =',
            '=               =       #        =====        #  =    =                                =',
            '==================================================    ==================================',
        ],
        [   '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '                                                                                        ',
            '             ^                                                                          ',
            '          =====                                                                         ',
            '                                    ^                                                   ',
            '                                 =?==        0 0                                        ',
            '=                                            0 0                                       =',
            '=                     =    # =               0 0                                       =',
            '=        =?===?===    ========               0 0                                       =',
            '=                                            0 0                                       =',
            '=                                  =                                                   =',
            '=                                  =                                                   =',
            '=                                 ==                           *                       =',
            '=              =       #        =====        #   =    =   #                            =',
            '==================================================    ==================================',
        ]
    ]

    //level config
    const level = addLevel(levels[id], {
        width: 20,
        height: 20,
        "=": () => [
            sprite("block"),
            area(),
            solid(),
            "block"
        ],
        "*": () => [
            sprite("portal"),
            area(),
            solid(),
            "portal"
        ],
        "?": () => [
            sprite("mysterious"),
            area(),
            solid(),
            "mysterious"
        ],
        "0": () => [
            sprite("coin"),
            area(),
            "coin"
        ],
        "^": () => [
            sprite("shroom"),
            area(),
            body(),
            "shroom",
        ],
        "#": () => [
            sprite("enemy"),
            pos(),
            area(),
            body(),
            patrol(),
            "enemy",
        ],
    }
    )
    //score
    const scoreLabel = add([
        text(score),
        pos(width() / 2, height() / 2 - 80),
        scale(1),
        origin("center"),
    ])
    //adding mario
    const mario = add([
        sprite('mario'),
        pos(20, 10),
        scale(2),
        area(),
        body(),
        big()
    ])
    //movement
    onKeyPress("space", () => {
        mario.jump()
    })
    onKeyDown('right', () => {
        mario.move(SPEED, 0)
    })
    onKeyDown('left', () => {
        mario.move(-SPEED, 0)
    })
    // eating coins
    mario.onCollide("coin", (coin) => {
        //destroy coin and update score
        score++;
        scoreLabel.text = score
        destroy(coin)
        play("score")
    })
    // dealing with enemies
    mario.onCollide("enemy", (e, col) => {
        //if mario collides with enemy he dies
        if (!col.isBottom()) {
            go("lose")
        }
        else {
            score = score + 2;
            scoreLabel.text = score
            destroy(e);
            play("eat")
        }
    })
    //eating shrooms
    mario.onCollide("shroom", (shroom) => {
        score += 2;
        scoreLabel.text = score
        destroy(shroom)
        play("shroom")
        mario.biggify(3)
    });
    //using portal
    mario.onCollide("portal", () => {
        play("portal")
        if (id < levels.length - 1) {
            id++
            go("game", {
                id: id,
                score: score,
            })
        }
        else {
            go("win")
        }
    })
    //unlocky boxes
    mario.onHeadbutt((obj) => {
        if (obj.is("mysterious")) {
            const coin = level.spawn("0", obj.gridPos.sub(0, 1))
            destroy(obj)
            play("box")
        }
    })
    onKeyPress("f", () => {
        fullscreen(!fullscreen())
    })
    //checking death , arriving at portal
    mario.onUpdate(() => {
        camPos(mario.pos)
        if (mario.pos.y >= FALL_DEATH) {
            go("lose")
        }
    })

})

//lose scene
scene("lose", () => {
    add([
        text("Game Over!!! Press Space"),
        pos(center()),
        origin("center"),
    ])
    play("lose")
    onKeyPress("space", () => go("game"));
})

//win scene
scene("win", () => {
    add([
        text("you won!!! Press Space"),
        pos(width() / 2, height() / 2 - 80),
        scale(1),
        origin("center"),
    ])
    onKeyPress("space", () => go("game"));
})
//starting game
go("game")