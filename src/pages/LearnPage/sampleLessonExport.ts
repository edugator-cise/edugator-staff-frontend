export const sampleLessonExport = [
    {
        "title": "Test2",
        "author": "Bobby",
        "visibility": "private",
        "date": "4/16/2022"
      },
      {
        "type": "text",
        "content": {
          "html": "<p><span style=\"font-size: 14px;font-family: Times New Roman;\">TopLine</span></p>\n<p></p>\n"
        }
      },
      {
        "type": "image",
        "content": {
          "sourcePath": "https://i.imgur.com/BSd4Vdu.gif",
          "height": "300px",
          "width": "300px",
          "alignment": "none"
        }
      },
      {
        "type": "text",
        "content": {
          "html": "\n<p></p>\n<pre>console.log(data)</pre>\n<h3>Hello</h3>\n<p></p>\n"
        }
      },
      {
        "type": "MC",
        "content": {
          "question": "Q",
          "correctAnswer": 4,
          "answers": [
            {
              "id": 0,
              "text": "A) Answer1"
            },
            {
              "id": 1,
              "text": "B) Answer2"
            },
            {
              "id": 2,
              "text": "C) Answer3"
            },
            {
              "id": 3,
              "text": "D) Correct"
            }
          ]
        }
      },
      {
          "type": "MS",
          "content": {
              "question": "This is a multiple select problem! Pick all answers.",
              "correctAnswers": [1, 2, 4],
              "answers": [
                  {
                      "id": 0,
                      "text": "This is a correct answer"
                  },
                  {
                      "id": 1,
                      "text": "This is a correct answer"
                  },
                  {
                      "id": 2,
                      "text": "This is an incorrect answer"
                  },
                  {
                      "id": 3,
                      "text": "This is a correct answer"
                  },
                  {
                      "id": 4,
                      "text": "This is an incorrect answer"
                  },
              ]
          }
      }
]