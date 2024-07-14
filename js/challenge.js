document.addEventListener('DOMContentLoaded', () => {
    const counter = document.getElementById('counter');
    const plusButton = document.getElementById('plus');
    const minusButton = document.getElementById('minus');
    const heartButton = document.getElementById('heart');
    const pauseButton = document.getElementById('pause');
    const submitButton = document.getElementById('submit');
    const commentInput = document.getElementById('comment-input');
    const likesList = document.querySelector('.likes');
    const commentsList = document.getElementById('list');
  
    let count = parseInt(counter.textContent, 10);
    let intervalId;
  
    const updateCounter = () => {
      count += 1;
      counter.textContent = count;
    };
  
    const startTimer = () => {
      intervalId = setInterval(updateCounter, 1000);
      plusButton.disabled = false;
      minusButton.disabled = false;
      heartButton.disabled = false;
      submitButton.disabled = false;
      pauseButton.textContent = 'pause';
    };
  
    const stopTimer = () => {
      clearInterval(intervalId);
      plusButton.disabled = true;
      minusButton.disabled = true;
      heartButton.disabled = true;
      submitButton.disabled = true;
      pauseButton.textContent = 'resume';
    };
  
    const handlePlusClick = () => {
      count += 1;
      counter.textContent = count;
    };
  
    const handleMinusClick = () => {
      count -= 1;
      counter.textContent = count;
    };
  
    const handleHeartClick = () => {
      const likeItem = Array.from(likesList.children).find(li => li.dataset.num === count.toString());
      
      if (likeItem) {
        const likeCount = parseInt(likeItem.textContent.split(' ')[0], 10);
        likeItem.textContent = `${likeCount + 1} ❤️ ${count}`;
      } else {
        const newLikeItem = document.createElement('li');
        newLikeItem.dataset.num = count;
        newLikeItem.textContent = `1 ❤️ ${count}`;
        likesList.appendChild(newLikeItem);
      }
    };
  
    const handlePauseResumeClick = () => {
      if (pauseButton.textContent === 'pause') {
        stopTimer();
      } else {
        startTimer();
      }
    };
  
    const handleCommentSubmit = (event) => {
      event.preventDefault();
      const comment = commentInput.value;
      if (comment) {
        const newComment = document.createElement('p');
        newComment.textContent = comment;
        commentsList.appendChild(newComment);
        commentInput.value = '';
      }
    };
  
    plusButton.addEventListener('click', handlePlusClick);
    minusButton.addEventListener('click', handleMinusClick);
    heartButton.addEventListener('click', handleHeartClick);
    pauseButton.addEventListener('click', handlePauseResumeClick);
    submitButton.addEventListener('click', handleCommentSubmit);
  
    startTimer();
  });
  