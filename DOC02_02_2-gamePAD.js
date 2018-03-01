/*Exemple DOC02_02-gamePAD*/
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
        var pad1;

        /*
        Cal mapejar el mando:
        -----------------------
        mappeig mando INNEXT amb CHROME i windows10.

        Butó B (groc) = 0
        Butó A (vermell) = 1
        Butó Y (verd) = 2
        Butó X (blau) = 3

        Butó posterior L = 4
        Butó posterior R = 5

        butó SELECT = 8
        butó START = 9
        
        
        Axis vertical = 5. Up = -1; Down = +1 // per firefox
        Butó (up) = 12 
        Butó (down) = 13

        Axis horitzontal = 4. Right = 1; Left = -1 // per firefox
        Butó (left) = 14
        Butó (right) = 15
       
        en el cas del INNEX es poden testejar els butons fent 
        
        if(pad1.isDown(CODE_button)){
            code...
        }

        on CODE_button es el numero que hem posat previament o les constants que hem declarat a continuació
        code... és el codi de l'acció que volem fer quan s'apreti els diferents butons.

        També podeu testejar els butons a través del exemple:
        https://phaser.io/examples/v2/input/gamepad-debug


        Per tal de facilitar la programació podem crear constants mes aclaridores:
        */

        const B_button = 0;
        const A_button = 1;
        const Y_button = 2;
        const X_button = 3;
        const L_button = 4;
        const R_button = 5;

        const SELECT_button = 8;
        const START_button = 9;
        
        const UP_button = 12;
        const DOWN_button = 13;
        const LEFT_button = 14;
        const RIGHT_button = 15;

        const V_axis = 5;
        const H_axis = 4;
       
    function preload () {
         	
            game.load.image('sky', 'assets/images/sky.png');
            game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
        }

    function create () {

        /*Incialització Físiques*/
        game.physics.startSystem(Phaser.Physics.ARCADE);
       
        /*Fondo*/
        /*Fondo No Interactiu:  Sky*/
        game.add.sprite(0, 0, 'sky');



        /*Player*/
        /*
        - Creem el player a partir de un spriteSheet horitzontal.
        - habilitem tota la Fisica pel player
        - Dondem les propietats de rebot(bounce), i gravetat verticals.
        - habilitem que el player choqui amb els bordes del món.
        
        - Animacions
        */
        player = game.add.sprite(game.world.width/2, game.world.height/2, 'dude',4);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;


        
        /*-------------------------------------
        -------GAMEPAD--------------------------
        --------------------------------------*/

        /* Habilitem controls del gamepad*/
        //https://github.com/photonstorm/phaser-examples/blob/master/examples/input/gamepad.js
        game.input.gamepad.start();
       
        /**/
       // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
        pad1 = game.input.gamepad.pad1;
        }



    function update () {

        
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        console.log(pad1.axis(V_axis));
        console.log(pad1.axis(H_axis));

        /*
        Per fer els controls
        */

        if(pad1.isDown(UP_button) || (pad1.axis(V_axis) < 0)){
            player.body.velocity.y = -100; 
            console.log("up");
        }
        if(pad1.isDown(DOWN_button) || (pad1.axis(V_axis) > 0)){
            player.body.velocity.y = 100;
            console.log("down");
        }
        if(pad1.isDown(LEFT_button) || (pad1.axis(H_axis) < 0)){
            player.body.velocity.x = -100;
            console.log("left");
        }
        if(pad1.isDown(RIGHT_button)|| (pad1.axis(H_axis) > 0)){
            player.body.velocity.x = 100;
            console.log("right");
        }
        if(pad1.isDown(A_button)){
            game.debug.text('A',player.x, player.y-10); //treure despres de debugar
            console.log("A");
        }else{
            game.debug.text('',player.x, player.y-10); //treure despres de debugar
        }
        if(pad1.isDown(B_button)){
            game.debug.text('B',player.x+5, player.y-10); //treure despres de debugar
            console.log("B");
        }else{
            game.debug.text('',player.x+5, player.y-10); //treure despres de debugar
        }
        if(pad1.isDown(X_button)){
            game.debug.text('X',player.x+10, player.y-10); //treure despres de debugar
            console.log("X");
        }else{
            game.debug.text('',player.x+10, player.y-10); //treure despres de debugar
        }
        if(pad1.isDown(Y_button)){
            game.debug.text('Y',player.x+15, player.y-10); //treure despres de debugar
            console.log("Y");
        }else{
            game.debug.text('',player.x+15, player.y-10); //treure despres de debugar
        }
        if(pad1.isDown(L_button)){
            game.debug.text('L',player.x+5, player.y-15); //treure despres de debugar
            console.log("L");
        }else{
            game.debug.text('',player.x+5, player.y-15); //treure despres de debugar
        }
        if(pad1.isDown(R_button)){
            game.debug.text('R',player.x+15, player.y-15); //treure despres de debugar
            console.log("R");
        }else{
            game.debug.text('',player.x+15, player.y-15); //treure despres de debugar
        }
        if(pad1.isDown(START_button)){
            game.debug.text('START',player.x+5, player.y-20); //treure despres de debugar
            console.log("START");
        }else{
            game.debug.text('',player.x+5, player.y-20); //treure despres de debugar
        }
        if(pad1.isDown(SELECT_button)){
            game.debug.text('SELECT',player.x+15, player.y-20); //treure despres de debugar
            console.log("SELECT");
        }else{
            game.debug.text('',player.x+15, player.y-20); //treure despres de debugar
        }


        }

    function render () {
        
        }
}
