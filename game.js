const startBtn = document.getElementById("start-btn")
const route = 'http://192.168.50.156:8080'
// /words/get/test
// /meanings/get/wrong

const display = document.getElementById("display-word")
const meaningsToChoose = document.getElementById("meanings-to-choose")
const options = document.getElementById("options")

let wordsArray = []

// Start the game. Get the arrays of words that have meanings
startBtn.addEventListener('click', async () => {
    try {
        let testResponse = await fetch(`${route}/words/get/test`)
        let wordsArrayWithMeanings = await testResponse.json()

        let wrongResponse = await fetch(`${route}/meanings/get/wrong`)
        let wrongMeaningsObj = await wrongResponse.json()
        
        let index = randomPick(wordsArrayWithMeanings.length)
        display.innerHTML = wordsArrayWithMeanings[index].word

        console.log(wordsArrayWithMeanings[index])

        let wrongMeaningsArr = createWrongMeaningsArray(wrongMeaningsObj,3)
        console.log(wrongMeaningsArr)

        return wordsArrayWithMeanings
    }
    catch(err){
        console.log(err)
    }
})

// Pick randomly one word to test
function randomPick(num) {
    return Math.floor(Math.random() * num);
}

// Create an array of wrong meanings to test
function createWrongMeaningsArray(objArr, resultLength){
    if (objArr.length <=0) {
        return false
    }
    let result = []
    let index = randomPick(objArr.length)

    while (result.length < resultLength){

        let meaningVal = objArr[index].meaning
        console.log(meaningVal)

        if (result.indexOf(meaningVal) < 0 && meaningVal.length > 0) {
            result.push(meaningVal)
        }
        index = randomPick(objArr.length)
    }
    return result;
}





