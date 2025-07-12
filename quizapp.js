// Quiz questions
        const questions = [
            {
                question: "What is the capital of France?",
                options: ["Berlin", "Madrid", "Paris", "Rome"],
                answer: 2
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                answer: 1
            },
            {
                question: "What is the largest mammal?",
                options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                answer: 1
            },
            {
                question: "Which element has the chemical symbol 'O'?",
                options: ["Gold", "Oxygen", "Osmium", "Iron"],
                answer: 1
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                answer: 2
            },
            {
                question: "What is the smallest prime number?",
                options: ["0", "1", "2", "3"],
                answer: 2
            },
            {
                question: "Which country is home to the kangaroo?",
                options: ["New Zealand", "South Africa", "Australia", "Brazil"],
                answer: 2
            },
            {
                question: "What is the main component of the Sun?",
                options: ["Liquid Lava", "Hydrogen", "Oxygen", "Carbon"],
                answer: 1
            },
            {
                question: "Which language has the most native speakers?",
                options: ["English", "Hindi", "Spanish", "Mandarin Chinese"],
                answer: 3
            },
            {
                question: "What is the square root of 64?",
                options: ["4", "6", "8", "10"],
                answer: 2
            },
            {
                question: "Which year did World War II end?",
                options: ["1943", "1945", "1947", "1950"],
                answer: 1
            },
            {
                question: "What is the currency of Japan?",
                options: ["Won", "Yen", "Yuan", "Ringgit"],
                answer: 1
            },
            {
                question: "Who wrote 'Romeo and Juliet'?",
                options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
                answer: 1
            },
            {
                question: "Which gas do plants absorb from the atmosphere?",
                options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
                answer: 2
            },
            {
                question: "What is the hardest natural substance on Earth?",
                options: ["Gold", "Iron", "Diamond", "Quartz"],
                answer: 2
            }
        ];

        // DOM elements
        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        const timerEl = document.getElementById('timer');
        const progressBar = document.getElementById('progress-bar');
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const resultModal = document.getElementById('result-modal');
        const finalScoreEl = document.getElementById('final-score');
        const starsEl = document.getElementById('stars');
        const feedbackEl = document.getElementById('feedback');
        const topScoresEl = document.getElementById('top-scores');
        const restartBtn = document.getElementById('restart-btn');

        // Quiz state
        let currentQuestion = 0;
        let score = 0;
        let timer;
        let timeLeft = 10;
        let userAnswers = Array(questions.length).fill(null);
        let answeredQuestions = new Set();

        // Initialize quiz
        function initQuiz() {
            currentQuestion = 0;
            score = 0;
            userAnswers = Array(questions.length).fill(null);
            answeredQuestions = new Set();
            loadQuestion();
            updateProgressBar();
            updateNavigationButtons();
        }

        // Load question
        function loadQuestion() {
            resetTimer();
            startTimer();
            
            const question = questions[currentQuestion];
            questionEl.textContent = `${currentQuestion + 1}. ${question.question}`;
            
            optionsEl.innerHTML = '';
            question.options.forEach((option, index) => {
                const optionEl = document.createElement('div');
                optionEl.className = 'option';
                
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'option';
                input.id = `option-${index}`;
                input.value = index;
                input.addEventListener('change', () => selectAnswer(index));
                
                const label = document.createElement('label');
                label.htmlFor = `option-${index}`;
                
                const radio = document.createElement('span');
                radio.className = 'custom-radio';
                
                const optionText = document.createTextNode(option);
                
                label.appendChild(radio);
                label.appendChild(optionText);
                optionEl.appendChild(input);
                optionEl.appendChild(label);
                
                // Check if this option was previously selected
                if (userAnswers[currentQuestion] === index) {
                    input.checked = true;
                }
                
                optionsEl.appendChild(optionEl);
            });
        }

        // Select answer
        function selectAnswer(answerIndex) {
            userAnswers[currentQuestion] = answerIndex;
            answeredQuestions.add(currentQuestion);
            
            // Check if answer is correct
            if (answerIndex === questions[currentQuestion].answer) {
                if (!answeredQuestions.has(currentQuestion)) {
                    score++;
                }
            } else {
                // If changing from correct to incorrect answer
                if (answeredQuestions.has(currentQuestion) && userAnswers[currentQuestion] !== questions[currentQuestion].answer) {
                    score--;
                }
            }
        }

        // Next question
        function nextQuestion() {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                loadQuestion();
                updateProgressBar();
                updateNavigationButtons();
            } else {
                showResults();
            }
        }

        // Previous question
        function previousQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                loadQuestion();
                updateProgressBar();
                updateNavigationButtons();
            }
        }

        // Update navigation buttons
        function updateNavigationButtons() {
            prevBtn.disabled = currentQuestion === 0;
            nextBtn.textContent = currentQuestion === questions.length - 1 ? "Submit" : "Next";
        }

        // Update progress bar
        function updateProgressBar() {
            const progress = (currentQuestion + 1) / questions.length;
            progressBar.style.transform = `scaleX(${progress})`;
        }

        // Timer functions
        function startTimer() {
            timeLeft = 10;
            updateTimerDisplay();
            timer = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    if (currentQuestion < questions.length - 1) {
                        nextQuestion();
                    } else {
                        showResults();
                    }
                }
            }, 1000);
        }

        function resetTimer() {
            clearInterval(timer);
            timeLeft = 10;
            updateTimerDisplay();
        }

        function updateTimerDisplay() {
            timerEl.textContent = `${timeLeft}s`;
            if (timeLeft <= 3) {
                timerEl.style.color = 'red';
            } else {
                timerEl.style.color = 'var(--primary)';
            }
        }

        // Show results
        function showResults() {
            clearInterval(timer);
            
            // Calculate final score
            score = 0;
            userAnswers.forEach((answer, index) => {
                if (answer === questions[index].answer) {
                    score++;
                }
            });
            
            finalScoreEl.textContent = score;
            
            // Star rating
            const starRating = Math.ceil((score / questions.length) * 5);
            starsEl.textContent = '★'.repeat(starRating) + '☆'.repeat(5 - starRating);
            
            // Feedback
            let feedback;
            if (score === questions.length) {
                feedback = "Perfect! You're a quiz master!";
            } else if (score >= questions.length * 0.8) {
                feedback = "Excellent! You know your stuff!";
            } else if (score >= questions.length * 0.6) {
                feedback = "Good job! Keep learning!";
            } else if (score >= questions.length * 0.4) {
                feedback = "Not bad, but room for improvement!";
            } else {
                feedback = "Keep practicing! You'll get better!";
            }
            feedbackEl.textContent = feedback;
            
            // Save and show high scores
            saveHighScore(score);
            showHighScores();
            
            // Show modal
            resultModal.classList.add('active');
        }

        // High scores
        function saveHighScore(newScore) {
            let highScores = JSON.parse(localStorage.getItem('quizHighScores')) || [];
            highScores.push(newScore);
            highScores.sort((a, b) => b - a);
            highScores = highScores.slice(0, 5);
            localStorage.setItem('quizHighScores', JSON.stringify(highScores));
        }

        function showHighScores() {
            const highScores = JSON.parse(localStorage.getItem('quizHighScores')) || [];
            topScoresEl.innerHTML = '';
            
            highScores.forEach((score, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${score}/${questions.length}`;
                topScoresEl.appendChild(li);
            });
        }

        // Event listeners
        nextBtn.addEventListener('click', nextQuestion);
        prevBtn.addEventListener('click', previousQuestion);
        restartBtn.addEventListener('click', () => {
            resultModal.classList.remove('active');
            initQuiz();
        });

        // Start quiz
        initQuiz();