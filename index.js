const express = require("express");
const app = express();
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
const pg = require("pg-promise")();
const db = pg("postgres://postgres@localhost:5432/postgres");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json


const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

function clientError(req, message, errorCode) {
  logger.log({
    level: "info",
    endpoint: req.path,
    method: req.method,
    query_parameters: req.query,
    path_parameters: req.params,
    body: req.body,
    ip: req.ip,
    errorCode: errorCode,
    message: message,
    timestamp: new Date(),
  });
}

/*
Endpoint: 
    GET: Returns a list of all the pokemon
Query Parameters:
    name: Being able to select a specific pokemon based on name
    type: Being able to select specific pokemon based on type
    region: Being able to select specific pokemon based on region
*/
app.get("/pokemon", async function (req, res) {
  console.log(req.query);
  // Check for unexpected body
  if (Object.keys(req.body).length !== 0) {
    clientError(req, "Request body is not permitted", 400);
    return res.status(400).json({ error: "Request body is not permitted" });
  } else {
    if (
      req.query.name === undefined &&
      req.query.type === undefined &&
      req.query.region === undefined &&
      req.query.id === undefined
    ) {
      try {
        res.json(await db.any("select * from pokemon"));
      } catch (error) {
        clientError(req, "Internal server error", 500);
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
    if (typeof req.query.name === "string") {
      let pokename = req.query.name;
      res.json(
        await db.oneOrNone("select * from pokemon where name = $1", pokename)
      );
    }
    if (typeof req.query.type === "string") {
      let poketype = req.query.type;
      res.json(
        await db.manyOrNone("select * from pokemon where type = $1", poketype)
      );
    }
    if (typeof req.query.region === "string") {
      let pokeregion = req.query.region;
      res.json(
        await db.manyOrNone(
          "select * from pokemon where region = $1",
          pokeregion
        )
      );
    }
    if (typeof req.query.id === "string") {
      let pokeID = req.query.id;
      res.json(
        await db.oneOrNone("select * from pokemon where id = $1", pokeID)
      );
    }
  }
});

app.get('/backgroundAudio', async (req, res) => {
  try {
      const audioData = await db.many('SELECT name,image,music FROM stage');
          if (!audioData || audioData.length === 0) {
          return res.status(200).json({ error: 'No background audio data found' });
      }
       // Process each row with a for-loop
      for (let i = 0; i < audioData.length; i++) {

          console.log(audioData[i])
      }
      res.json(audioData);
  } catch (error) {
      console.error('Failed to get background audio data:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get("/pokemon/random", async function (req, res) {
  // Store list of 6 random pokemon in the trainer variable
   let trainer = await db.many('SELECT * from pokemon ORDER BY RANDOM() LIMIT 6');
   // Add those 6 pokemon to our current party
   for(let i = 0; i < trainer.length; i++){
    await db.none('INSERT INTO trainer(name, type, hp, attack, defense) VALUES($1, $2, $3, $4, $5)', [trainer[i].name, trainer[i].type, trainer[i].hp, trainer[i].attack, trainer[i].defense]);
   }

   // Get four random moves for the pokemon
   for(let i = 1; i <= trainer.length; i++){
    let move = await db.any('SELECT strike.name, strike.power from trainer INNER JOIN strike ON trainer.type = strike.type WHERE trainer.id = $1 ORDER BY RANDOM() LIMIT 4', [i])
    console.log
    for(let j = 0; j < move.length; j++) {
     move[j] = move[j].name
    }
    move = "{" + move.toString() + "}";
    await db.any('UPDATE trainer SET strike = $1 WHERE trainer.id = $2',[move, i]);
   }
  
   // Get four random moves for the pokemon
   for(let i = 1; i <= trainer.length; i++){
   let moves = await db.any('SELECT strike.name, strike.power from trainer INNER JOIN strike ON trainer.type = strike.type WHERE trainer.id = $1 ORDER BY RANDOM() LIMIT 4', [i])
   console.log
   for(let j = 0; j < moves.length; j++) {
    moves[j] = moves[j].name
   }
   moves = "{" + moves.toString() + "}";
   await db.any('SELECT * FROM opp');
  }
   // Store list of 6 random pokemon in the opp variable
   let opp = await db.many('SELECT * from pokemon ORDER BY RANDOM() LIMIT 6');
   // Add those 6 pokemon to our current party
   for(let i = 0; i < opp.length; i++){
    await db.none('INSERT INTO opp(name, type, hp, attack, defense) VALUES($1, $2, $3, $4, $5)', [opp[i].name, opp[i].type, opp[i].hp, opp[i].attack, opp[i].defense]);
   }
   // Get four random moves for the pokemon
   for(let i = 1; i <= opp.length; i++){
    let move = await db.any('SELECT strike.name, strike.power from opp INNER JOIN strike ON opp.type = strike.type WHERE opp.id = $1 ORDER BY RANDOM() LIMIT 4', [i])
    console.log
    for(let j = 0; j < move.length; j++) {
     move[j] = move[j].name
    }
    move = "{" + move.toString() + "}";
    await db.any('UPDATE opp SET strike = $1 WHERE opp.id = $2',[move, i]);
   }
  
   // Get four random moves for the pokemon
   for(let i = 1; i <= trainer.length; i++){
   let moves = await db.any('SELECT strike.name, strike.power from trainer INNER JOIN strike ON trainer.type = strike.type WHERE trainer.id = $1 ORDER BY RANDOM() LIMIT 4', [i])
   console.log
   for(let j = 0; j < moves.length; j++) {
    moves[j] = moves[j].name
   }
   moves = "{" + moves.toString() + "}";
   await db.any('SELECT * FROM opp');
  }
  
 });

 app.get("/pokemon/battle", async function (req,res){
 
 res.json(await db.any('SELECT * FROM opp;'));
})

function battleAtk(pokemonAttack,pokemonAttackpwr){
   a = pokemonAttack + pokemonAttackpwr;
   return  a/4
 }
 function battleDef(pokemonDefence,attackValue){
   d = Math.sqrt(pokemonDefence) * 1.25;
   return Math.floor(attackValue - d);
}


 app.get("/pokemon/attack", async function (req, res) {
  //selecting Attacker/Defender and move
    let attacker = await db.one('SELECT * FROM trainer ORDER by id limit 1')
    console.log(attacker)
    let defender = await db.one('SELECT * FROM opp where active = true ORDER BY id LIMIT 1');
    let move = await db.one('SELECT name, power FROM strike WHERE name = $1', [attacker.strike[1]]);
    // Calculate the attack and defense
    let attackValue = battleAtk(attacker.attack, move.power);
    let damage = battleDef(defender.defense, attackValue);

    // Apply damage to the defender's HP.
    defender.hp = Math.max(0, defender.hp - damage); // Ensure HP doesn't go below 0
    console.log(defender.hp)
    // Update the defender's HP 
    await db.none('UPDATE opp SET hp = $1 WHERE id = $2', [defender.hp, defender.id]);
    // Determine if the defender has fainted.
    let fainted = defender.hp <= 0;
    if (fainted){
      await db.none('UPDATE opp SET active = false WHERE id = $1', defender.id)
    }
    res.json({
      message: `${attacker.name} uses ${move.name} on ${defender.name}, dealing ${damage} damage.`,
      defenderHp: defender.hp,
      fainted
    });
  
});








/*
Endpoint: 
    DELETE: Deletes a pokemon
Path Parameters:
    Id[number](required): The id of the pokemon to be deleted.
*/
app.delete("/pokemon/:id", async function (req, res) {
  console.log(req.params.id);
  if (isNaN(req.params.id)) {
    // checks if the parameter entered is a number
    clientError(req, "Parameters do not meet requirements", 400);
    res.status(400).json({
      error: "Parameters do not meet requirements",
    });
  } else {
    let id = Number(req.params.id);
    let del = await db.result("DELETE FROM pokemon WHERE id = $1", id);
    console.log(del);
    if (del.rowCount > 0) {
      res.status(200).send(` Pokemon deleted with ID: ${id}`);
    } else {
      clientError(req, "Pokemon does not exist", 400);
      res.status(400).json({ msg: "Pokemon does not exist" });
    }
  }
});

/*
Endpoint: 
    PUT: updates an existing pokemon
Path Parameter:
    id[number](required): the id of the task to be updated to the todolist
Body:
Body:
        name:[string]
        type:[string]
        region:[string]
        hp:[number](required)
        attack:[number](required)
        defense:[number](required)
        weakness:[string]
        img:[string]
        attack_move:[string]
        special_attack:[string]
*/
app.put("/pokemon/:id", async function (req, res) {
  if (isNaN(req.params.id)) {
    clientError(req, "Parameters do not meet requirements", 400);
    // checks if the path parameter is not a number
    res.status(400).json({
      error: "Parameters do not meet requirements",
    });
    return;
  }
  const regex = /^[a-zA-Z0-9/,:. ]+$/;
  let obj = req.body;
  let arr = [...Object.values(obj)];
  console.log(arr);
  if (!arr.every((item) => regex.test(item))) {
    // checks if any special characters were used
    clientError(req, "Body does not meet requirements", 400);
    return res.status(400).json({ msg: "Body does not meet requirements" });
  }

  let { name, type, region, hp, attack, defense, weakness, img, attack_move, special_attack } = req.body;
  parseInt(hp);
  parseInt(attack);
  parseInt(defense);
  if (
    !name ||
    !type ||
    !region ||
    isNaN(hp) ||
    isNaN(attack) ||
    isNaN(defense) ||
    !weakness ||
    !img ||
    !attack_move ||
    !special_attack
  ) {
    res.status(400).json({ msg: "Missing required fields" });
  }
  let id = parseInt(req.params.id);
  await db.none(
    "UPDATE pokemon SET name=$1, type=$2, region=$3, hp=$4, attack=$5, defense=$6, weakness=$7, img=$8, attack_move=$9, special_attack=$10 WHERE id=$11",
    [
      name,
      type,
      region,
      parseInt(hp),
      parseInt(attack),
      parseInt(defense),
      weakness,
      img,
      attack_move,
      special_attack,
      id,
    ]
  );
  res.json("successful update");
});

/*
Endpoint: 
    POST: Adds Pokemon to the database
Body:
        name:[string]
        type:[string]
        region:[string]
        hp:[number](required
        attack:[number](required)
        defense:[number](required)
        weakness:[string]
        img:[string]
        attack_move:[string]
        special_attack:[string]
*/
app.post("/pokemon", async function (req, res) {
    const regex = /^[a-zA-Z0-9/,:. ]+$/;
  let obj = req.body;
  let arr = [...Object.values(obj)];
  if (!arr.every((item) => regex.test(item))) {
    // checks if any special characters were used
    clientError(req, "Body does not meet requirements", 400);
    return res.status(400).json({ msg: "Body Does not meet requirements" });
  }
  let { name, type, region, hp, attack, defense, weakness, img, attack_move, special_attack } = req.body;
  parseInt(hp);
  parseInt(attack);
  parseInt(defense);
  if (
    !name ||
    !type ||
    !region ||
    isNaN(hp) ||
    isNaN(attack) ||
    isNaN(defense) ||
    !weakness ||
    !img ||
    !attack_move ||
    !special_attack
  ) {
    res.status(400).json({ msg: "Missing required fields" });
  }
  try {
    await db.none(
      "INSERT INTO pokemon (name, type, region, hp, attack, defense, weakness, img, attack_move, special_move) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [name, type, region, hp, attack, defense, weakness, img, attack_move, special_attack]
    );
    if (Object.keys(req.body).length > 0) {
      res.status(200).json({ msg: "Pokemon added" });
    }
  } catch (error) {
    if (error.code === "23505") {
      clientError(req, "Pokemon already exists", 400);
      res.status(400).json({ msg: "Pokemon already exists" });
    }
  }
});
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

 









