
const quotes = {
    happy: [
        "The best way to cheer yourself up is to try to cheer somebody else up. - Mark Twain",
        "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
        "Keep your face always toward the sunshine—and shadows will fall behind you. - Walt Whitman",
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Life is what happens to you while you're busy making other plans. - John Lennon",
        "In the middle of every difficulty lies opportunity. - Albert Einstein",
        "Be yourself; everyone else is already taken. - Oscar Wilde",
        "A room without books is like a body without a soul. - Marcus Tullius Cicero",
        "You only live once, but if you do it right, once is enough. - Mae West",
        "Be the change that you wish to see in the world. - Mahatma Gandhi"
    ],
    sad: [
        "Even the darkest night will end and the sun will rise. - Victor Hugo",
        "Tears come from the heart and not from the brain. - Leonardo da Vinci",
        "The way sadness works is one of the strange riddles of the world. - Lemony Snicket",
        "Every man has his secret sorrows which the world knows not. - Henry Wadsworth Longfellow",
        "Sadness flies away on the wings of time. - Jean de La Fontaine",
        "The good times of today are the sad thoughts of tomorrow. - Bob Marley",
        "Experiencing sadness and anger can make you feel more creative. - Modupe Akinola",
        "Heavy hearts, like heavy clouds in the sky, are best relieved by the letting of a little water. - Christopher Morley",
        "Sadness is but a wall between two gardens. - Kahlil Gibran",
        "There is no greater sorrow than to recall happiness in times of misery. - Dante Alighieri"
    ],
    angry: [
        "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured. - Mark Twain",
        "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else. - Buddha",
        "For every minute you remain angry, you give up sixty seconds of peace of mind. - Ralph Waldo Emerson",
        "Anger cannot be dishonest. - Marcus Aurelius",
        "When angry, count to ten before you speak. If very angry, count to one hundred. - Thomas Jefferson",
        "Anybody can become angry — that is easy, but to be angry with the right person and to the right degree and at the right time and for the right purpose, and in the right way — that is not within everybody's power and is not easy. - Aristotle",
        "Anger is a wind which blows out the lamp of the mind. - Robert Green Ingersoll",
        "Anger makes you smaller, while forgiveness forces you to grow beyond what you are. - Cherie Carter-Scott",
        "Never go to bed mad. Stay up and fight. - Phyllis Diller",
        "The best fighter is never angry. - Lao Tzu"
    ],
    "in-between": [
        "Life is a series of natural and spontaneous changes. Don't resist them; that only creates sorrow. - Lao Tzu",
        "The only constant in life is change. - Heraclitus",
        "Not all those who wander are lost. - J.R.R. Tolkien",
        "Sometimes you're ahead, sometimes you're behind. The race is long, and in the end, it's only with yourself. - Mary Schmich",
        "Balance is not something you find, it's something you create. - Jana Kingsford",
        "Life is like riding a bicycle. To keep your balance, you must keep moving. - Albert Einstein",
        "The curious paradox is that when I accept myself just as I am, then I can change. - Carl Rogers",
        "In any given moment we have two options: to step forward into growth or to step back into safety. - Abraham Maslow",
        "The middle path is the way to wisdom. - Buddha",
        "Sometimes the most productive thing you can do is relax. - Mark Black"
    ]
};


const nameInput = document.getElementById('nameInput');
const submitNameBtn = document.getElementById('submitNameBtn');
const displayName = document.getElementById('displayName');
const greetingSection = document.getElementById('greetingSection');
const greetingMessage = document.getElementById('greetingMessage');
const quoteDisplay = document.getElementById('quoteDisplay');
const moodButtons = document.querySelectorAll('.mood-btn');
const generateNewBtn = document.getElementById('generateNewBtn');
const moodImage = document.getElementById('moodImage');

let savedName = '';
let usedQuotes = [];
let isTyping = false;


document.addEventListener('DOMContentLoaded', function() {
    
    nameInput.addEventListener('input', function() {
        const name = nameInput.value.trim();
        displayName.textContent = name || '[name]';
    });

  
    submitNameBtn.addEventListener('click', function() {
        console.log('Submit button clicked!'); 
        const name = nameInput.value.trim();
        console.log('Name entered:', name); 
        if (name) {
            savedName = name;
            displayName.textContent = name;
            showGreeting(name);
       
            nameInput.value = '';
        } else {
            console.log('No name entered');
        }
    });

    
    function showGreeting(name) {
        console.log('Showing greeting for:', name); 
        greetingMessage.textContent = `Hello ${name}, good luck in life!`;
        greetingSection.style.display = 'block';
       
        setTimeout(() => {
            greetingSection.classList.add('show');
        }, 10);
    }

    
    nameInput.focus();

   
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            
            moodButtons.forEach(btn => btn.classList.remove('active'));
            
            this.classList.add('active');
            
            updateButtonStyling(mood);
            
            changeMoodImage(mood);
        });
    });

   
    generateNewBtn.addEventListener('click', function() {
        if (!isTyping) {
            generateNewQuote();
        }
    });

   
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
         
            const name = nameInput.value.trim();
            if (name) {
                savedName = name;
                displayName.textContent = name;
                showGreeting(name);
                nameInput.value = '';
            } else if (!isTyping && savedName) {
              
                generateNewQuote();
            }
        }
    });

    
    setTimeout(() => {
        quoteDisplay.style.opacity = '1';
    }, 500);
});


function generateNewQuote() {
    
    if (isTyping) return;
    

    const allQuotes = [
        ...quotes.happy,
        ...quotes.sad,
        ...quotes.angry,
        ...quotes["in-between"]
    ];
    
    let availableQuotes = allQuotes.filter(quote => !usedQuotes.includes(quote));
    

    if (availableQuotes.length === 0) {
        usedQuotes = [];
        availableQuotes = [...allQuotes];
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const randomQuote = availableQuotes[randomIndex];
    
   
    usedQuotes.push(randomQuote);
    
    
    typeWriter(randomQuote, quoteDisplay);
}

function typeWriter(text, element) {

    isTyping = true;
    generateNewBtn.disabled = true;
    generateNewBtn.style.opacity = '0.6';
    generateNewBtn.style.cursor = 'not-allowed';
    
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 30);
        } else {
 
            isTyping = false;
            generateNewBtn.disabled = false;
            generateNewBtn.style.opacity = '1';
            generateNewBtn.style.cursor = 'pointer';
        }
    }
    
    type();
}

function updateButtonStyling(mood) {
    moodButtons.forEach(btn => {
        btn.classList.remove('sad', 'angry', 'in-between');
        if (btn.getAttribute('data-mood') === mood) {
            btn.classList.add(mood);
        }
    });
}

function changeMoodImage(mood) {

    moodImage.style.opacity = '0';
    
    setTimeout(() => {
        const imagePath = `/media/${mood}.png`;
        moodImage.src = imagePath;
        moodImage.alt = `${mood.charAt(0).toUpperCase() + mood.slice(1)} mood character`;
        
        
        moodImage.classList.remove('sad', 'happy', 'angry', 'in-between');
        

        moodImage.classList.add(mood);
        

        moodImage.style.opacity = '1';
    }, 150); 
}
