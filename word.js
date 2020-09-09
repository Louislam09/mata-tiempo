let lettersGrid = document.querySelector('.letters__grid');
let wordsGrid = document.querySelector('.word__grid');
let typeGrid = document.querySelector('.kind__grid');
let gameScreen = document.querySelector('.container');
let homeScreen = document.querySelector('.home-screen');
let winScreen = document.querySelector('.win-screen');
let levelScreen = document.querySelector('.level-screen');
// let LevelsDiv = document.querySelectorAll('.level');

let playButton = document.querySelector('.play-button');
let nextButton = document.querySelector('.next-button');
let homeButton = document.querySelector('.home-button');
let root = document.documentElement;

let width = 14;
let number = 0;
let level = 1;
let currectWords = [];
let levels= [];
let levelAmount = 19;

let alphabet = randomArrayOfLetter();
let letterToCheck = [];
let letters = [];
let wordToFind = [];
let foundWordBackground = '';
// root.style.setProperty("--word-background", foundWordBackground)

window.addEventListener('load',()=>{
    showHomeScreen();
    level = getLevel();
    console.log(level)
})


const saveLevel = (lvl) => {
    if(localStorage){
        let levelStorage = getLevel();
        if(lvl > parseInt(levelStorage) ){
            localStorage.setItem('mataTimeScore',lvl);
            level = lvl;
        }
    }

}

const getLevel = () => {
    let levelStorage = localStorage.getItem('mataTimeScore');
    if(localStorage){
        if(levelStorage === null || levelStorage === undefined){
            levelStorage = 1;
        }else{
            levelStorage = parseInt(levelStorage);
        }
    }
    return levelStorage
}

function createChooseLevelMenu(){
    for (let i = 1; i < levelAmount+1; i++) {
        let lock = i <= level ? false : true;
        let levelDiv = document.createElement('div');
        levelDiv.classList.add('level');
        levelDiv.setAttribute( 'data-level', i);
        levelDiv.setAttribute( 'data-lock', lock);
        
        let tip = document.createElement('span');
        tip.classList.add('tip');
        tip.innerText = lock ? "🔒" : '🔑';
        
        levelDiv.appendChild(tip);
        levelScreen.appendChild(levelDiv);
        levels.push(levelDiv);        
    }

    levels.forEach(levelDiv=>levelDiv.addEventListener('click',levelClicked));
}

function levelClicked(e){
    let target = e.target;
    let lock = target.getAttribute('data-lock') === "false";
    let levelTarget = parseInt(target.getAttribute('data-level'));
    
    if(lock){
        nextLevel(levelTarget);
        showGameScreen();
    }else{
        // alert('Nivel bloqueado!')
        null
    }
}

function createBoard(arr,level) {
    resetGame(level)
    arr = sortByWordLength(arr);
    for (let i = 0; i < width * width; i++) {
        let letter = document.createElement('div');
        letter.classList.add("letter");
        letter.id = i;
        letters.push(letter);
        lettersGrid.appendChild(letter);
    }

    for (let i = 0; i < arr.length; i++) {
        let word = document.createElement('div');
        word.classList.add("word");
        wordToFind.push(word);
        wordsGrid.appendChild(word);
    }

    fillBoard(arr);
    lettersEvent();
}
function fillBoard(arr) {
    wordToFind.forEach((wordDiv, index) => {
        wordDiv.innerText = arr[index];
        currectWords.push(wordDiv.innerText);
    });

    while (arr.length) {
        arr.forEach((word, index) => {
            columnPosition(arr, word, index);

        })
        arr.forEach((word, index) => {
            diagonalPosition(arr, word, index)
        })

        arr.forEach((word, index) => {
            rowPosition(arr, word, index)
        })

    }


    let blankLetter = letters.filter(letter => letter.innerText === "");
    alphabet.sort(()=> 0.5 - Math.random())
    blankLetter.forEach((letter, index) => {
        if (index >= alphabet.length) index = index - alphabet.length;
        if (index >= 26 && index < 51) index = index - 25;
        if (index >= 51 && index < 76) index = index - 50;
        if (index >= 76 && index < 101) index = index - 75;
        if (index >= 101 && index < 127) index = index - 101;

        if (alphabet[index]) letter.innerText = alphabet[index];
    })

}

function resetGame(level) {
    letters = [];
    wordToFind = [];
    currectWords = [];
    lettersGrid.innerText = '';
    wordsGrid.innerText = "";
    document.documentElement.style.setProperty("--word-background", getRandomColor());
    typeGrid.innerText  = levelName[level-1];
}

function randomArrayOfLetter() {
    let letterFrom = 65;
    let letterTo = 65 + 26;
    let arr = [];
    for (let i = letterFrom; i < letterTo; i++) {
        arr.push(String.fromCharCode(i));

    }
    return arr;
}
function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function sortByWordLength(arr) {
    return (
        arr.sort((a, b) => {
            return (
                b.split("").length - a.split("").length
            )
        })
    )
}
function getAllowLengthForDiagonal(id) {
    let rowNumber = 14;
    if (id < rowNumber) {
        let maxLength = rowNumber;
        return (maxLength - id);

    } else if (id >= rowNumber && id < rowNumber * 2) {
        let maxLength = rowNumber - 1;
        let secondDigit = parseInt(id) % 14;
        let sameLengthIndex = [0, 1];

        if (sameLengthIndex.includes(secondDigit)) {
            return maxLength;
        } else {
            return (maxLength - secondDigit + 1);
        }

    } else if (id >= rowNumber * 2 && id < rowNumber * 3) {
        let maxLength = rowNumber - 2;
        let secondDigit = parseInt(id) % 14;
        let sameLengthIndex = [0, 1, 2];
        if (sameLengthIndex.includes(secondDigit)) {
            return maxLength;
        } else {
            return (maxLength - secondDigit + 2);
        }

    } else if (id >= rowNumber * 3 && id < rowNumber * 4) {
        let maxLength = rowNumber - 3;
        let secondDigit = parseInt(id) % 14;
        let sameLengthIndex = [0, 1, 2, 3];
        if (sameLengthIndex.includes(secondDigit)) {
            return maxLength;
        } else {
            return (maxLength - secondDigit + 3);
        }

    } else if (id >= rowNumber * 4 && id < rowNumber * 5) {
        let maxLength = rowNumber - 4;
        let secondDigit = parseInt(id) % 14;
        let sameLengthIndex = [0, 1, 2, 3, 4];
        if (sameLengthIndex.includes(secondDigit)) {
            return maxLength;
        } else {
            return (maxLength - secondDigit + 4);
        }

    } else if (id >= rowNumber * 5 && id < rowNumber * 6) {
        let maxLength = rowNumber - 5;
        let secondDigit = parseInt(id) % 14;
        let sameLengthIndex = [0, 1, 2, 3, 4, 5];
        if (sameLengthIndex.includes(secondDigit)) {
            return maxLength;
        } else {
            return (maxLength - secondDigit + 5);
        }

    } else if (id >= rowNumber * 6 && id < rowNumber * 7) {
        let maxLength = rowNumber - 6;
        let secondDigit = parseInt(id) % 14;
        let sameLengthIndex = [0, 1, 2, 3, 4, 5, 6];
        if (sameLengthIndex.includes(secondDigit)) {
            return maxLength;
        } else {
            return (maxLength - secondDigit + 6);
        }

    } else if (id >= rowNumber * 7 && id < rowNumber * 8) {
        let maxLength = rowNumber - 7;
        let secondDigit = parseInt(id) % 14;
        let sameLengthIndex = [0, 1, 2, 3, 4, 5, 6, 7];
        if (sameLengthIndex.includes(secondDigit)) {
            return maxLength;
        } else {
            return (maxLength - secondDigit + 7);
        }

    } else if (id >= rowNumber * 8 && id < rowNumber * 9) {
        let maxLength = rowNumber - 7;
        let secondDigit = parseInt(id) % 14;
        let sameLengthIndex = [0, 1, 2, 3, 4, 5, 6, 7];
        if (sameLengthIndex.includes(secondDigit)) {
            return maxLength;
        } else {
            return (maxLength - secondDigit + 7);
        }

    } else if (id >= rowNumber * 8 && id < rowNumber * 9) {
        let maxLength = rowNumber - 7;
        let secondDigit = parseInt(id) % 14;
        let sameLengthIndex = [0, 1, 2, 3, 4, 5, 6, 7];
        if (sameLengthIndex.includes(secondDigit)) {
            return maxLength;
        } else {
            return (maxLength - secondDigit + 7);
        }

    } else if (id >= rowNumber * 9 && id < rowNumber * 10) {
        let maxLength = rowNumber - 9;
        let secondDigit = parseInt(id) % 14;
        let sameLengthIndex = [0, 1, 2, 3, 4, 5, 6, 7];
        if (sameLengthIndex.includes(secondDigit)) {
            return maxLength;
        } else {
            return (maxLength - secondDigit + 7);
        }

    } else if (id >= rowNumber * 10 && id < rowNumber * 11) {
        let maxLength = rowNumber - 10;
        let secondDigit = parseInt(id) % 14;
        let sameLengthIndex = [0, 1, 2, 3, 4, 5, 6, 7];
        if (sameLengthIndex.includes(secondDigit)) {
            return maxLength;
        } else {
            return (maxLength - secondDigit + 7);
        }

    }

}
function isValidLength(id, word, check) {
    if (check === "row") {
        let gridRowNumber = Math.floor(id / 14);
        if (gridRowNumber === 11 && word.length < 3) return true;
        if (gridRowNumber === 10 && word.length < 4) return true;
        if (gridRowNumber === 9 && word.length < 5) return true;
        if (gridRowNumber === 8 && word.length < 6) return true;
        if (gridRowNumber === 7 && word.length < 7) return true;
        if (gridRowNumber === 6 && word.length < 8) return true;
        if (gridRowNumber === 5 && word.length < 9) return true;
        if (gridRowNumber === 4 && word.length < 10) return true;
        if (gridRowNumber === 3 && word.length < 11) return true;
        if (gridRowNumber === 2 && word.length < 12) return true;
        if (gridRowNumber === 1 && word.length < 13) return true;
        if (gridRowNumber === 0 && word.length < 14) return true;
    }

    if (check === "column") {
        let gridColumnNumber = parseInt(id) % 14;
        if (id < 14) gridColumnNumber = id;

        if (gridColumnNumber === 11 && word.length < 3) return true;
        if (gridColumnNumber === 10 && word.length < 4) return true;
        if (gridColumnNumber === 9 && word.length < 5) return true;
        if (gridColumnNumber === 8 && word.length < 6) return true;
        if (gridColumnNumber === 7 && word.length < 7) return true;
        if (gridColumnNumber === 6 && word.length < 8) return true;
        if (gridColumnNumber === 5 && word.length < 9) return true;
        if (gridColumnNumber === 4 && word.length < 10) return true;
        if (gridColumnNumber === 3 && word.length < 11) return true;
        if (gridColumnNumber === 2 && word.length < 12) return true;
        if (gridColumnNumber === 1 && word.length < 13) return true;
        if (gridColumnNumber === 0 && word.length < 14) return true;
    }

    if (check === "diagonal") {
        let allowLength = getAllowLengthForDiagonal(id);
        if (word.length <= allowLength) {
            return true;
        } else {
            return false;
        }

    }

}
function diagonalPosition(arrayWord, word, indexOfWord) {
    let randomWord = word.split("");
    if(0.5 > Math.random()) randomWord.reverse();

    let wordIndex = indexOfWord;
    let randomId = getRandomFromArray(letters).id;
    let id = parseInt(randomId);
    let letterPos = [];

    for (let i = 0; i < randomWord.length; i++) {
        letterPos.push((id + (i * 15)));
    }

    if (isValidLength(id, randomWord, "diagonal")) {
        if (letterPos.every(pos => letters[pos] ? letters[pos].innerText === "" : null)) {
            letterPos.forEach((pos, index) => {
                if (letters[pos].innerText === "") {
                    letters[pos].innerText = randomWord[index];
                }
                // console.log(word + " diagonal")
            })
            arrayWord.splice(wordIndex, 1);
        }
    }
}
function rowPosition(arrayWord, word, indexOfWord) {
    let randomWord = word.split("");
    if(0.5 > Math.random()) randomWord.reverse();
    let wordIndex = indexOfWord;
    let randomId = getRandomFromArray(letters).id;
    let id = parseInt(randomId);
    let letterPos = [];633
    for (let i = 0; i < randomWord.length; i++) {
        letterPos.push(id + i);
    }

    if (isValidLength(id, randomWord, "column")) {
        if (letterPos.every(pos => letters[pos].innerText === "")) {

            letterPos.forEach((pos, index) => {
                if (letters[pos].innerText === "") {
                    letters[pos].innerText = randomWord[index];
                }
                // console.log(word + " row")
            })
            arrayWord.splice(wordIndex, 1);
        }
    }
}
function columnPosition(arrayWord, word, indexOfWord) {
    let randomWord = word.split("");
    if(0.5 > Math.random()) randomWord.reverse();

    let wordIndex = indexOfWord;
    let randomId = getRandomFromArray(letters).id;
    let id = parseInt(randomId);
    let letterPos = [];

    for (let i = 0; i < randomWord.length; i++) {
        letterPos.push((id + (14 * i)));
    }

    if (isValidLength(id, randomWord, "row")) {
        if (letterPos.every(pos => letters[pos].innerText === "")) {

            letterPos.forEach((pos, index) => {
                if (letters[pos].innerText === "") {
                    letters[pos].innerText = randomWord[index];
                }
                // console.log(word + " column")
            })
            arrayWord.splice(wordIndex, 1);
        }
    }
}
function getRandomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    return `rgb(${r},${g},${b})`;
}
function isWord(arr1, arr2) {
    let word = arr2.join("");
    let wordReverse = arr2.reverse().join("");
    arr2 = [];
    arr1 = arr1.map(e => e.toUpperCase())

    if (arr1.includes(word)) {
        let indexOFWordFound = arr1.indexOf(word);
        wordToFind[indexOFWordFound].classList.add("word_found");
        letterToCheck = [];

        for (let i = 0; i < letters.length; i++) {
            if (letters[i].style.background) {
                letters[i].classList.add("letter_found");
                letters[i].style.background = "";
            }
        }


    } else if (arr1.includes(wordReverse)) {
        let indexOFWordFound = arr1.indexOf(wordReverse);
        wordToFind[indexOFWordFound].classList.add("word_found");
        letterToCheck = [];

        for (let i = 0; i < letters.length; i++) {
            if (letters[i].style.background) {
                letters[i].classList.add("letter_found");
                letters[i].style.background = "";
            }
        }


    } else {
        // vibrate(1000);
        letterToCheck = [];
        letters.forEach(letter => !letter.classList.contains("letter_found") ? letter.style.background = "" : null);

    }

}

function isWin() {
    let win =  wordToFind.every(word => word.classList.contains("word_found"));

    if (win) {
        setTimeout(()=>showWinScreen(),1500);
        levels[level].setAttribute('data-lock',false);

        nextButton.addEventListener('click',()=>{
            level++;
            saveLevel(level);
            nextLevel(level);
            showGameScreen()
        },{once: true})

        homeButton.addEventListener('click',()=>{
            showHomeScreen()
        })
    }

}

function isMobile() {
    if (window.innerWidth < 768) {
        return true
    } else {
        return false
    }
}

function moveDown(e) {
    letterToCheck.push(e.target.innerText);
    e.target.style.background = getRandomColor();
    letters.forEach(letter => letter.addEventListener('mouseover', moveOver));
    // letters.forEach(letter => letter.addEventListener('touchmove', moveOver));
}
function moveOver(e) {
    e.preventDefault()
    letterToCheck.push(e.target.innerText);
    if (!e.target.classList.contains("letter_found")) e.target.style.background = getRandomColor();
}
function moveUp() {
    isWord(currectWords, letterToCheck);
    letters.forEach(letter => letter.removeEventListener('mouseover', moveOver));
    letters.forEach(letter => letter.removeEventListener('touchmove', moveOver));
   
    isWin() 
}

function touchStart(e) {
    // letterToCheck.push(e.target.innerText);
    e.target.style.background = getRandomColor();
    letters.forEach(letter => letter.addEventListener('touchmove', touchMove));
}
    function touchMove(e) {
    e.preventDefault()
    // letterToCheck.push(e.target.innerText);
    if (!e.target.classList.contains("letter_found")) e.target.style.background = getRandomColor();

    // console.log(getTouchMouseTargetElement(e))
}
function touchEnd(e) {
    isWord(currectWords, letterToCheck);
    letters.forEach(letter => letter.removeEventListener('mouseover', moveOver));
    letters.forEach(letter => letter.removeEventListener('touchmove', touchMove));
   
    isWin() 
}

function getTouchMouseTargetElement(e) {
    if (e.touches) {
      return document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
    }
    return e.target;
}

function nextLevel(level) {
    if (level === 1) createBoard(canBeLose,level);
    if (level === 2) createBoard(canNotBuy,level);
    if (level === 3) createBoard(humanThing,level);
    if (level === 4) createBoard(notChosenThing,level);
    if (level === 5) createBoard(bibleBooks,level);
    if (level === 6) createBoard(apostles,level);
    if (level === 7) createBoard(techs,level);
    if (level === 8) createBoard(house,level);
    if (level === 9) createBoard(appliances,level);
    if (level === 10) createBoard(house2,level);
    if (level === 11) createBoard(vegetables,level);
    if (level === 12) createBoard(countries,level);
    if (level === 13) createBoard(bodyParts,level);
    if (level === 14) createBoard(names,level);
    if (level === 15) createBoard(fruits,level);
    if (level === 16) createBoard(Provinces,level);
    if (level === 17) createBoard(FamilyTrees,level);
    if (level === 18) createBoard(Objects,level);
    if (level === 19) alert('JUEGO COMPLETADO!')
}

function vibrate(ms) {
    navigator.vibrate(ms)
}

function lettersEvent(){
    letters.forEach(letter => letter.addEventListener('mousedown', moveDown));
    letters.forEach(letter => letter.addEventListener('mouseup', moveUp));

    letters.forEach(letter => letter.addEventListener('touchstart', touchStart));
    letters.forEach(letter => letter.addEventListener('touchend', touchEnd));

}

function showSection(element){
    if(element.classList.contains('hide')) element.classList.remove('hide');
    element.classList.add('show');
}
function hideSection(element){
    if(element.classList.contains('show')) element.classList.remove('show');
    element.classList.add('hide');
}

function showGameScreen(){
    hideSection(winScreen);
    hideSection(homeScreen);
    hideSection(levelScreen);
    showSection(gameScreen);
}
function showWinScreen(){
    letters.forEach(letter => letter.removeEventListener('mousedown', moveDown));
    letters.forEach(letter => letter.removeEventListener('mouseup', moveUp));
    hideSection(gameScreen);
    hideSection(homeScreen);
    hideSection(levelScreen);
    showSection(winScreen);
}
function showHomeScreen(){
    hideSection(gameScreen);
    hideSection(winScreen);
    hideSection(levelScreen);
    showSection(homeScreen);
}
function showLevelScreen(){
    createChooseLevelMenu();
    hideSection(gameScreen);
    hideSection(winScreen);
    hideSection(homeScreen);
    showSection(levelScreen);
}
function startGame(){
    nextLevel(level);
    showGameScreen();
}

playButton.addEventListener('click',showLevelScreen);
