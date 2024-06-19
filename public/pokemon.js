function battle(){
    fetch('http://localhost:4000/pokemon')
    .then(resp => {
        return resp.json();
    })
    .then(user => {
        //Random Pokemon Generator
        let pokemon1 = user[ Math.floor(Math.random() * user.length)];
        let pokemon2 = user[ Math.floor(Math.random() * user.length)];

    //Pokemon Image
    let playerOneImage = document.getElementById('playerOneImage');
    let playerTwoImage = document.getElementById('playerTwoImage');
    let imgOne = document.createElement('img')
    let imgTwo = document.createElement('img')
    imgOne.src = pokemon1.img
    imgTwo.src = pokemon2.img;
    imgOne.style.height = "200px";
    imgTwo.style.height = "200px";
    imgOne.style.border = "15px solid gold"
    playerOneImage.appendChild(imgOne);
    playerTwoImage.appendChild(imgTwo);

    //Pokemon name
    let playerOneName = document.getElementById('playerOneName')
    let playerTwoName = document.getElementById('playerTwoName')
    playerOneName.innerHTML = pokemon1.name 
    playerTwoName.innerHTML = pokemon2.name

    //Pokemon Type
    let playerOneType = document.getElementById('playerOneType')
    let playerTwoType = document.getElementById('playerTwoType')
    playerOneType.innerHTML = `Type: ${pokemon1.type}`
    playerTwoType.innerHTML = `Type: ${pokemon2.type}`

    //Pokemon Region
    let playerOneRegion = document.getElementById('playerOneRegion')
    let playerTwoRegion = document.getElementById('playerTwoRegion')
    playerOneRegion.innerHTML = `Region: ${pokemon1.region}`
    playerTwoRegion.innerHTML = `Region: ${pokemon2.region}`

    //Pokemon Hp
    let playerOneHP = document.getElementById('playerOneHp')
    let playerTwoHp = document.getElementById('playerTwoHp')
    playerOneHP.innerHTML = `HP: ${pokemon1.hp}`
    playerTwoHp.innerHTML = `HP: ${pokemon2.hp}`

    //Pokemon Defence
    let playerOneDefence = document.getElementById('playerOneDefence')
    let playerTwoDefence = document.getElementById('playerTwoDefence')
    playerOneDefence.innerHTML = `Defense: ${pokemon1.defense}`
    playerTwoDefence.innerHTML = `Defense: ${pokemon2.defense}`

    //Pokemon Attack
    let playerOneAttack = document.getElementById('playerOneAttack')
    let playerTwoAttack = document.getElementById('playerTwoAttack')
    playerOneAttack.innerHTML = `Attack: ${pokemon1.attack}`
    playerTwoAttack.innerHTML = `Attack: ${pokemon2.attack}`

    //Pokemon Weakness
    let playerOneWeakness = document.getElementById('playerOneWeakness')
    let playerTwoWeakness = document.getElementById('playerTwoWeakness')
    playerOneWeakness.innerHTML = `Weakness: ${pokemon1.weakness}`
    playerTwoWeakness.innerHTML = `Weakness: ${pokemon2.weakness}`

    //Pokemon move
    let playerOneMove = document.getElementById('playerOneMove')
    let playerTwoMove = document.getElementById('playerTwoMove')
    playerOneMove.innerHTML = `Strike: ${pokemon1.strike}`
    playerTwoMove.innerHTML = `Strike: ${pokemon2.strike}`

    //Pokemon Special attack
    let playerOneSpecial = document.getElementById('playerOneSpecial')
    let playerTwoSpecial = document.getElementById('playerTwoSpecial')
    playerOneSpecial.innerHTML = `Special: ${pokemon1.special_attack}`
    playerTwoSpecial.innerHTML = `Special: ${pokemon2.special_attack}`
    });
   
    let playerOnecontainer = document.getElementById("playerOne")
    playerOnecontainer.style.border = "15px solid gold"
    playerOnecontainer.style.borderRadius= "5%;"
    playerOnecontainer.style.marginLeft = "10%"
    playerOnecontainer.style.padding = "5%"
    playerOnecontainer.style.width = "100%"
    playerOnecontainer.style.fontFamily = "'Times New Roman', Times, serif"
    playerOnecontainer.style.backgroundImage = "firebackground.png"

    let playerTwocontainer = document.getElementById("playerTwo")
    playerTwocontainer.style.border = "15px solid gold"
    playerTwocontainer.style.borderRadius= "5%;"
    playerTwocontainer.style.marginRight = "10%"
    playerTwocontainer.style.padding = "5%"
    playerTwocontainer.style.width = "100%"
    playerTwocontainer.style.fontFamily = "'Times New Roman', Times, serif"
    playerTwocontainer.style.backgroundImage = "firebackground.png"


}


 

