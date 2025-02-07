<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Owl Game Embed</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        canvas {
            background-color: #f0f0f0;
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas"></canvas>
    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Load owl image
        const owlImage = new Image();
        owlImage.src = 'https://example.com/owl.png';  // Replace with your owl image URL
        let owlWidth = 50;  // Adjust the size of the owl
        let owlHeight = 50;

        let player = {
            x: canvas.width / 2,
            y: canvas.height - 60,
            width: owlWidth,
            height: owlHeight,
            dx: 0
        };

        let blocks = [];
        let blockSpeed = 3;
        let gameOver = false;

        function drawPlayer() {
            ctx.drawImage(owlImage, player.x - owlWidth / 2, player.y - owlHeight / 2, owlWidth, owlHeight);
        }

        function drawBlocks() {
            for (let i = 0; i < blocks.length; i++) {
                let block = blocks[i];
                ctx.beginPath();
                ctx.rect(block.x, block.y, block.width, block.height);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();
            }
        }

        function movePlayer() {
            if (player.dx > 0 && player.x + player.width / 2 < canvas.width) {
                player.x += player.dx;
            } else if (player.dx < 0 && player.x - player.width / 2 > 0) {
                player.x += player.dx;
            }
        }

        function spawnBlock() {
            let blockWidth = Math.random() * 50 + 20;
            let blockHeight = 20;
            let blockX = Math.random() * (canvas.width - blockWidth);
            blocks.push({ x: blockX, y: 0, width: blockWidth, height: blockHeight });
        }

        function moveBlocks() {
            for (let i = 0; i < blocks.length; i++) {
                let block = blocks[i];
                block.y += blockSpeed;

                if (block.y > canvas.height) {
                    blocks.splice(i, 1);
                    i--;
                }

                if (block.y + block.height > player.y - owlHeight / 2 &&
                    block.x < player.x + owlWidth / 2 &&
                    block.x + block.width > player.x - owlWidth / 2) {
                    gameOver = true;
                }
            }
        }

        function update() {
            if (gameOver) {
                ctx.font = "30px Arial";
                ctx.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawPlayer();
            drawBlocks();
            movePlayer();
            moveBlocks();
            requestAnimationFrame(update);
        }

        function controlPlayer(event) {
            if (event.key === "ArrowRight") {
                player.dx = 5;
            } else if (event.key === "ArrowLeft") {
                player.dx = -5;
            }
        }

        function stopPlayer(event) {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                player.dx = 0;
            }
        }

        document.addEventListener("keydown", controlPlayer);
        document.addEventListener("keyup", stopPlayer);

        setInterval(spawnBlock, 1000);
        update();
    </script>
</body>
</html>
