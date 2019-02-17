<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Your comments</title>
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <script src="../js/components/CardComments.js"></script>
  <style>
  .card-body {
    padding: 10px 0;
  }
  .card-title {
    font-size: 20px;
    margin-bottom: -5px;
    padding: 0 10px;
  }
  .card-subtitle {
    font-size: 14px;
    color: #999;
    padding: 0 10px;
    margin-bottom: -10px;
  }
  .card-text {
    margin: -10px 0;
    padding: 0 10px;

  }
  </style>
</head>
<body>
  <div class="container mt-5">
    <div class="row">
      <div class="col-6 offset-3 text-center">
        <form action="" method="post" class="text-left">
          <div class="row my-1">
            <div class="col-3">Имя:</div>
            <div class="col">
              <input name="name" type="text" class="form-control" required/>
            </div>
          </div>
          <div class="row my-1">
            <div class="col-3">Город:</div>
            <div class="col">
              <input name="city" type="text" class="form-control">
            </div>
          </div>
          <div class="row my-1">
            <div class="col-3">E-Mail:</div>
            <div class="col">
              <input name="email" type="email" class="form-control">
            </div>
          </div>
          <div class="row my-1">
            <div class="col-3">URL:</div>
            <div class="col">
              <input name="url" type="text" class="form-control">
            </div>
          </div>
          <div class="row my-1">
            <div class="col-3">Сообщение:</div>
            <div class="col">
              <textarea name="message" type="text" class="form-control" required></textarea>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Добавить</button>
        </form>
      </div>
    </div>
    <hr>
    <div class="col-12">
      <x-spander>
      <div class="card">
          <div class="card-body">
            <?php
              $name     = array_key_exists('name', $_POST)
                ? $_POST['name']
                : 'No name';
              $email    = array_key_exists('email', $_POST)
                ? $_POST['email']
                : '';
              $city     = array_key_exists('city', $_POST)
                ? ' (г. '.$_POST['city'].')'
                : '';
              $message  = array_key_exists('message', $_POST)
                ? $_POST['message']
                : '<i>no message</i>';

              echo "
                <div class='card-title'>$name</div>
                <div class='card-subtitle'>
                  $email
                  $city
                </div>
                <hr>
                <div class='card-text'>
                  $message
                </div>";
            ?>
          </div>
        </div>        
      </x-spander>
      
    </div>
  </div>
</body>
<script src="../js/jq.js"></script>
<script src="../js/bootstrap.bundle.min.js"></script>
<script src="../js/index.js"></script>
<script src="../js/components/XSpander.js"></script>
</html>