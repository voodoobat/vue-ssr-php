<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue SSR</title>
</head>
<body>
    <div id="app">
        <?php echo $component ?>
    </div>
    <script src="/<?php echo $assets['src/main.ts']['file'] ?>"></script>
</body>
</html>
