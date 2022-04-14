export const sampleLesson = [
    {
        title: 'Lists, Stacks, and Queues',
        author: 'Amanpreet Kapoor',
        date: '04/13/2022'
    },
    {
        contentType: 'text',
        content: "<p>This document will cover all required material for Exam 1. Good Luck!</p>",
    },
    {
        contentType: 'text',
        content: "<h2>Lists, Stacks and Queues</h2>",
    },
    {
        contentType: 'text',
        content: "<p>Lists, stacks, and queues are basic data structures meant to hold sequential data in an organized fashion.</p>",
    },
    {
        contentType: 'text',
        content: "<h3>Stacks</h3>",
    },
    {
        contentType: 'text',
        content: "<p>A stack is a linear data structure in which elements can be inserted and deleted only from one side of the list, called the <b>top</b>. A stack follows the <b>LIFO</b> (Last In First Out) principle, i.e., the element inserted at the last is the first element to come out. The insertion of an element into stack is called push operation, and deletion of an element from the stack is called <b>pop</b> operation. In stack we always keep track of the last element present in the list with a pointer called <b>top</b>.</p>",
    },
    {
        contentType: 'image',
        content: {
            html: '<img src="https://www.jquery-az.com/html/images/banana.jpg" title="Title of image" alt="alt text here"/>',
            sourcePath: 'https://media.geeksforgeeks.org/wp-content/uploads/geek-stack-1.png',
            title: 'Stack Data Structure',
            caption: 'An operation with a stack data structure.',
            size: 'md'
        }
    },
    {
        contentType: 'text',
        content: "<h3>Queues</h3>",
    },
    {
        contentType: 'text',
        content: "<p>A queue is a linear data structure in which elements can be inserted only from one side of the list called <b>rear</b>, and the elements can be deleted only from the other side called the <b>front</b>. The queue data structure follows the <b>FIFO</b> (First In First Out) principle, i.e. the element inserted at first in the list, is the first element to be removed from the list. The insertion of an element in a queue is called an <b>enqueue</b> operation and the deletion of an element is called a <b>dequeue</b> operation. In queue we always maintain two pointers, one pointing to the element which was inserted at the first and still present in the list with the <b>front</b> pointer and the second pointer pointing to the element inserted at the last with the <b>rear</b> pointer.</p>",
    },
    {
        contentType: 'image',
        content: {
            html: '<img src="https://www.jquery-az.com/html/images/banana.jpg" title="Title of image" alt="alt text here"/>',
            sourcePath: 'https://media.geeksforgeeks.org/wp-content/uploads/geek-queue-1.png',
            title: 'Queue Data Structure',
            caption: 'An operation with a queue data structure.',
            size: 'md'
        }
    },
    {
        contentType: 'text',
        content: "<h2>Review</h2>",
    },
    {
        contentType: 'text',
        content: "<p>Answer the following questions to review your progress!</p>",
    },
    {
        contentType: 'MC',
        content: {
            question: 'Which of the following is an attribute of a stack data structure?',
            correctAnswer: 0,
            answers: [
                {
                    id: 0,
                    text: 'Stacks have push() and pop() methods'
                },
                {
                    id: 1,
                    text: 'Stacks are First In First Out (FIFO)'
                },
                {
                    id: 2,
                    text: 'A real life example is people in line for a buffet or any other line'
                },
                {
                    id: 3,
                    text: 'A random wrong answer'
                },
            ]
        }
    },
    {
        contentType: 'MC',
        content: {
            question: 'Which of the following is an attribute of a queue data structure?',
            correctAnswer: 2,
            answers: [
                {
                    id: 0,
                    text: 'Most queue operations are O(n) complexity'
                },
                {
                    id: 1,
                    text: 'Queues are non-linear data structures'
                },
                {
                    id: 2,
                    text: 'Queues are First In First Out (FIFO)'
                },
            ]
        }
    },
]