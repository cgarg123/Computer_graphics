var canvas = document.getElementById("ghostCanvas");
        var ctx = canvas.getContext("2d");

        // Constants for main ghost body
        var HEAD_RADIUS = 35;
        var BODY_WIDTH = HEAD_RADIUS * 2;
        var BODY_HEIGHT = 60;
        var FOOT_RADIUS;
        var NUM_FEET;

        // Constants for eyes
        var PUPIL_RADIUS = 4;
        var PUPIL_LEFT_OFFSET = 8;
        var PUPIL_RIGHT_OFFSET = 20;
        var PUPIL_HEIGHT_OFFSET = 3;
        var EYE_RADIUS = 10;
        var EYE_OFFSET = 14;

        // Array to store ghost objects
        var ghosts = [
            { x: 200, y: 200, color: "red", feetColor: "purple" },
            { x: 100, y: 100, color: "green", feetColor: "orange" },
            { x: 300, y: 200, color: "black", feetColor: "yellow" },
            { x: 40, y: 300, color: "orange", feetColor: "black" },
            { x: 300, y: 50, color: "yellow", feetColor: "green" },
            { x: 400, y: 400, color: "blue", feetColor: "pink" },
            { x: 500, y: 100, color: "purple", feetColor: "yellow" },
            { x: 600, y: 300, color: "green", feetColor: "orange" },
            // Add more ghosts here
            { x: 100, y: 400, color: "orange", feetColor: "blue" },
            { x: 700, y: 200, color: "yellow", feetColor: "green" },
            { x: 200, y: 500, color: "pink", feetColor: "purple" },
            { x: 600, y: 100, color: "cyan", feetColor: "red" }
        ];

        // Draw a single ghost
        function drawGhost(x, y, color, feetColor) {
            NUM_FEET = Math.floor(Math.random() * 10) + 1;
            FOOT_RADIUS = (BODY_WIDTH) / (NUM_FEET * 2);

            // Draw body and feet
            for (var i = 0; i < NUM_FEET; i++) {
                var start = -NUM_FEET + 1 + (i * 2);
                drawCircle(FOOT_RADIUS, feetColor, x + start * FOOT_RADIUS, y + BODY_HEIGHT);
            }

            drawCircle(HEAD_RADIUS, color, x, y);
            drawRect(BODY_WIDTH, BODY_HEIGHT, color, x - BODY_WIDTH / 2, y);

            // Draw eyes and pupils
            drawCircle(EYE_RADIUS, "white", x - EYE_OFFSET, y);
            drawCircle(EYE_RADIUS, "white", x + EYE_OFFSET, y);
            drawCircle(PUPIL_RADIUS, "blue", x - PUPIL_LEFT_OFFSET, y - PUPIL_HEIGHT_OFFSET);
            drawCircle(PUPIL_RADIUS, "blue", x + PUPIL_RIGHT_OFFSET, y + PUPIL_HEIGHT_OFFSET);
        }

        // Draw circle
        function drawCircle(radius, color, x, y) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }

        // Draw rectangle
        function drawRect(width, height, color, x, y) {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
        }

        // Draw all ghosts initially
        ghosts.forEach(ghost => {
            drawGhost(ghost.x, ghost.y, ghost.color, ghost.feetColor);
        });

        // Add event listener for mouse clicks
        canvas.addEventListener("click", function(event) {
            var mouseX = event.clientX - canvas.getBoundingClientRect().left;
            var mouseY = event.clientY - canvas.getBoundingClientRect().top;

            // Check if mouse click occurred within bounding box of any ghost
            ghosts.forEach(ghost => {
                if (
                    mouseX >= ghost.x - BODY_WIDTH / 2 &&
                    mouseX <= ghost.x + BODY_WIDTH / 2 &&
                    mouseY >= ghost.y &&
                    mouseY <= ghost.y + BODY_HEIGHT
                ) {
                    // Change color of the clicked ghost
                    ghost.color = getRandomColor();
                    ghost.feetColor = getRandomColor();
                    // Clear canvas and redraw all ghosts
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ghosts.forEach(ghost => {
                        drawGhost(ghost.x, ghost.y, ghost.color, ghost.feetColor);
                    });
                }
            });
        });

        // Function to generate a random color
        function getRandomColor() {
            var letters = "0123456789ABCDEF";
            var color = "#";
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }