document.addEventListener('DOMContentLoaded', function () {
// Morse Code Translator
    const morseCodeDict = {
        "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.", "g": "--.", "h": "....", "i": "..",
        "j": ".---", "k": "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---", "p": ".--.", "q": "--.-", "r": ".-.",
        "s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--", "x": "-..-", "y": "-.--", "z": "--..",
        "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..",
        "9": "----.", "0": "-----", "!": "-.-.--", ",": "--..--", ".": ".-.-.-", '"': ".-..-.", "'": ".----.",
        "?": "..--..", "(": "-.--.", ")": "-.--.-", " ": " / "
    };

    const translatorForm = document.getElementById('translator-form');
    const inputText = document.getElementById('inputText');
    const result = document.getElementById('result');

    translatorForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const text = inputText.value.trim();
        const translationType = document.querySelector('input[name="translationType"]:checked').value;
        console.log('Form submitted');
        console.log('Input Text:', text);
        console.log('Translation Type:', translationType);
        if (translationType === 'toMorse') {
            result.textContent = translateToMorse(text);
            result.hidden = false;
            console.log('Morse Code Result:', result.textContent);
        } else {
            result.textContent = translateToEnglish(text);
            result.hidden = false;
            console.log('English Text Result:', result.textContent);
        }
    });

    function translateToMorse(text) {
        return text.toLowerCase().split('').map(char => morseCodeDict[char] || '').join(' ');
    }

    function translateToEnglish(morse) {
        const morseToEnglish = Object.entries(morseCodeDict).reduce((acc, [key, value]) => {
            acc[value] = key;
            return acc;
        }, {});

        return morse.split(' / ').map(word => word.split(' ').map(symbol => morseToEnglish[symbol] || '').join('')).join(' ');
    }
});