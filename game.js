var	game	= new Phaser.Game(800, 600, Phaser.AUTO,'', {	preload:
preload,	create:	create,	update:	update	});
function	preload() {
//ładowanie	zasobów
	game.load.image('sky', 'assets/sky.png');
				game.load.image('ground', 'assets/platform.png');
				game.load.image('star', 'assets/star.png');
				game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
				game.load.image('siatka', 'assets/platform2.png');
				game.load.image('bramka1', 'assets/bramka1.png');
				game.load.image('bramka2', 'assets/bramka2.png');
}

var	platforms;
var	score	= 0;
var	scoreText;

function	create() {
//Sterowanie 2 Player
this.w= game.input.keyboard.addKey(Phaser.Keyboard.W);
this.s= game.input.keyboard.addKey(Phaser.Keyboard.S);
this.a= game.input.keyboard.addKey(Phaser.Keyboard.A);
this.d= game.input.keyboard.addKey(Phaser.Keyboard.D);


				star=game.add.sprite(0,	0,	'star');
				//	"Włączamy"	prawa	fizyki XD
				game.physics.startSystem(Phaser.Physics.ARCADE);	
				//	Dodajemy	tło
				game.add.sprite(0,	0,	'sky');	
				//	Dodajemy	grupę,	do	której	będą	należeć:	gleba	i	półki
				platforms	=	game.add.group();	
				//	Obiekty	wchodzące	w	skład	grupy	uczynimy	ciałem	stałym
				platforms.enableBody	= true;	
				//	Tworzymy	glebę
				var	ground	=	platforms.create(0,	game.world.height - 64,	'ground');	
				//		Skalujemy	glebę	(powiększamy	2x)
				ground.scale.setTo(2,	2);	
				//		Unieruchomiamy	glebę
				ground.body.immovable	= true;	
				// //		robimy	dwie	półki	i	unieruchomiamy	je
				// var	siatka	=	platforms.create(400,	300,	'siatka');	
				// siatka.body.immovable	= true;	

				//BRAMKI
				bramki= game.add.group();
				bramki.enableBody	= true;

				var bramka1 =  bramki.create(0,game.world.height - 120,'bramka1');

				
				bramka1.body.immovable = true;


				var bramka2 =  bramki.create(736,game.world.height - 120,'bramka2');

				
				bramka2.body.immovable = true;

				

				//	Tworzę	gracza	('dude')	i	ustawiam	go	na	odpowiedniej	pozycji
				player	=	game.add.sprite(32,	game.world.height	- 150, 'dude');
				player2	=	game.add.sprite(500,	game.world.height	- 150, 'dude');
				//	Włączam	graczowi	fizykę
				game.physics.arcade.enable(player);
				game.physics.arcade.enable(player2);
				//	Nadaję	mu	grawitację	i	współczynnik	sprężystości	(!)
				player.body.bounce.y	= 0.2;
				player.body.gravity.y	= 300;
				player.body.collideWorldBounds	= true;

				player2.body.bounce.y	= 0.2;
				player2.body.gravity.y	= 300;
				player2.body.collideWorldBounds	= true;
				//	Tworzę	dwie	animacje	(!!!)
				player.animations.add('left', [0, 1, 2, 3], 10, true);
				player.animations.add('right', [5, 6, 7, 8], 10, true);

				player2.animations.add('left', [0, 1, 2, 3], 10, true);
				player2.animations.add('right', [5, 6, 7, 8], 10, true);

				//	Tworzymy	nową	grupę	i	nadajemy	jej	ciało	
				stars	=	game.add.group();
				stars.enableBody	= true;
				//	12	gwiazdek	starczy?
				for (var	i	= 0;	i	< 1;	i++)
				{
								//	create	-	coś	jakby	"push"	do	tablicy	stars[]
								var	star	=	stars.create(400, 400, 'star');
								//	Niech	gwiazdki	też	mają	grawitację,	a	co
								star.body.gravity.y	= 300;
								//	...i	randomowy	współczynnik	sprężystości
								star.body.bounce.y	= 0.5 + Math.random() * 0.3;
				}

				scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

}
function	update() {
//pętla	główna	gry
		//	Dodajemy	kolizje	gracza	z	grupą	obiektów	platforms
				game.physics.arcade.collide(player,	platforms);
				game.physics.arcade.collide(player2,	platforms);
				game.physics.arcade.collide(player,stars)
				game.physics.arcade.collide(player2,stars)
				game.physics.arcade.collide(stars, platforms);
				game.physics.arcade.collide(stars, bramki);
				// game.physics.arcade.collide(player,	stars);
				//	Włączmy	sterowanie	strzałkami
				


cursors	=	game.input.keyboard.createCursorKeys();

	//	Na	początek	postaw	go	nie	ruszaj
				player.body.velocity.x	= 0;
				if (cursors.left.isDown)
				{
								//	Prędkość:	150	pikseli/sekundę	w	lewo	(x	-=	150)
								player.body.velocity.x	= -150;
								//	Animuj
								player.animations.play('left');
				}
				else if (cursors.right.isDown)
				{
								//	Prędkość:	150	pikseli/sekundę	w	prawo	(x	+=	150)
								player.body.velocity.x	= 150;
								//	Animuj
								player.animations.play('right');
				}
				else
				{
								//	Jak	nic	nie	naciskam	to	nie	ruszaj	go	i...	wyświetlaj	4	klatkę	sprita
								player.animations.stop();
								player.frame	= 4;
				}
				//		Dodaj	skoki	(!!!)
				if (cursors.up.isDown	&&	player.body.touching.down)
				{
								player.body.velocity.y	= -350;
				}



//	Na	początek	postaw	go	nie	ruszaj
				player2.body.velocity.x	= 0;
				if (this.a.isDown)
				{
								//	Prędkość:	150	pikseli/sekundę	w	lewo	(x	-=	150)
								player2.body.velocity.x	= -150;
								//	Animuj
								player2.animations.play('left');
				}
				else if (this.d.isDown)
				{
								//	Prędkość:	150	pikseli/sekundę	w	prawo	(x	+=	150)
								player2.body.velocity.x	= 150;
								//	Animuj
								player2.animations.play('right');
				}
				else
				{
								//	Jak	nic	nie	naciskam	to	nie	ruszaj	go	i...	wyświetlaj	4	klatkę	sprita
								player2.animations.stop();
								player2.frame	= 4;
				}
				//		Dodaj	skoki	(!!!)
				if (this.w.isDown	&&	player2.body.touching.down)
				{
								player2.body.velocity.y	= -350;
				}

				

				// +
}



// function	collectStar1	(player,	star) {
// 				//	Removes	the	star	from	the	screen
// 				star.kill();
// 					score	+= 10;
// 				scoreText.text	= 'Score:	' +	score;
// }