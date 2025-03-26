const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000, host: "0.0.0.0" });

let players = [];
console.log("WebSocket server running on ws://YOUR_LOCAL_IP:3000");

// C Programming Questions Database (Formatted as Code)
const questionBank = {
  gun1: [
    [
      "int x = 5;",
      "printf(\"%d\", x + 3);",
      "// What will be printed?"
    ],
    [
      "What function is used to print output in C?"
    ],
    [
      "What symbol is used to indicate a single line comment in C?"
    ],
    [
      "Which of the following is NOT a valid variable name in C?",
      "A) my_var",
      "B) 2ndVariable",
      "C) _temp",
      "D) value_1"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "int a = 10;",
      "int b = 2;",
      "printf(\"%d\", a*b);",
      "return 0;",
      "}",
      "//What is the output of the following C code?"
    ],
    [
      "Which operator is used for assignment in C?"
    ],
    [
      "How many times will the following loop execute?",
      "int i = 1;",
      "while (i <= 5) {",
      "printf(\"%d\", i);",
      "i++;",
      "}"
    ],

    [
    "#include <stdio.h>",
    "int main() {",
    "    printf(\"Hello, World!\");",
    "    return 0;",
    "}",
    "// What will this program output?"
    ],
    [
      "How do you declare a constant in C?",
        "A) #define PI 3.14",
        "B) constant PI = 3.14;",
        "C) const PI = 3.14;",
        "D) Both A and C"
    ],
    [
      "What is the purpose of the main() function in a C program?",
      "a) It defines the structure of the program.",
      "b) It is where the program execution begins.",
      "c) It handles input/output operations.",
      "d) It declares variables."
    ],
    [
      "Which loop is best when the number of iterations is known?"
    ],
    [
      "What will the following for loop output?"
    ],
    
    [
      "int a = 10, b = 20;",
      "int temp = a;",
      "a = b;",
      "b = temp;",
      "printf(\"%d %d\", a, b);",
      "// What is the output?"
    ],

  ],
  gun2: [
    [
      "for(int i = 1; i <= 5; i++) {",
      "    printf(\"%d \", i);",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "int a = 10, b = 5;",
      "printf(\"%d\", a++ + b);",
      "return 0;", 
      "}",
      "//What will be the output of the following C code?"
    ],
    [
      "What is the purpose of the return statement in a C function?",
      "A) To terminate the program execution.",
      "B) To jump to the beginning of the function.",
      "C) To return a value from the function to the calling function.",
      "D) To declare a variable."
    ],
    [
      "What is the result of bitwise XOR (^) operation between 5 and 3 in C?"
    ],
    [
      "#include <stdio.h>",
      "int main () {",
      "int x = 5;",
      "int y = (x++) + (++x);",
      "printf(\"%d\", y);",
      "return 0;",
      "}"
    ],
    [
      "What is the scope of a global variable in C?",
        "A) It is limited to the function in which it is declared.",
        "B) It is limited to the block in which it is declared.",
        "C) It is limited to the file in which it is declared.",
        "D) It is limited to the program in which it is declared."
    ],
    [
      "#include <stdio.h>",
        "void solve() {",
            "int first = 10, second = 20;",
            "int third = first + second;",
            "{",
                "int third = second - first;",
                "printf(\"%d\", third);",
            "}",
            "printf(\"%d\", third);",
        "}",
        "int main() {",
          "solve();",
          "return 0;",
        "}"
    ],
    [
      "10. Which of the following is not a logical operator?",
      "A) &&    B) !",
      "C) || D) |"
    ],
    [
      "int arr[] = {1, 2, 3, 4, 5};",
      "printf(\"%d\", arr[2]);",
      "// What is the output?"
    ],
    [
      "void func(int n) {",
      "    printf(\"%d\", n * 2);",
      "}",
      "int main() {",
      "    func(5);",
      "    return 0;",
      "}",
      "// What will this program output?"
    ]
  ],
  gun3: [
    [
      "#include <stdio.h>",
      "int main() {",
      "    int x = 10;",
      "    if (x > 5) {",
      "        x += 5;",
      "    } else {",
      "        x -= 5;",
      "    }",
      "    printf(\"%d\", x);",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "    int a = 5, b = 10;",
      "    int c = (a > b) ? a : b;",
      "    printf(\"%d\", c);",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "    int i;",
      "    for (i = 0; i < 5; i++) {",
      "        if (i == 3) {",
      "            continue;",
      "        }",
      "        printf(\"%d \", i);",
      "    }",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "void func(int *a) {",
      "    *a = 10;",
      "}",
      "int main() {",
      "    int x = 5;",
      "    func(&x);",
      "    printf(\"%d\", x);",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "    int arr[] = {1, 2, 3, 4, 5};",
      "    int *p = arr;",
      "    printf(\"%d\", *(p + 3));",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "    int x = 0;",
      "    x = x++ + ++x;",
      "    printf(\"%d\", x);",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "    int a = 5;",
      "    int b = a << 2;",
      "    printf(\"%d\", b);",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "    int x = 5;",
      "    int y = x & 3;",
      "    printf(\"%d\", y);",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "    int a = 5, b = 3;",
      "    int c = a ^ b;",
      "    printf(\"%d\", c);",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "    int x = 5;",
      "    x += x *= x -= 3;",
      "    printf(\"%d\", x);",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "    int i = 0;",
      "    while (i < 3) {",
      "        printf(\"%d \", i);",
      "        i++;",
      "    }",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "    int a = 5;",
      "    int b = 2;",
      "    int c = a / b;",
      "    printf(\"%d\", c);",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "    int a = 5;",
      "    int b = 2;",
      "    float c = (float)a / b;",
      "    printf(\"%.2f\", c);",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "    int x = 5;",
      "    int y = 10;",
      "    int *p = &x;",
      "    int *q = &y;",
      "    *p = *q;",
      "    printf(\"%d %d\", x, y);",
      "    return 0;",
      "}",
      "// What will be printed?"
    ],
    [
      "#include <stdio.h>",
      "int main() {",
      "    int x = 5;",
      "    int y = 10;",
      "    int *p = &x;",
      "    p = &y;",
      "    *p = 20;",
      "    printf(\"%d %d\", x, y);",
      "    return 0;",
      "}",
      "// What will be printed?"
    ]
  ]
};
// Copy of available questions (to prevent repetition)
let availableQuestions = {
  gun1: [...questionBank.gun1],
  gun2: [...questionBank.gun2],
  gun3: [...questionBank.gun3]
};

// Function to get a random question without repetition
function getQuestionForGun(gun, availableQuestions) {
  if (availableQuestions[gun].length === 0) {
    availableQuestions[gun] = [["You are exhausted of this level difficulty questions. Kindly move on to the next or previous difficulty level."]]; // To stop looping of the questions
  }

  const randomIndex = Math.floor(Math.random() * availableQuestions[gun].length);
  return availableQuestions[gun].splice(randomIndex, 1)[0]; // Return question as an array
}

// Correct Answers Database
const correctAnswers = {
  "int x = 5;\nprintf(\"%d\", x + 3);\n// What will be printed?": "8",
  "What function is used to print output in C?": "printf",
  "What symbol is used to indicate a single line comment in C?": "//",
  "Which of the following is NOT a valid variable name in C?\nA) my_var\nB) 2ndVariable\nC) _temp\nD) value_1": "B",
  "#include <stdio.h>\nint main() {\nint a = 23;\nint b = 23;\nprintf(\"%d\", a*b);\nreturn 0;\n}\n//What is the output of the following C code?": "529",
  "Which operator is used for assignment in C?": "=",
  "How many times will the following loop execute?\nint i = 1;\nwhile (i <= 5) {\nprintf(\"%d\", i);\ni++;\n}": "5",
  "#include <stdio.h>\nint main() {\n    printf(\"Hello, World!\");\n    return 0;\n}\n// What will this program output?": "Hello, World!",
  "How do you declare a constant in C?\nA) #define PI 3.14\nB) constant PI = 3.14;\nC) const PI = 3.14;\nD) Both A and C": "D",
  "What is the purpose of the main() function in a C program?\na) It defines the structure of the program.\nb) It is where the program execution begins.\nc) It handles input/output operations.\nd) It declares variables.": "b",
  "Which loop is best when the number of iterations is known?": "for loop",
  "What will the following for loop output?": "Depends on the loop content",
  "int a = 10, b = 20;\nint temp = a;\na = b;\nb = temp;\nprintf(\"%d %d\", a, b);\n// What is the output?": "20 10",


  "for(int i = 1; i <= 5; i++) {\n    printf(\"%d \", i);\n}\n// What will be printed?": "1 2 3 4 5",
  "#include <stdio.h>\nint main() {\nint a = 10, b = 5;\nprintf(\"%d\", a++ + b);\nreturn 0;\n}\n//What will be the output of the following C code?": "15",
  "What is the purpose of the return statement in a C function?\nA) To terminate the program execution.\nB) To jump to the beginning of the function.\nC) To return a value from the function to the calling function.\nD) To declare a variable.": "C",
  "What is the result of bitwise XOR (^) operation between 5 and 3 in C?": "6",
  "#include <stdio.h>\nint main () {\nint x = 5;\nint y = (x++) + (++x);\nprintf(\"%d\", y);\nreturn 0;\n}": "12",
  "What is the scope of a global variable in C?\nA) It is limited to the function in which it is declared.\nB) It is limited to the block in which it is declared.\nC) It is limited to the file in which it is declared.\nD) It is limited to the program in which it is declared.": "D",
  "#include <stdio.h>\nvoid solve() {\n    int first = 10, second = 20;\n    int third = first + second;\n    {\n        int third = second - first;\n        printf(\"%d\", third);\n    }\n    printf(\"%d\", third);\n}\nint main() {\n    solve();\n    return 0;\n}": "10 30",
  "10. Which of the following is not a logical operator?\nA) &&    B) !\nC) || D) |": "D",
  "int arr[] = {1, 2, 3, 4, 5};\nprintf(\"%d\", arr[2]);\n// What is the output?": "3",
  "void func(int n) {\n    printf(\"%d\", n * 2);\n}\nint main() {\n    func(5);\n    return 0;\n}\n// What will this program output?": "10",
  "void swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\nint main() {\n    int x = 3, y = 7;\n    swap(&x, &y);\n    printf(\"%d %d\", x, y);\n    return 0;\n}\n// What is the output?": "7 3",
  "int *ptr;\nprintf(\"%d\", *ptr);\n// What will happen?": "Undefined behavior or segmentation fault",
  "int a = 5, b = 10;\nint *p1 = &a, *p2 = &b;\nprintf(\"%d\", *p1 + *p2);\n// What is the output?": "15",

  "#include <stdio.h>\nint main() {\n    int x = 10;\n    if (x > 5) {\n        x += 5;\n    } else {\n        x -= 5;\n    }\n    printf(\"%d\", x);\n    return 0;\n}\n// What will be printed?": "15",
  "#include <stdio.h>\nint main() {\n    int a = 5, b = 10;\n    int c = (a > b) ? a : b;\n    printf(\"%d\", c);\n    return 0;\n}\n// What will be printed?": "10",
  "#include <stdio.h>\nint main() {\n    int i;\n    for (i = 0; i < 5; i++) {\n        if (i == 3) {\n            continue;\n        }\n        printf(\"%d \", i);\n    }\n    return 0;\n}\n// What will be printed?": "0 1 2 4",
  "#include <stdio.h>\nvoid func(int *a) {\n    *a = 10;\n}\nint main() {\n    int x = 5;\n    func(&x);\n    printf(\"%d\", x);\n    return 0;\n}\n// What will be printed?": "10",
  "#include <stdio.h>\nint main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    int *p = arr;\n    printf(\"%d\", *(p + 3));\n    return 0;\n}\n// What will be printed?": "4",
  "#include <stdio.h>\nint main() {\n    int x = 0;\n    x = x++ + ++x;\n    printf(\"%d\", x);\n    return 0;\n}\n// What will be printed?": "2",
  "#include <stdio.h>\nint main() {\n    int a = 5;\n    int b = a << 2;\n    printf(\"%d\", b);\n    return 0;\n}\n// What will be printed?": "20",
  "#include <stdio.h>\nint main() {\n    int x = 5;\n    int y = x & 3;\n    printf(\"%d\", y);\n    return 0;\n}\n// What will be printed?": "1",
  "#include <stdio.h>\nint main() {\n    int a = 5, b = 3;\n    int c = a ^ b;\n    printf(\"%d\", c);\n    return 0;\n}\n// What will be printed?": "6",
  "#include <stdio.h>\nint main() {\n    int x = 5;\n    x += x *= x -= 3;\n    printf(\"%d\", x);\n    return 0;\n}\n// What will be printed?": "14",
  "#include <stdio.h>\nint main() {\n    int i = 0;\n    while (i < 3) {\n        printf(\"%d \", i);\n        i++;\n    }\n    return 0;\n}\n// What will be printed?": "0 1 2",
  "#include <stdio.h>\nint main() {\n    int a = 5;\n    int b = 2;\n    int c = a / b;\n    printf(\"%d\", c);\n    return 0;\n}\n// What will be printed?": "2",
  "#include <stdio.h>\nint main() {\n    int a = 5;\n    int b = 2;\n    float c = (float)a / b;\n    printf(\"%.2f\", c);\n    return 0;\n}\n// What will be printed?": "2.50",
  "#include <stdio.h>\nint main() {\n    int x = 5;\n    int y = 10;\n    int *p = &x;\n    int *q = &y;\n    *p = *q;\n    printf(\"%d %d\", x, y);\n    return 0;\n}\n// What will be printed?": "10 10",
  "#include <stdio.h>\nint main() {\n    int x = 5;\n    int y = 10;\n    int *p = &x;\n    p = &y;\n    *p = 20;\n    printf(\"%d %d\", x, y);\n    return 0;\n}\n// What will be printed?": "5 20"
};

// Handle new WebSocket connections
wss.on("connection", (ws) => {
  ws.id = Math.random().toString(36).substr(2, 9);
  players.push({ id: ws.id, name: `Player ${players.length + 1}`, health: 200, canShoot: false });

  // Initialize availableQuestions for this player
  ws.availableQuestions = {
    gun1: [...questionBank.gun1],
    gun2: [...questionBank.gun2],
    gun3: [...questionBank.gun3]
  };

  // Send updated player list to all clients
  broadcast({ type: "playerUpdate", players });

  // Handle incoming messages
  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "setName") {
      const player = players.find((p) => p.id === ws.id);
      if (player) player.name = data.name;
      broadcast({ type: "playerUpdate", players });
    }

    if (data.type === "selectGun") {
      ws.selectedGun = data.gun;
      const question = getQuestionForGun(data.gun, ws.availableQuestions);
      ws.currentQuestion = question.join("\n"); // Convert array to string
      ws.send(JSON.stringify({ type: "question", question }));
    }

    if (data.type === "submitAnswer") {
      const questionKey = ws.currentQuestion; // Already stored as a string
      const correct = correctAnswers[questionKey] === data.answer;

      if (correct) {
        const player = players.find((p) => p.id === ws.id);
        if (player) player.canShoot = true;
      }

      ws.send(JSON.stringify({ type: "answerResult", correct }));
    }

    if (data.type === "shoot") {
      const shooter = players.find((p) => p.id === ws.id);
      const target = players.find((p) => p.id === data.targetId);

      if (!shooter || !target) return;

      if (!shooter.canShoot) {
        ws.send(JSON.stringify({ type: "error", message: "You must answer correctly before shooting!" }));
        return;
      }

      shooter.canShoot = false; // Reset after shooting
      let damage = data.gun === "gun1" ? 5 : data.gun === "gun2" ? 15 : 35;
      target.health -= damage;

      console.log(`Player ${shooter.id} shot ${target.id} (-${damage} HP)`);

      if (target.health <= 0) {
        console.log(`Player Eliminated: ${target.name}`);
        players = players.filter((p) => p.id !== target.id);
        broadcast({ type: "playerEliminated", playerId: target.id });
      }

      broadcast({ type: "playerUpdate", players });
    }
  });

  ws.on("close", () => {
    players = players.filter((p) => p.id !== ws.id);
    broadcast({ type: "playerUpdate", players });
  });
});
// Function to broadcast messages to all clients
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}