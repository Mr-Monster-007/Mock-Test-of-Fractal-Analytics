const questions = [
  {
    question: "What is the purpose of Principal Component Analysis (PCA)?",
    options: ["Data classification", "Dimensionality reduction", "Regression analysis", "Clustering"],
    answer: "Dimensionality reduction"
  },
  {
    question: "Which model is used to predict a binary outcome?",
    options: ["Linear Regression", "Logistic Regression", "K-Means", "Decision Tree"],
    answer: "Logistic Regression"
  },
  {
    question: "What is overfitting in machine learning?",
    options: ["Model performs well on training data but poorly on test data", 
              "Model performs well on test data but poorly on training data", 
              "Model performs equally on both datasets", 
              "Model is too simple"],
    answer: "Model performs well on training data but poorly on test data"
  },
  {
    question: "What is a confusion matrix used for?",
    options: ["To measure accuracy", "To calculate precision", "To calculate error rate", "To evaluate classification performance"],
    answer: "To evaluate classification performance"
  }
];

let selectedAnswers = {};
const container = document.getElementById('question-container');

questions.forEach((q, index) => {
  const questionElement = document.createElement('div');
  questionElement.classList.add('question-container');
  questionElement.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
  q.options.forEach(option => {
    questionElement.innerHTML += `
      <label>
        <input type="radio" name="q${index}" value="${option}">
        ${option}
      </label><br>`;
  });
  container.appendChild(questionElement);
});

function handleSubmit() {
  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected) {
      selectedAnswers[`Question ${index + 1}`] = selected.value;
    }
  });

  const email = document.getElementById('email').value;

  // Create the email message
  const message = `
    Email: ${email}\n
    Answers:\n
    ${JSON.stringify(selectedAnswers, null, 2)}\n
  `;

  // Use Formspree or EmailJS to send the data
  fetch("https://formspree.io/f/xzzpnbrl)", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      message: message
    })
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('result').innerText = 'Your test has been submitted. We will notify you if selected.';
    } else {
      document.getElementById('result').innerText = 'There was an error submitting your test.';
    }
  })
  .catch(error => {
    document.getElementById('result').innerText = 'There was an error submitting your test.';
  });

  // Prevent form submission
  return false;
}
