/*Exemple DOC02_08 Mouse*/
window.onload = function() {
    
	/*configuirem el game Container*/
	var widthGame = 800;
	var heightGame = 600;
	
	var gameContainer = document.getElementById("myGame");
	gameContainer.style.width = widthGame+"px";
	gameContainer.style.height = heightGame+"px";
	gameContainer.style.margin = "0 auto";

	/*Inicialitzem la part amb Phaser*/
	var game = new Phaser.Game(widthGame, heightGame, Phaser.AUTO, 'myGame', { preload: preload, create: create, update: update, render: render });

    /*Declaració de variables globals*/
        var player;
        var platforms;
        var cursors;

        var stars;
        var score = 0;
        var scoreText;
    
        var mouse;
        var flag;
        var senseFlag; // true = right; false = left;

    function preload () {
         	
            game.load.image('sky', 'assets/images/sky.png');
            game.load.image('ground', 'assets/images/platform.png');
            game.load.image('star', 'assets/images/star.png');
            game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);

        }

    function create () {

                /*Incialització Físiques*/
        game.physics.startSystem(Phaser.Physics.ARCADE);
       
        /*Fondo*/
        /*Fondo No Interactiu:  Sky*/
        game.add.sprite(0, 0, 'sky');

        /*Fondo Interactiu: terra y plataformes*/
        /*
        -Fem un grup per posar el 'ground' i els 'ledges'
        -Diem que el grup tingui cos. per tant que tingui colisions físques 
        amb altres objectes amb cos.

        - Creem el 'ground'
        - Escalem el 'ground'
        - Li diem que no es mogui encara que interactui amb la física

        - Creem dues 'ledge' i diem que no es moguin
        */
        platforms = game.add.group();
        platforms.enableBody = true;

        
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        /*Player*/
        /*
        - Creem el player a partir de un spriteSheet horitzontal.
        - habilitem tota la Fisica pel player
        - Dondem les propietats de rebot(bounce), i gravetat verticals.
        - habilitem que el player choqui amb els bordes del món.
        
        - Animacions
        */
        player = game.add.sprite(32, game.world.height - 150, 'dude',4);
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        /*ELEMENTS COLECTABLES*/
        //  some stars to collect
        stars = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        
        /*Crear 12 estrelles i colocar-les dispersades per la pantalla i fer que
        tinguin un rebot de forma aletoria*/
        for (var i = 0; i < 12; i++)
            {
                //  Create a star inside of the 'stars' group
                var star = stars.create(i * 70, 0, 'star');

                //  Let gravity do its thing
                star.body.gravity.y = 300;

                //  This just gives each star a slightly random bounce value
                star.body.bounce.y = 0.7 + Math.random() * 0.2;
            }

        /* HUD: The score */
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        
        /* Habilitem controls de mouse i barra espai*/
        
        JumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        mouse = game.input.mousePointer;
        
        }

    function update () {

        /*
        colisions entre player y terra y plataformes (amb el grup)
        colisions entre lataforma y estrelles.
        */
        
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);
        
        /*
        Checks to see if the player overlaps with any of the stars, 
        if he does call the collectStar function
        */
        
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        
        /*Interacció teclat amb player*/
        /*
        - Reset the players velocity (movement)
        - Control per mouse
        */
            player.body.velocity.x = 0;
            //console.log(flag);
            //console.log(player.position.x, mouse.positionDown.x);
            if (JumpKey.isDown && player.body.touching.down)
            {
                player.body.velocity.y = -350;
            }
            if (mouse.isDown){
                flag = true;
               
            }
            if (flag){
                //game.physics.arcade.moveToPointer(player, 250);
              
                if (mouse.positionDown.x> player.position.x){
                    senseFlag = true;
                    player.animations.play('right');
                    player.body.velocity.x = 250;
                }
                if(mouse.positionDown.x < player.position.x){
                    //  Move to the left
                    senseFlag = false;
                    player.animations.play('left');
                    player.body.velocity.x = -250;
                }
                
                if (mouse.positionDown.x-10<player.position.x && senseFlag || mouse.positionDown.x+10>player.position.x && !senseFlag){
                    //  Stand still
                    player.animations.stop();
                    player.frame = 4;
                    flag = false;
                }
                 
            }
         

        }

    function render () {
        
        }
    
    function collectStar (player, star) {
    
        // Removes the star from the screen
        star.kill();

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;

        }
}


