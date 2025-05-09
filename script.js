document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = currentDate.toLocaleDateString('en-US', options);
    
    // Paper selection
    const paperOptions = document.querySelectorAll('.paper-option');
    const letterPaper = document.getElementById('letterPaper');
    
    paperOptions.forEach(option => {
        option.addEventListener('click', function() {
            const paperType = this.getAttribute('data-paper');
            letterPaper.className = 'letter-container';
            letterPaper.classList.add(`${paperType}-bg`);
            
            // Play writing sound
            const writingSound = document.getElementById('writingSound');
            writingSound.currentTime = 0;
            writingSound.play();
        });
    });
    
    // Font selection
    const fontSelect = document.getElementById('fontSelect');
    const letterContent = document.querySelector('.letter-content');
    
    fontSelect.addEventListener('change', function() {
        letterContent.style.fontFamily = this.value;
    });
    
    // Ink color selection
    const inkColor = document.getElementById('inkColor');
    
    inkColor.addEventListener('input', function() {
        letterContent.style.color = this.value;
    });
    
    // Seal selection
    const sealOptions = document.querySelectorAll('.seal-option');
    let selectedSeal = null;
    
    sealOptions.forEach(option => {
        option.addEventListener('click', function() {
            const sealType = this.getAttribute('data-seal');
            selectedSeal = sealType;
            
            // Play seal sound
            const sealSound = document.getElementById('sealSound');
            sealSound.currentTime = 0;
            sealSound.play();
            
            // Visual feedback
            sealOptions.forEach(opt => opt.style.border = 'none');
            this.style.border = '2px solid var(--deep-red)';
            this.style.borderRadius = '50%';
        });
    });
    
    // Send letter button
    const sendButton = document.getElementById('sendLetter');
    const envelopeModal = document.querySelector('.envelope-modal');
    
    sendButton.addEventListener('click', function() {
        if (!selectedSeal) {
            alert('Please select a seal for your letter!');
            return;
        }
        
        envelopeModal.classList.remove('hidden');
    });
    
    // Close envelope button
    const closeEnvelope = document.getElementById('closeEnvelope');
    
    closeEnvelope.addEventListener('click', function() {
        const recipientEmail = document.getElementById('recipientEmail').value;
        const subjectLine = document.getElementById('subjectLine').value;
        
        if (!recipientEmail) {
            alert('Please enter your beloved\'s email address!');
            return;
        }
        
        // Play sending sound
        const sendSound = document.getElementById('sendSound');
        sendSound.currentTime = 0;
        sendSound.play();
        
        // In a real app, you would send the data to your server here
        console.log('Letter content:', letterContent.innerHTML);
        console.log('Recipient:', recipientEmail);
        console.log('Subject:', subjectLine);
        console.log('Seal type:', selectedSeal);
        console.log('Paper type:', letterPaper.classList.contains('parchment-bg') ? 'parchment' : 
                      letterPaper.classList.contains('rose-bg') ? 'rose' : 'lace');
        
        // Show confirmation
        envelopeModal.classList.add('hidden');
        alert('Your love letter has been sent! May it warm your beloved\'s heart ❤️');
        
        // Reset form
        document.getElementById('recipientEmail').value = '';
        document.getElementById('subjectLine').value = '';
    });
    
    // Save draft button
    const saveDraft = document.getElementById('saveDraft');
    
    saveDraft.addEventListener('click', function() {
        // In a real app, you would save to local storage or send to your server
        localStorage.setItem('loveLetterDraft', letterContent.innerHTML);
        alert('Your letter has been saved to your Heart\'s Archive 💌');
    });
    
    // Load draft if exists
    if (localStorage.getItem('loveLetterDraft')) {
        if (confirm('You have a saved love letter. Would you like to continue writing it?')) {
            letterContent.innerHTML = localStorage.getItem('loveLetterDraft');
        }
    }
    
    // Create floating hearts
    function createHearts() {
        const heartsContainer = document.querySelector('.background-animation .hearts');
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'hearts';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.animationDuration = `${15 + Math.random() * 20}s`;
            heart.style.animationDelay = `${Math.random() * 5}s`;
            heartsContainer.appendChild(heart);
        }
    }
    
    createHearts();
});