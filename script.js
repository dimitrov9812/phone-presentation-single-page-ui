// Handle Localization ===================================================================
let selectedLanguage = document.getElementsByTagName('html').item(0).getAttribute('lang');
console.log(selectedLanguage);

// Get all the elements
let elements = document.getElementsByTagName('*');
let elementsCount = elements.length;

// Handle theme select
let theme = 'light';

// Set the initial map value
let map;
let marker;

// Handle Language select
let languageSelector = document.querySelector('.language-select');
let languageSelectorDesktop = document.querySelector('.language-select-desktop');

// Get the selected language from localstorage

getGlobalLanguage();
getGlobalTheme();
initMap();

function getGlobalLanguage() {
    let language = window.localStorage.getItem('language');

    console.log('localstorage language: ' + language)
    console.log('localstorage theme: ' + theme);

    if (language) {
        selectedLanguage = language;
    } else {
        selectedLanguage = 'en'
    }

    localizePage();
}

function getGlobalTheme() {
    let currentTheme = window.localStorage.getItem('theme');

    if (currentTheme != 'light') {
        changeTheme();
    }
}

function setGlobalLanguage(language) {
    window.localStorage.setItem('language', language)
    console.log("LOCALSTORAGE LANGUAGE HAS BEEN SET: " + language)
}

function handleLanguageSelect(value) {
    selectedLanguage = languageSelector.value;
    setGlobalLanguage(selectedLanguage)
    localizePage();
}

function handleLanguageSelectDesktop(value) {
    selectedLanguage = languageSelectorDesktop.value;
    setGlobalLanguage(selectedLanguage)
    localizePage();
}


// Apply the styles on each localized element and toggle it's display propery by changing the style
function localizePage() {
    console.log(selectedLanguage)
    for (let i = 0; i < elementsCount; i++) {
        const element = elements.item(i)
        if (element.hasAttribute('lang') && element.tagName.toString() != 'HTML') {

            if (element.attributes) {
                let attributesLength = element.attributes.length;

                for (let k = 0; k < attributesLength; k++) {
                    const attribute = element.attributes.getNamedItem('lang');

                    if (attribute.value != selectedLanguage) {
                        element.setAttribute('style','display: none');
                    } else {
                        element.setAttribute('style','display: block');
                    }
                }
            }
        }
    }

    setLanguagePickerValue(selectedLanguage);
}

function setLanguagePickerValue(language) {
    languageSelectorDesktop.value = language;
}

// =====================================================================================


// Handle theme change =================================================================
function changeTheme() {
    document.body.classList.toggle('dark');
    if (theme == 'light') {
        theme = 'dark'
    } else {
        theme = 'light'
    }

    window.localStorage.setItem('theme', theme);
}

// Handle Map Display ==================================================================
function initMap() {
    if (google != undefined) {
        let location = { lat: -34.397, lng: 150.644 };
        map = new google.maps.Map(document.getElementById("map"), {
            center: location,
            zoom: 8,
        });
    
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
}

// Handle Find a Mentor Card flip
function handleCardFlip() {
}