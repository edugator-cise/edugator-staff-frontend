export const sampleLesson = [
  {
    title: "Lists, Stacks, and Queues",
    author: "Amanpreet Kapoor",
    date: "04/13/2022",
  },
  {
    type: "text",
    content: {
      html: "<p>This document will cover all required material for Exam 1. Good Luck!</p>",
    },
  },
  {
    type: "text",
    content: {
      html: "<h2>Lists, Stacks and Queues</h2>",
    },
  },
  {
    type: "text",
    content: {
      html: "<p>Lists, stacks, and queues are basic data structures meant to hold sequential data in an organized fashion.</p>",
    },
  },
  {
    type: "text",
    content: {
      html: "<h3>Stacks</h3>",
    },
  },
  {
    type: "text",
    content: {
      html: "<p>A stack is a linear data structure in which elements can be inserted and deleted only from one side of the list, called the <b>top</b>. A stack follows the <b>LIFO</b> (Last In First Out) principle, i.e., the element inserted at the last is the first element to come out. The insertion of an element into stack is called push operation, and deletion of an element from the stack is called <b>pop</b> operation. In stack we always keep track of the last element present in the list with a pointer called <b>top</b>.</p>",
    },
  },
  {
    type: "image",
    content: {
      html: '<img src="https://www.jquery-az.com/html/images/banana.jpg" title="Title of image" alt="alt text here"/>',
      sourcePath:
        "https://media.geeksforgeeks.org/wp-content/uploads/geek-stack-1.png",
      title: "Stack Data Structure",
      caption: "An operation with a stack data structure.",
      size: "md",
      alignment: "none",
    },
  },
  {
    type: "text",
    content: {
      html: "<h3>Queues</h3>",
    },
  },
  {
    type: "text",
    content: {
      html: "<p>A queue is a linear data structure in which elements can be inserted only from one side of the list called <b>rear</b>, and the elements can be deleted only from the other side called the <b>front</b>. The queue data structure follows the <b>FIFO</b> (First In First Out) principle, i.e. the element inserted at first in the list, is the first element to be removed from the list. The insertion of an element in a queue is called an <b>enqueue</b> operation and the deletion of an element is called a <b>dequeue</b> operation. In queue we always maintain two pointers, one pointing to the element which was inserted at the first and still present in the list with the <b>front</b> pointer and the second pointer pointing to the element inserted at the last with the <b>rear</b> pointer.</p>",
    },
  },
  {
    type: "image",
    content: {
      html: '<img src="https://www.jquery-az.com/html/images/banana.jpg" title="Title of image" alt="alt text here"/>',
      sourcePath:
        "https://media.geeksforgeeks.org/wp-content/uploads/geek-queue-1.png",
      title: "Queue Data Structure",
      caption: "An operation with a queue data structure.",
      size: "md",
      alignment: "none",
    },
  },
  {
    type: "text",
    content: {
      html: "<h2>Review</h2>",
    },
  },
  {
    type: "text",
    content: {
      html: "<p>Answer the following questions to review your progress!</p>",
    },
  },
  {
    type: "MC",
    content: {
      question:
        "Which of the following is an attribute of a stack data structure?",
      correctAnswer: 1,
      answers: [
        {
          id: 0,
          text: "Stacks have push() and pop() methods",
        },
        {
          id: 1,
          text: "Stacks are First In First Out (FIFO)",
        },
        {
          id: 2,
          text: "A real life example is people in line for a buffet or any other line",
        },
        {
          id: 3,
          text: "A random wrong answer",
        },
      ],
    },
  },
  {
    type: "MC",
    content: {
      question:
        "Which of the following is an attribute of a queue data structure?",
      image: true,
      sourcePath:
        "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:eco%2Cw_1200/MTc0NDYzNjgxNDY2MjE0MDIy/stacks-queues.png",
      correctAnswer: 3,
      answers: [
        {
          id: 0,
          text: "Most queue operations are O(n) complexity",
        },
        {
          id: 1,
          text: "Queues are non-linear data structures",
        },
        {
          id: 2,
          text: "Queues are First In First Out (FIFO)",
        },
      ],
    },
  },
  {
    type: "MS",
    content: {
      question: "This is a multiple select problem! Pick all answers.",
      correctAnswer: [1, 2, 4],
      answers: [
        {
          id: 0,
          text: "This is a correct answer",
        },
        {
          id: 1,
          text: "This is a correct answer",
        },
        {
          id: 2,
          text: "This is an incorrect answer",
        },
        {
          id: 3,
          text: "This is a correct answer",
        },
        {
          id: 4,
          text: "This is an incorrect answer",
        },
      ],
    },
  },
];
