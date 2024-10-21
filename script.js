const wordToTranslate = document.querySelector(".word-to-translate");
const inputMeaning = document.querySelector(".input-meaning")
const skipBtn = document.querySelector(".skip-btn")
const submitBtn = document.querySelector(".submit-btn")
const updateResult = document.getElementById("update-result")

// Content display for first page load
let wordsArray = []
let wordIndex = 0

loadPage()

function loadPage() {
    getWordsArray().then((result) => {
        wordsArray = result;
        displayWord(wordIndex)
    })
    
}

function displayWord(wordIndex) {
    if (wordIndex >= wordsArray.length) {
        wordIndex = 0;
    }
    wordObj = wordsArray[wordIndex];
    wordToTranslate.innerHTML = wordObj.word
}

async function getWordsArray() {
    try {
        const response = await fetch('http://192.168.50.156:8080/meanings/get/empty')
        const wordsArray = await response.json()
        console.log('got the array of word objects')
        return wordsArray
    }
    catch(err) {
        console.log(err)
    }
}


skipBtn.addEventListener('click', () => {
    wordIndex++;
    displayWord(wordIndex)
})

submitBtn.addEventListener('click', async () => {
    let wordMeaning = inputMeaning.value
    let resquestBody = {
        "word": wordToTranslate.innerHTML,
        "meaning": wordMeaning,
        "lang": "vn"
    }
    try {
        console.log(resquestBody)
        const response = await fetch('http://192.168.50.156:8080/meanings/add',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resquestBody),
            }
        )
        const resjson = await response.json();
        console.log(resjson);

        // updateResult.innerHTML = "Word meaning updated."

        inputMeaning.value = '';
        wordIndex++;
        displayWord(wordIndex);

    }
    catch(err){
        console.log(err)
    }
})

