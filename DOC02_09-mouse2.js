/*Exemple DOC02_09 Mouse2. Punt de mira*/
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
        var sky;
        var platforms;

        var stars;
        var score = 0;
        var scoreText;
    
        var mouse;
        var puntoMira;

    function preload () {
         	
            game.load.image('sky', 'assets/images/sky.png');
            game.load.image('ground', 'assets/images/platform.png');
            game.load.image('star', 'assets/images/star.png');
            game.load.image('cursor','assets/images/puntMira.png');

        }

    function create () {

                /*Incialització Físiques*/
        game.physics.startSystem(Phaser.Physics.ARCADE);
       
        /*Fondo*/
        /*Fondo No Interactiu:  Sky*/
        sky = game.add.sprite(0, 0, 'sky');

        /*Fondo Interactiu: terra y plataformes*/
        platforms = game.add.group();
        platforms.enableBody = true;

        
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;
      

        /*ELEMENTS COLECTABLES*/
        //  some stars to collect
        stars = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;
        
        //  Listen for input events on this sprite
       // stars.inputEnabled = true;
        //  This will check the pixel every time the mouse moves, which is really expensive!
        //  You can also only do a pixel perfect check on click, which is much cheaper - so
        //  pick the right one accordingly.
       // stars.input.pixelPerfectOver = true;

        
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
                
                /*habiliem que poguem clicar sobre les estrelles i que al clicar cridem una funcio*/
                star.anchor.x = 0.5;
                star.anchor.y = 0.5;
                star.inputEnabled = true;
                star.input.pixelPerfectClick = true;
                star.events.onInputDown.add(check,this);

            }

        /* HUD: The score */
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
       
        /*Control de MOUSE*/
        //http://phaser.io/docs/2.4.8/Phaser.Input.html#mousePointer
        //http://www.html5gamedevs.com/topic/3634-changing-the-pointer-sprite/
        mouse = game.input.mousePointer;
        //El meu joc estar en un id='myGame'
        document.querySelector('#myGame').style.cursor = "none"; // treu el cursor dins del joc.
        puntoMira = game.add.sprite(mouse.x, mouse.y, 'cursor');
        puntoMira.anchor.x = 0.5;
        puntoMira.anchor.y = 0.5;
        }

    function update () {

        /*
        colisions entre player y terra y plataformes (amb el grup)
        colisions entre lataforma y estrelles.
        */
        game.physics.arcade.collide(stars, platforms);
        
        /*
        - punt de mira segueix la posicio del mouse
        - Controls per mouse
        */
            puntoMira.x = mouse.x;
            puntoMira.y = mouse.y;
            
            if (mouse.isDown){
                puntoMira.scale.setTo(0.5,0.5);   
            }
            if (mouse.isUp){
                puntoMira.scale.setTo(1,1);
            }
               
        }

    function render () {
        
        }

     function check (sprite) {
    
        // Removes the star from the screen
        sprite.kill();

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;

    }
}


