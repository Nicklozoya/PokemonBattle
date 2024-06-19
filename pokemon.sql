CREATE TABLE pokemon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) UNIQUE NOT NULL,
    type VARCHAR(60) NOT NULL,
    region VARCHAR(60) NOT NULL,
    hp INTEGER NOT NULL CHECK (hp > 0),
    attack INTEGER NOT NULL CHECK (attack > 0),
    defense INTEGER NOT NULL CHECK (defense > 0),
    weakness VARCHAR(100) NOT NULL,
    img VARCHAR(255) NOT NULL,
    strike VARCHAR(100)
);

CREATE TABLE trainer(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    type VARCHAR(25),
    hp INTEGER,
    strike text [],
    attack INTEGER,
    defense INTEGER
);
CREATE TABLE opp(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    type VARCHAR(25),
    hp INTEGER,
    strike text [],
    attack INTEGER,
    defense INTEGER,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE strike(
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    power INTEGER,
    type VARCHAR(60)
);

CREATE TABLE battle(
    id SERIAL PRIMARY KEY, 
    type VARCHAR (60),
    strength VARCHAR(500),
    weakness VARCHAR(500)

);

CREATE TABLE stage (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    img VARCHAR(255),
    music varchar(500)
    );

INSERT INTO battle(type, strength, weakness)
VALUES
    ('Normal', 'None', 'Rock, Ghost,'),
    ('Bug', 'Grass, Psychic', 'Fire, Fighting, Flying, Poison, Ghost'),
    ('Electric', 'Flying, Water', 'Ground, Grass, Electric'),
    ('Fairy', 'Fighting', 'Poison'),
    ('Fighting','Normal, Rock, Ice, Dark', 'Flying, Poison, Psychic, Bug, Fairy, Ghost'),
    ('Flying', 'Fighting, Bug, Grass', 'Rock, Electric'),
    ('Poison', 'Grass, Fairy', 'Poison, Ground, Rock, Ghost, Steel'),
    ('Ground', 'Poison, Rock, Fire, Electric', 'Flying, Bug, Grass' ),
    ('Rock', 'Flying, Bug, Fire, Ice', 'Fighting, Ground,' ),
    ('Ghost', 'Ghost, Psychic', 'Normal'),
    ('Fire', 'Bug, Grass, Ice', 'Rock, Fire, Water'),
    ('Water', 'Ground, Rock, Fire', 'Water, Grass'),
    ('Grass', 'Ground, Rock, Water', 'Flying, Poison, Bug,Fire, Grass'),
    ('Psychic', 'Fighting, Poison', 'Psychic'),
    ('Ice', 'Flying, Ground, Grass', 'Fire, Water, Ice'),;
  

INSERT INTO strike(name, power, type)
VALUES
    ('Acid', 40, 'Poison'),
    ('Belch', 120, 'Poison'),
    ('Dire Claw', 80, 'Poison'),
    ('Gunk Shot', 120, 'Poison'),
    ('Venoshock', 65, 'Poison'),
    ('Smog', 30, 'Poison'),
    ('Sludge', 90, 'Poison'),
    ('Poison Tail', 50, 'Poison'),
    ('Pounce', 50, 'Bug'),
    ('Infestation', 20, 'Bug'),
    ('Life Leech', 80, 'Bug'),
    ('Lunge', 80, 'Bug'),
    ('Megahorn', 120, 'Bug'),
    ('Bug Bite', 60, 'Bug'),
    ('Silver wind', 70, 'Bug'),
    ('Bone Club', 65, 'Ground'),
    ('Bone Rush', 25, 'Ground'),
    ('Bulldoze', 60, 'Ground'),
    ('Drill Run', 80, 'Ground'),
    ('Dig', 80, 'Ground'),
    ('Earth Power', 80, 'Ground'),
    ('Sand Tomb', 35, 'Ground'),
    ('Earthquake', 100, 'Ground'),
    ('Snipe Shot', 80, 'Water'),
    ('Surf', 90, 'Water'),
    ('Scald', 80, 'Water'),
    ('Water Gun', 40, 'Water'), 
    ('Water spout', 150, 'Water'),
    ('Wave Crash', 120, 'Water'),
    ('Brine', 80, 'Water'),
    ('Absorb', 20, 'Grass'),
    ('Apple Acid', 80, 'Grass'),
    ('Chloroblast', 150, 'Grass'),
    ('Frenzy Blast', 150, 'Grass'),
    ('Grassy Glide', 150, 'Grass'),
    ('Giga Drain', 75, 'Grass'),
    ('Leafage', 40, 'Grass'),
    ('Razor Leaf', 55, 'Grass'),
    ('Armor Canon', 120, 'Fire'),
    ('Bitter Blade', 90, 'Fire'),
    ('Blast Burn', 150, 'Fire'),
    ('Blaze Kick', 85, 'Fire'),
    ('Blazing Torque', 80, 'Fire'),
    ('Blue Flare', 130, 'Fire'),
    ('Burn Up',130, 'Fire' ),
    ('Burning Jealousy', 70, 'Fire'),
    ('Ember', 40, 'Fire'),
    ('Vcreate', 180, 'Fire'),
    ('Confusion', 50, 'Psychic'),
    ('Dream Eater', 100, 'Psychic'),
    ('Eerie Spell', 80, 'Psychic'),
    ('Esper Wing', 80, 'Psychic'),
    ('Light That Burns the Sky', 200, 'Psychic'),
    ('Accelerock', 40, 'Rock'),
    ('Diamond Storm', 100, 'Rock'),
    ('Head Smash', 150, 'Rock'),
    ('Meteor Beam', 120, 'Rock'),
    ('Splintered Stormshards', 120, 'Rock'),
    ('Tar Shot', 100, 'Rock'),
    ('Smack Down', 100, 'Rock'),
    ('Astonish', 30, 'Ghost'),
    ('Menacing Moonraze Maelstrom', 200, 'Ghost'),
    ('Bitter Malice', 75, 'Ghost'),
    ('Lick', 30, 'Ghost'),
    ('Moongeist Beam', 100, 'Ghost'),
    ('Ominous Wind', 60, 'Ghost'),
    ('Poltergeist', 110, 'Ghost'),
    ('Aurora Beam', 100, 'Ice'),
    ('Blizzard', 110, 'Ice'),
    ('Avalanche', 60, 'Ice'),
    ('Glaciate', 65, 'Ice'),
    ('Ice Ball', 30, 'Ice'),
    ('Mountain Gale', 100, 'Ice'),
    ('Icicle Crash', 85, 'Ice'),
    ('Powder Snow', 100, 'Ice'),
    ('Acrobatics', 55, 'Flying'),
    ('Hurricane', 110, 'Flying'),
    ('Wing Attack', 60, 'Flying' ),
    ('Sky Attack', 149, 'Flying'),
    ('Peck', 35, 'Flying' ),
    ('Gust', 40, 'Flying' ),
    ('Fly', 90, 'Flying'),
    ('Drill Peck', 80, 'Flying'),
    ('Seismic Toss', 100, 'Fighting'),
    ('Focus Punch', 150 , 'Fighting'),
    ('Submission', 80, 'Fighting' ),
    ('Double Kick', 30, 'Fighting' ),
    ('High Jump Kick',130, 'Fighting' ),
    ('Karate Chop', 50,'Fighting' ),
    ('Rolling Kick', 60, 'Fighting'),
    ('Jump Kick', 100, 'Fighting'),
    ('Weather Ball',50, 'Normal' ),
    ('Tera Blast', 80, 'Normal' ),
    ('Dizzy Punch',70, 'Normal' ),
    ('Mega Kick',120, 'Normal' ),
    ('Self Destruct',200, 'Normal'),
    ('Spike Cannon',20, 'Normal' ),
    ('Strength', 80, 'Normal'),
    ('Slash', 70, 'Normal'),
    ('Thunder Shock',40, 'Electric' ),
    ('Charge Beam', 50, 'Electric'),
    ('Thunderbolt', 90, 'Electric'),
    ('Thunder Punch', 75, 'Electric'),
    ('Thunder',110, 'Electric' );

    INSERT INTO stage (name, img, music)
VALUES
   ('Canyon','/Users/corcoding/backend/npm_pokemon/public/image/canyon.jpg','../public/audio/1-08 Victory (Vs. Wild Pokémon).mp3'),
   ('Water','/Users/corcoding/backend/npm_pokemon/public/image/water.png','../public/audio/Sea.mp3'),
   ('Grass','/Users/corcoding/backend/npm_pokemon/public/image/Grass.png','../public/audio/1-43 The Last Battle (Vs. Rival).mp3');


INSERT INTO pokemon(name, type, region, hp, attack, defense, weakness, img)
VALUES
    ('Mewtwo','Psychic', 'Kanto', 106, 110, 90, 'Bug, Ghost', 'https://img.pokemondb.net/artwork/avif/mewtwo.avif'),
    ('Charizard', 'Fire ','Kanto', 78, 84, 78, 'Water, Electric','https://img.pokemondb.net/artwork/avif/charizard.avif'),
    ('Machamp', 'Fighting','Kanto', 90, 130, 80, 'Flying, Psychic', 'https://img.pokemondb.net/artwork/avif/machamp.avif'),
    ('Blastoise','Water', 'Kanto', 79, 83, 100, 'Electric, Grass','https://img.pokemondb.net/artwork/avif/blastoise.avif'),
    ('Gloom', 'Grass', 'Kanto', 60,65,70, 'Flying, Fire','https://img.pokemondb.net/artwork/avif/gloom.avif'),
    ('Articuno','Ice', 'Kanto', 90, 85, 100, 'Fire, Electric','https://img.pokemondb.net/artwork/avif/articuno.avif'),
    ('Venonat', 'Bug', 'Kanto', 60, 55, 50, 'Fire, Flying','https://img.pokemondb.net/artwork/avif/venonat.avif'),
    ('Golem', 'Rock','Kanto', 80,120,130, 'Water, Grass','https://img.pokemondb.net/artwork/avif/golem.avif'),
    ('Gengar', 'Ghost', 'Kanto',60, 65, 60, 'Ground, Pyschic','https://img.pokemondb.net/artwork/avif/gengar.avif'),
    ('Poliwag','Water', 'Kanto', 40, 50, 25, 'Grass, Electric','https://img.pokemondb.net/artwork/avif/poliwag.avif'),
    ('Growlithe','Fire','Kanto',55,70,45,'Water, Ground','https://img.pokemondb.net/artwork/avif/growlithe.avif'),
    ('Ponyta','Fire','Galar',50,85,55,'Water, Ground','https://img.pokemondb.net/artwork/avif/ponyta.avif'),
    ('Slowpoke','Water','Galar',90,65,65,'Grass, Electric','https://img.pokemondb.net/artwork/avif/slowpoke.avif'),
    ('Seel','Water','Kanto',65,45,55,'Grass, Electric','https://img.pokemondb.net/artwork/avif/seel.avif'),
    ('Grimer','Poison','Alola',80,80,50,'Ground, Psychic','https://img.pokemondb.net/artwork/avif/grimer.avif'),
    ('Onix','Rock','Kanto',35,45,160,'Water, Grass','https://img.pokemondb.net/artwork/avif/onix.avif'),
    ('Weedle','Bug','Kanto',40,35,30,'Fire, Flying','https://img.pokemondb.net/artwork/avif/weedle.avif'),
    ('Pikachu','Electric','Kanto',35,55,40,'Ground','https://img.pokemondb.net/artwork/avif/pikachu.avif'),
    ('JigglyPuff','Normal','Kanto',  115, 45, 20, 'Poison, Steel','https://img.pokemondb.net/artwork/avif/jigglypuff.avif'),
    ('Squirtle','Water', 'Kanto',44, 48, 65,'Grass, Electric','https://img.pokemondb.net/artwork/avif/squirtle.avif');




