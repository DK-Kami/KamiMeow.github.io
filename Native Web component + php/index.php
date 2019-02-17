<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"\>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>First App</title>
  <style>
    body,
    html,
    div,
    section {
      background-color: #EFEFEF !important;
      color: #333 !important;
    }

    section {
      height: 120vh;
      width: 100%;
      overflow: hidden;
      padding: 0 100px
    }
    section div {
      padding-top: 5vh;
    }

    .two,
    .two div {
      background-color: #CECECE !important;
    }

    .display-3 {
      color: #111 !important;
      cursor: default;
      user-select: none;
    }
    .start-text {
      color: teal !important;
      font-size: 18px;
    }

    .main-img-container { 
      height: 100vh; 
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .img-container { 
      height: 50vh;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .slide-img {
      box-shadow: 0 0 20px 5px #999;
      height: 50vh;
    }
    .under-img,
    .under-img div {
      background-color: transparent !important;
    }
    .under-img {
      margin-top: -100vh;
      padding-top: 35vh;
      height: 100vh;
      background-color: rgba(255, 255, 255, 0.5) !important;
    }
    .subheading {
      color: #EFEFEF !important;
    }

    .btn {
      padding: 10px 0 !important;
    }
    .btn a,
    .btn a:hover,
    .btn a:visited {
      padding: 15px 30px;
      text-decoration: none;
      color: inherit
    }

    #top-img {
      background-image: url("assets/bot.jpg");
      filter: blur(1px);
    }
    #bot-img {
      background-image: url("assets/top.jpg");
      filter: blur(1px);
    }
    #slide-1 {
      background-image: url("assets/slide-4.jpg");
    }
    #slide-2 {
      background-image: url("assets/slide-2.jpg");
    }
    #slide-3 {
      background-image: url("assets/slide-3.jpg");
    }
    #slide-4 {
      background-image: url("assets/slide-1.jpg");
    }
  </style>
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  
  <div class="container-fluid px-0">
    <div id="top-img" class="main-img-container"></div>
    <div class="container-fluid no-gutters under-img">
      <div class="justify-content-center column">
        <div class="col-auto text-center mb-5">
          <h2 class="subheading">Домашнее задание по дисциплине<br>"Инфокоммуникационные системы и сети"</h2>
        </div>
        <div class="col-auto text-center">
          <button class="btn btn-dark subheading">
            <a href="./comments">Оставить отзыв</a>
          </button>
        </div>
      </div>
    </div>

    <a name="href-slide-1"></a>
    <section>
      <div class="row justify-content-between px-5">
        <div class="col-12">
          <h2 class="display-3 my-5 text-center">Lorem, ipsum dolor.</h2>
        </div>
        <div class="col-6 pt-5">
          <p><span class="start-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span> <b>Unde tempora</b> -  vero facere illum ullam sequi natus est voluptatum dolorem. Illo beatae alias nobis! Eaque modi recusandae corrupti in, voluptatibus consectetur impedit, illum, ullam eveniet dicta ipsa. Nisi totam, doloribus laborum natus ab dolores veritatis, <u>consequuntur</u> a ipsa reprehenderit laudantium corporis optio tenetur voluptatum ipsum et voluptatem tempore odit fuga quae eveniet rerum cupiditate, ullam debitis? Error similique corrupti velit eveniet, dolore est cupiditate placeat earum, <i>deserunt, harum ab</i>! Pariatur dolore magnam possimus similique quod.</p>
          <a href="#href-slide-2">Вниз</a>
        </div>
        <div id="slide-1" class="img-container col-5 mt-5 slide-img"></div>
      </div>
    </section>

    <a name="href-slide-2"></a>
    <section class="two">
      <div class="row justify-content-between px-5">
        <div class="col-12">
          <h2 class="display-3 my-5 text-center">Lorem, ipsum dolor.</h2>
        </div>
        <div id="slide-2" class="img-container col-5 mt-5 slide-img"></div>
        <div class="col-6 pt-5">
          <p><span class="start-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span> <b>Unde tempora</b> -  vero facere illum ullam sequi natus est voluptatum dolorem. Illo beatae alias nobis! Eaque modi recusandae corrupti in, voluptatibus consectetur impedit, illum, ullam eveniet dicta ipsa. Nisi totam, doloribus laborum natus ab dolores veritatis, <u>consequuntur</u> a ipsa reprehenderit laudantium corporis optio tenetur voluptatum ipsum et voluptatem tempore odit fuga quae eveniet rerum cupiditate, ullam debitis? Error similique corrupti velit eveniet, dolore est cupiditate placeat earum, <i>deserunt, harum ab</i>! Pariatur dolore magnam possimus similique quod.</p>
          <a href="#href-slide-3">Вниз</a>
        </div>
      </div>
    </section>

    <a name="href-slide-3"></a>
    <section>
      <div class="row justify-content-between px-5">
        <div class="col-12">
          <h2 class="display-3 my-5 text-center">Lorem, ipsum dolor.</h2>
        </div>
        <div class="col-6 pt-5">
          <p><span class="start-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span> <b>Unde tempora</b> -  vero facere illum ullam sequi natus est voluptatum dolorem. Illo beatae alias nobis! Eaque modi recusandae corrupti in, voluptatibus consectetur impedit, illum, ullam eveniet dicta ipsa. Nisi totam, doloribus laborum natus ab dolores veritatis, <u>consequuntur</u> a ipsa reprehenderit laudantium corporis optio tenetur voluptatum ipsum et voluptatem tempore odit fuga quae eveniet rerum cupiditate, ullam debitis? Error similique corrupti velit eveniet, dolore est cupiditate placeat earum, <i>deserunt, harum ab</i>! Pariatur dolore magnam possimus similique quod.</p>
          <a href="#href-slide-4">Вниз</a>
        </div>
        <div id="slide-3" class="img-container col-5 mt-5 slide-img"></div>
      </div>
    </section>

    <a name="href-slide-4"></a>
    <section class="two">
      <div class="row justify-content-between px-5">
        <div class="col-12">
          <h2 class="display-3 my-5 text-center">Lorem, ipsum dolor.</h2>
        </div>
        <div id="slide-4" class="img-container col-5 mt-5 slide-img"></div>
        <div class="col-6 pt-5">
          <p><span class="start-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span> <b>Unde tempora</b> -  vero facere illum ullam sequi natus est voluptatum dolorem. Illo beatae alias nobis! Eaque modi recusandae corrupti in, voluptatibus consectetur impedit, illum, ullam eveniet dicta ipsa. Nisi totam, doloribus laborum natus ab dolores veritatis, <u>consequuntur</u> a ipsa reprehenderit laudantium corporis optio tenetur voluptatum ipsum et voluptatem tempore odit fuga quae eveniet rerum cupiditate, ullam debitis? Error similique corrupti velit eveniet, dolore est cupiditate placeat earum, <i>deserunt, harum ab</i>! Pariatur dolore magnam possimus similique quod.</p>
          <a href="#href-slide-1">Вверх</a>
        </div>
      </div>
    </section>

    <div id="bot-img" class="main-img-container"></div>
    <div class="container-fluid no-gutters under-img">
      <div class="justify-content-center column">
        <div class="col-auto text-center mb-5">
          <h2 class="subheading">Нажмите на кнопку ниже,<br> чтобы оставить свой отзыв</h2>
        </div>
        <div class="col-auto text-center">
          <button class="btn btn-outline-dark subheading">
            <a href="./comments">Оставить отзыв</a>
          </button>
        </div>
      </div>
    </div>
  </div>

</body>
<script src="js/jq.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/main.js"></script>
</html>