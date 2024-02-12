<?php
    session_start();
    session_unset();
    session_destroy();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Prof. Dux: Personalized AI-Powered Learning Facilitator</title>
  <meta
    content="Prof. Dux is an AI-powered learning platform that provides personalized learning experiences for students of all levels. With Prof. Dux, students can learn at their own pace and focus on the topics that are most relevant to them"
    name="description">
  <meta
    content="personalized learning, AI-powered learning, online learning, distance learning, self-paced learning, adaptive learning, gamified learning, virtual instructor, collaboration tools"
    name="keywords">

  <!-- Favicons -->
  <link href="assets/img/favicon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link
    href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
    rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
  <!-- Vendor CSS Files -->
  <link href="assets/vendor/animate.css/animate.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="assets/vendor/style.css" rel="stylesheet">

  <!-- =======================================================
  * Template Name: Shuffle
  * Updated: Jul 27 2023 with Bootstrap v5.3.1
  * Template URL: https://bootstrapmade.com/bootstrap-3-one-page-template-free-shuffle/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>

<body>

  <!-- ======= Hero Section ======= -->
  <section id="hero">
    <div class="hero-container">
      <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">

        <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

        <div class="carousel-inner" role="listbox">

          <!-- Slide 1 -->
          <div class="carousel-item active" style="background-image: url(assets/img/slide/slide-1.jpg);">
            <div class="carousel-container">
              <div class="carousel-content">
                <h2 class="animate__animated animate__fadeInDown">Welcome to <span
                    style="background-color: blue;">dux</span></h2>
                <p class="animate__animated animate__fadeInUp">The Near East University AI Learning Facilitator</p>
                <a href="auth.php" class="btn-get-started animate__animated animate__fadeInUp scrollto">Get Started</a>
              </div>
            </div>
          </div>

          <!-- Slide 2 -->
          <div class="carousel-item" style="background-image: url(assets/img/slide/slide-2.jpg);">
            <div class="carousel-container">
              <div class="carousel-content">
                <h2 class="animate__animated animate__fadeInDown">Prof. Dux</h2>
                <p class="animate__animated animate__fadeInUp">Helping you Unlock Your Potential and Excel in a
                  Personalized Learning Journey.</p>
                <a href="auth.php" class="btn-get-started animate__animated animate__fadeInUp scrollto">Get Started</a>
              </div>
            </div>
          </div>

          <!-- Slide 3 -->
          <div class="carousel-item" style="background-image: url(assets/img/slide/slide-3.jpg);">
            <div class="carousel-container">
              <div class="carousel-content">
                <h2 class="animate__animated animate__fadeInDown">Meet AI in Higher Education</h2>
                <p class="animate__animated animate__fadeInUp">Engage, Learn, and Succeed in an Interactive and
                  Inclusive Learning Environment.</p>
                <a href="#about" class="btn-get-started animate__animated animate__fadeInUp scrollto">Get Started</a>
              </div>
            </div>
          </div>

        </div>

        <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon bi bi-chevron-double-left" aria-hidden="true"></span>
        </a>

        <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon bi bi-chevron-double-right" aria-hidden="true"></span>
        </a>

      </div>
    </div>
  </section><!-- End Hero -->

  <!-- ======= Header ======= -->
  <header id="header" class="d-flex align-items-center">
    <div class="container d-flex align-items-center justify-content-between">

      <div class="logo">
        <h1 class="text-light"><a href="index.html"><span><img src="assets/dux_logo.png" alt="dux_logo"
                style="height:80px" srcset=""></span></a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
      </div>

      <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
          <li><a class="nav-link scrollto" href="#about">About</a></li>
          <li><a class="nav-link scrollto" href="#services">Features</a></li>
          <li><a class="nav-link scrollto" href="#news">News</a></li>
          <li><a class="nav-link scrollto" href="forum.html">Forum</a></li>
          <!-- <li><a class="nav-link scrollto" href="#portfolio">Portfolio</a></li> -->
          <!-- <li><a class="nav-link scrollto" href="#team">Team</a></li> -->
          <!-- <li class="dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li> -->
          <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->

  <main id="main">

    <!-- ======= About Us Section ======= -->
    <section id="about" class="about">
      <div class="container">

        <div class="section-title">
          <h2>About</h2>
          <p align="justify">Prof. DUX is an AI education facilitator developed by the Institute of Artificial
            Intelligence and Robotics at Near East University. It individualizes education for each student by
            leveraging AI-driven algorithms to analyze learning patterns, pace, and strengths. Prof. DUX fosters
            engagement and communication through real-time participation in online discussions and chats, promoting
            active learning. It employs AI-driven assessment tools that evaluate not only factual recall but also
            critical thinking and problem-solving skills.</p>
        </div>

        <div class="row">
          <div class="col-lg-6">
            <img src="assets/img/about.jpg" class="img-fluid" alt="">
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0 content">
            <h3>AI-Enabled Learning: <strong>Ensuring Success for All Students</strong></h3>
            <p align="justify" class="fst-italic">
              Prof. DUX's effectiveness relies on seamless integration with existing resources,
            </p>
            <p align="justify">
              utilizing an extensive repository of educational materials to enhance comprehension and augment
              coursework. By performing real-time analysis of performance statistics, it can identify areas where
              students are struggling and promptly respond with appropriate interventions, ensuring that students have
              the necessary tools and guidance to overcome challenges and achieve sustainable success in their learning
              journey.
            </p>

            <!-- <div class="skills-content">

              <div class="progress">
                <span class="skill">HTML <i class="val">100%</i></span>
                <div class="progress-bar-wrap">
                  <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>

              <div class="progress">
                <span class="skill">CSS <i class="val">90%</i></span>
                <div class="progress-bar-wrap">
                  <div class="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>

              <div class="progress">
                <span class="skill">JavaScript <i class="val">75%</i></span>
                <div class="progress-bar-wrap">
                  <div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>

              <div class="progress">
                <span class="skill">Photoshop <i class="val">55%</i></span>
                <div class="progress-bar-wrap">
                  <div class="progress-bar" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>

            </div> -->

          </div>
        </div>

      </div>
    </section><!-- End About Us Section -->

    <!-- ======= Counts Section ======= -->
    <section class="counts section-bg">
      <div class="container">

        <div class="row no-gutters">

          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div class="count-box">
              <i class="bi bi-play-circle"></i>
              <span data-purecounter-start="0" data-purecounter-end="12" data-purecounter-duration="1"
                class="purecounter"></span>
              <p align="justify"><strong>Video Lectures:</strong> Every concept is introduced with the aid of a video
                lecture</p>
              <a href="#">Find out more &raquo;</a>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div class="count-box">
              <i class="bi bi-journal-richtext"></i>
              <span data-purecounter-start="0" data-purecounter-end="3" data-purecounter-duration="1"
                class="purecounter"></span>
              <p align="justify"><strong>Information Sources:</strong> Tutoring is based on textbooks, websources and
                chatGPT</p>
              <a href="#">Find out more &raquo;</a>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div class="count-box">
              <i class="bi bi-bar-chart"></i>
              <span data-purecounter-start="0" data-purecounter-end="14" data-purecounter-duration="1"
                class="purecounter"></span>
              <p align="justify"><strong>Performance Statistics:</strong> Statistics per lecture and per semester are
                just clicks away</p>
              <a href="#">Find out more &raquo;</a>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div class="count-box">
              <i class="bi bi-people"></i>
              <span data-purecounter-start="0" data-purecounter-end="1000" data-purecounter-duration="1"
                class="purecounter"></span>
              <p align="justify"><strong>Live chat</strong> Chat with Prof. DUX and other students in a Live chatroom
              </p>
              <a href="#">Find out more &raquo;</a>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Counts Section -->

    <!-- ======= Our Services Section ======= -->
    <section id="services" class="services">
      <div class="container">

        <div class="section-title">
          <h2>Features</h2>
          <p align="justify">Prof. Dux prepares students for the workforce by providing them with the skills and
            knowledge they need to succeed. For example, it can offer courses in coding, data science, and other
            in-demand skills. Additionally, it can provide students with opportunities to collaborate with industry
            professionals and complete real-world projects. This can help students gain the experience they need to land
            a job after graduation</p>
        </div>

        <div class="row">
          <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="icon-box">
              <div class="icon"><i class="bi bi-person"></i></div>
              <h4 class="title"><a href="">Implementing Personalized Learning</a></h4>
              <p class="description">Tailor-made education for every student's unique needs, leveraging AI-driven
                algorithms to analyze learning patterns, pace, and strengths.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="icon-box">
              <div class="icon"><i class="bi bi-chat-dots"></i></div>
              <h4 class="title"><a href="">Enhancing Engagement and Communication</a></h4>
              <p class="description"> Foster active learning through real-time participation in online discussions and
                chats, transcending the constraints of a physical classroom</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="icon-box">
              <div class="icon"><i class="bi bi-check2-square"></i></div>
              <h4 class="title"><a href="">Automated Assessment</a></h4>
              <p class="description">Move beyond traditional exams with AI-driven assessment tools that evaluate
                critical thinking and problem-solving skills, preparing well-rounded graduates</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="icon-box">
              <div class="icon"><i class="bi bi-link"></i></div>
              <h4 class="title"><a href="">Seamless Integration of Resources</a></h4>
              <p class="description">Utilize an extensive repository of educational materials to enhance comprehension
                and augment coursework, ensuring a rich and comprehensive learning experience</p>
            </div>
          </div>

        </div>
        <div class="row">
          <div class="section-title">
            <h2>Tutorial</h2>
          </div>
          <p>Click on the following to download the manual on getting started with dux</p>
          <a href="uploads/dux_tutor.pdf" download>
            <button style="background-color: #007bff; color: #fff; padding: 10px 20px; font-size: 20px; border: none; border-radius: 5px; cursor: pointer;">
                <i class="fas fa-file-download" style="margin-right: 10px;"></i> Download PDF
            </button>
          </a>
        </div>

      </div>
    </section><!-- End Our Services Section -->



    <!-- ======= More Services Section ======= -->
    <section class="more-services section-bg">
      <div class="container">

        <div class="row">
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="card">
              <img src="assets/img/more-service-1.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title"><a href="">Real-Time Adjustments</a></h5>
                <p align="justify" class="card-text">Prof. DUX allows for real-time adjustments based on feedback,
                  identifying areas where students are struggling and promptly responding with appropriate interventions
                </p>
                <a href="#" class="btn">Explore more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="card">
              <img src="assets/img/more-service-2.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title"><a href="">Pedagogical Adaptability</a></h5>
                <p align="justify" class="card-text">Prof. DUX's blend of technical acumen and pedagogical adaptability
                  ensures that students have the necessary tools and guidance to overcome challenges and achieve
                  sustainable success in their learning journey</p>
                <a href="#" class="btn">Explore more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="card">
              <img src="assets/img/more-service-3.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title"><a href="">Comprehensive Learning Experience</a></h5>
                <p align="justify" class="card-text">Prof. DUX utilizes an extensive repository of educational materials
                  to enhance comprehension and augment coursework, contributing to an enriched learning experience</p>
                <a href="#" class="btn">Explore more</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row" style="margin-top: 50px; background-color: aquamarine;">
          <div class="section-title">
            <h2>Tutorial</h2>
          </div>
          <p>Click on the following to download the manual on getting started with dux</p>
          <a href="uploads/dux_tutorial.pdf" download>
            <button style="background-color: #007bff; color: #fff; padding: 10px 20px; font-size: 20px; border: none; border-radius: 5px; cursor: pointer;">
                <i class="fas fa-file-download" style="margin-right: 10px;"></i> Download PDF
            </button>
          </a>
        </div>
      </div>
    </section><!-- End More Services Section -->

    <!-- ======= Info Box Section ======= -->
    <section class="info-box py-0">
      <div class="container-fluid">

        <div class="row">

          <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">

            <div class="content">
              <h3>Data Science <strong>and Machine Learning Technologies</strong></h3>
              <p align="justify">
                Prof DUX uses these technologies to analyze student data and identify patterns. This data can be used to
                improve the learning experience by identifying areas where students need improvement and making
                adjustments to the curriculum accordingly.
              </p>
            </div>

            <div class="accordion-list">
              <ul>
                <li>
                  <a data-bs-toggle="collapse" class="collapse" data-bs-target="#accordion-list-1"><span>01</span>
                    Improved Retention <i class="bx bx-chevron-down icon-show"></i><i
                      class="bx bx-chevron-up icon-close"></i></a>
                  <div id="accordion-list-1" class="collapse show" data-bs-parent=".accordion-list">
                    <p align="justify">
                      Prof. Dux can improve retention by making learning more engaging and effective. For example, Prof.
                      Dux uses spaced repetition techniques to help students remember information for longer periods of
                      time. Additionally, Prof. Dux can use gamification techniques to make learning more fun and
                      rewarding. This can help students stay motivated and engaged in their studies, which can lead to
                      improved retention.
                    </p>
                  </div>
                </li>

                <li>
                  <a data-bs-toggle="collapse" data-bs-target="#accordion-list-2" class="collapsed"><span>02</span>
                    Real-Time Feedback <i class="bx bx-chevron-down icon-show"></i><i
                      class="bx bx-chevron-up icon-close"></i></a>
                  <div id="accordion-list-2" class="collapse" data-bs-parent=".accordion-list">
                    <p align="justify">
                      Prof. Dux can provide students with real-time feedback on their work, which can help them identify
                      areas where they need improvement. This feedback can be delivered through a variety of channels,
                      such as quizzes, graded assignments, and one-on-one tutoring sessions
                    </p>
                  </div>
                </li>

                <li>
                  <a data-bs-toggle="collapse" data-bs-target="#accordion-list-3" class="collapsed"><span>03</span>
                    Cost-effective solution <i class="bx bx-chevron-down icon-show"></i><i
                      class="bx bx-chevron-up icon-close"></i></a>
                  <div id="accordion-list-3" class="collapse" data-bs-parent=".accordion-list">
                    <p align="justify">
                      Prof. Dux is a cost-effective way to deliver education, as it can reduce the need for traditional
                      classroom instruction. This can save schools money, and it can also make education more accessible
                      to students who live in rural areas or who cannot afford to attend a traditional college or
                      university
                    </p>
                  </div>
                </li>

              </ul>
            </div>

          </div>

          <div class="col-lg-5 align-items-stretch order-1 order-lg-2 img"
            style="background-image: url(assets/img/info-box.jpg);">&nbsp;</div>
        </div>

      </div>
    </section><!-- End Info Box Section -->

    <!-- ======= Our Portfolio Section ======= -->
    <!-- <section id="portfolio" class="portfolio section-bg">
      <div class="container">

        <div class="section-title">
          <h2>Our Portfolio</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
        </div>

        <div class="row">
          <div class="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters">
              <li data-filter="*" class="filter-active">All</li>
              <li data-filter=".filter-app">App</li>
              <li data-filter=".filter-card">Card</li>
              <li data-filter=".filter-web">Web</li>
            </ul>
          </div>
        </div>

        <div class="row portfolio-container">

          <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-wrap">
              <iframe src="https://drive.google.com/file/d/1Jp9LrVcuUCoaSaRHhTbH1eR_sb2fdzoS/preview" frameborder="0" allowfullscreen></iframe>
              <div class="portfolio-info">
                <h4>App 1</h4>
                <p>App</p>
              </div>
              <div class="portfolio-links">
                <a href="assets/img/portfolio/portfolio-1.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="App 1"><i class="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web">
            <div class="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-2.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4>Web 3</h4>
                <p>Web</p>
              </div>
              <div class="portfolio-links">
                <a href="assets/img/portfolio/portfolio-2.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 3"><i class="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-3.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4>App 2</h4>
                <p>App</p>
              </div>
              <div class="portfolio-links">
                <a href="assets/img/portfolio/portfolio-3.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="App 2"><i class="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card">
            <div class="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-4.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4>Card 2</h4>
                <p>Card</p>
              </div>
              <div class="portfolio-links">
                <a href="assets/img/portfolio/portfolio-4.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Card 2"><i class="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web">
            <div class="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-5.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4>Web 2</h4>
                <p>Web</p>
              </div>
              <div class="portfolio-links">
                <a href="assets/img/portfolio/portfolio-5.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 2"><i class="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-6.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4>App 3</h4>
                <p>App</p>
              </div>
              <div class="portfolio-links">
                <a href="assets/img/portfolio/portfolio-6.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="App 3"><i class="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card">
            <div class="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-7.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4>Card 1</h4>
                <p>Card</p>
              </div>
              <div class="portfolio-links">
                <a href="assets/img/portfolio/portfolio-7.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Card 1"><i class="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card">
            <div class="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-8.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4>Card 3</h4>
                <p>Card</p>
              </div>
              <div class="portfolio-links">
                <a href="assets/img/portfolio/portfolio-8.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Card 3"><i class="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web">
            <div class="portfolio-wrap">
              <img src="assets/img/portfolio/portfolio-9.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4>Web 3</h4>
                <p>Web</p>
              </div>
              <div class="portfolio-links">
                <a href="assets/img/portfolio/portfolio-9.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="Web 3"><i class="bx bx-plus"></i></a>
                <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>End Our Portfolio Section -->


    <!-- PORTFOLIO -->


    <section id="demos" class="demos">
      <div class="section-title">
        <h2>DEMO VIDEOS</h2>
        <p>Find here a preview of DUX learning management system and interaction with Prof. DUX</p>
      </div>
      <div class="row" style="padding: 30px;">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Course creation</h5>
              <iframe src="https://drive.google.com/file/d/1Jp9LrVcuUCoaSaRHhTbH1eR_sb2fdzoS/preview" frameborder="0"
                allowfullscreen object-fit="cover" width="380" , height="250" allow="autoplay"></iframe>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Course Info update</h5>
              <iframe src="https://drive.google.com/file/d/1ZGfHtJUse9kzt2nv7E3pQfpsKOVK_Niq/preview" width="380"
                height="250" allow="autoplay"></iframe>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Course Management</h5>

              <iframe src="https://drive.google.com/file/d/1cOqEI0s8szoHrDAdzIg4owt3E8nQocMp/preview" width="380"
                height="250" allow="autoplay"></iframe>
            </div>
          </div>
        </div>
      </div>


      <div class="row" style="padding:30px">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Topic focus</h5>
              <iframe src="https://drive.google.com/file/d/1FtfcJn8lqA-s03KlH6F3bc3_j34Y2u8V/preview" width="380"
                height="250" allow="autoplay"></iframe>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Textbook-based responses</h5>
              <iframe src="https://drive.google.com/file/d/1JPgdLSURZUJhim6S55r1NbNdB4tvJvpP/preview" width="380"
                height="250" allow="autoplay"></iframe>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Classroom chat</h5>
              <iframe src="https://drive.google.com/file/d/1KqhUVKv2cRMrOniUgneNb6bsuhhFqZq2/preview" width="400"
                height="250" allow="autoplay"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>




    <style>
      .news-container {
        padding: 20px;
      }

      .news-card {
        background-color: #f5f5f5;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 20px;
      }

      .news-image {
        position: relative;
      }

      .news-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        opacity: 0;
        transition: opacity 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        /* Allow underlying elements to receive pointer events */
      }

      .news-overlay:hover {
        opacity: 1;
      }

      .news-description {
        color: #fff;
        text-align: center;
        font-size: 16px;
        padding: 10px;
      }

      .news-title {
        padding: 10px;
      }

      .news-title h3 {
        margin: 0;
        font-size: 20px;
        color: #333;
      }

      .blank-card {
        background-color: #f5f5f5;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 20px;
        text-align: center;
        padding: 20px;
      }

      .blank-title {
        color: #00f;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .blank-subtitle {
        color: #000;
        font-size: 16px;
        margin-top: 0;
      }
    </style>
    <section id="news" class="news">
      <div class="section-title">
        <h2>NEWS</h2>
        <p>Recent News about Prof. DUX</p>
      </div>

      <div class="news-container">
        <div class="row">
          <div class="col-md-4">
            <div class="news-card">
              <div class="news-image">
                <iframe src="https://drive.google.com/file/d/1kQEE8bRJmpv5UG0jnAeUrbZsgBqItaW-/preview" width="100%"
                  height="480" allow="autoplay"></iframe>
                <div class="news-overlay">
                  <p class="news-description">Description for News Item 1</p>
                </div>
              </div>
              <div class="news-title">
                <h3>News Item 1</h3>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="news-card">
              <div class="news-image">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100071550756634%2Fvideos%2F838758904297521%2F&show_text=false&width=560&t=0"
                  width="560" height="314" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                  allowfullscreen="true"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen="true"></iframe>
                <div class="news-overlay">
                  <p class="news-description">Description for News Item 2</p>
                </div>
              </div>
              <div class="news-title">
                <h3>News Item 2</h3>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="news-card">
              <div class="news-image">
                <iframe src="https://drive.google.com/file/d/16FjkqK9hFkZO5JtHKU8D2sTemLxY8sBv/preview" width="640"
                  height="480" allow="autoplay"></iframe>
                <div class="news-overlay">
                  <p class="news-description">Description for News Item 3</p>
                </div>
              </div>
              <div class="news-title">
                <h3>News Item 3</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <div class="news-card">
              <div class="news-image">
                <iframe src="https://drive.google.com/file/d/1V2UoHzGtugZt2qUP-bkzXmRaaWgzNqHU/preview" width="640"
                  height="480" allow="autoplay"></iframe>
                <div class="news-overlay">
                  <p class="news-description">Description for News Item 1</p>
                </div>
              </div>
              <div class="news-title">
                <h3>News Item 4</h3>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="news-card">
              <div class="news-image">
                <iframe src="https://drive.google.com/file/d/1WnMHEftSp0j4B2FwW5Beq-9cX9HkIrPh/preview" width="640"
                  height="480" allow="autoplay"></iframe>
                <div class="news-overlay">
                  <p class="news-description">Description for News Item 2</p>
                </div>
              </div>
              <div class="news-title">
                <h3>News Item 5</h3>
              </div>
            </div>
          </div>
          <!-- Blank Template -->
          <div class="col-md-4">
            <div class="news-card">
              <div class="news-image">
                <iframe src="https://drive.google.com/file/d/1Bi9c_C353Uw_pR3CVK9dtn8zDAFaqYVJ/preview" width="640"
                  height="480" allow="autoplay"></iframe>
                <div class="news-overlay">
                  <p class="news-description">Description for News Item 1</p>
                </div>
              </div>
              <div class="news-title">
                <h3>News Item 6</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <div class="news-card">
              <div class="news-image">
                <iframe src="https://drive.google.com/file/d/1vGQoldQfly1VdQBarG2EqKiI6xfJBwdp/preview" width="640"
                  height="480" allow="autoplay"></iframe>
                <div class="news-overlay">
                  <p class="news-description">Description for News Item 1</p>
                </div>
              </div>
              <div class="news-title">
                <h3>News Item 7</h3>
              </div>
            </div>
          </div>
          <!-- Blank Template -->
          <div class="col-md-4">
            <div class="news-card blank-card">
              <div class="news-title">
                <h3 class="blank-title">Stay Tuned!</h3>
                <h4 class="blank-subtitle">Something exciting is coming up soon</h4>
              </div>
            </div>
          </div>
          <!-- Blank Template -->
          <div class="col-md-4">
            <div class="news-card blank-card">
              <div class="news-title">
                <h3 class="blank-title">Stay Tuned!</h3>
                <h4 class="blank-subtitle">Something exciting is coming up soon</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section class="carousel slide" data-bs-ride="carousel">
  <div class="section-title">
    <h2>NEWS</h2>
    <p>Recent News about Prof. DUX</p>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <iframe src="https://drive.google.com/file/d/1kQEE8bRJmpv5UG0jnAeUrbZsgBqItaW-/preview" width="640" height="480" allow="autoplay"></iframe>
    </div>
    <div class="carousel-item">
      <iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100071550756634%2Fvideos%2F838758904297521%2F&show_text=false&width=560&t=0" width="560" height="314" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
    </div>
    <div class="carousel-item">
      <iframe src="https://drive.google.com/file/d/1kQEE8bRJmpv5UG0jnAeUrbZsgBqItaW-/preview" width="640" height="480" allow="autoplay"></iframe>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </button>
</section> -->

    <!-- ======= Our Team Section ======= -->
    <!-- <section id="team" class="team">
      <div class="container">

        <div class="section-title">
          <h2>Our Team</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
        </div>

        <div class="row">

          <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="member">
              <img src="assets/img/team/team-1.jpg" class="img-fluid" alt="">
              <div class="member-info">
                <div class="member-info-content">
                  <h4>Walter White</h4>
                  <span>Chief Executive Officer</span>
                </div>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-wow-delay="0.1s">
            <div class="member">
              <img src="assets/img/team/team-2.jpg" class="img-fluid" alt="">
              <div class="member-info">
                <div class="member-info-content">
                  <h4>Sarah Jhonson</h4>
                  <span>Product Manager</span>
                </div>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-wow-delay="0.2s">
            <div class="member">
              <img src="assets/img/team/team-3.jpg" class="img-fluid" alt="">
              <div class="member-info">
                <div class="member-info-content">
                  <h4>William Anderson</h4>
                  <span>CTO</span>
                </div>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-4 col-md-6" data-wow-delay="0.3s">
            <div class="member">
              <img src="assets/img/team/team-4.jpg" class="img-fluid" alt="">
              <div class="member-info">
                <div class="member-info-content">
                  <h4>Amanda Jepson</h4>
                  <span>Accountant</span>
                </div>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>End Our Team Section -->


    <!-- ======= Cta Section ======= -->
    <section class="cta">
      <div class="container">

        <div class="text-center">
          <h3>Contribute to The Development of Prof Dux</h3>
          <p align="text-center"> Join us in shaping the future of Prof. DUX, the AI education facilitator. Your
            contributions are valuable in revolutionizing personalized AI-assisted learning.</p>
          <a class="cta-btn nav-link scrollto" href="forum.html">Get in Touch</a>
        </div>

      </div>
    </section><!-- End Cta Section -->

    <!-- ======= Contact Us Section ======= -->
    <section id="contact" class="contact section-bg">

      <div class="container">
        <div class="section-title">
          <h2>Contact Us</h2>
          <p align="justify">Contact us today to learn more about Prof. Dux and how we can help you achieve your
            educational goals. We offer a variety of ways to get in touch, so you can choose the method that is most
            convenient for you.</p>
        </div>
      </div>

      <div class="container-fluid">

        <div class="row">

          <div class="col-lg-6 d-flex align-items-stretch infos">

            <div class="row">

              <div class="col-lg-6 info d-flex flex-column align-items-stretch">
                <i class="bx bx-map"></i>
                <h4>Address</h4>
                <p>Near East University, <br> AI and Robotics Institute, <br> 99138 Mersin 10, TRNC</p>
              </div>
              <div class="col-lg-6 info info-bg d-flex flex-column align-items-stretch">
                <i class="bx bx-phone"></i>
                <h4>Call Us</h4>
                <p>+90 542 852 09 85</p>
              </div>
              <div class="col-lg-6 info info-bg d-flex flex-column align-items-stretch">
                <i class="bx bx-envelope"></i>
                <h4>Email Us</h4>
                <p>ai.iot@neu.edu.tr<br>info@dux.aiiot.website</p>
              </div>
              <div class="col-lg-6 info d-flex flex-column align-items-stretch">
                <i class="bx bx-time-five"></i>
                <h4>Working Hours</h4>
                <p>Mon - Fri: 9AM to 5PM<br>Sunday: 9AM to 1PM</p>
              </div>
            </div>

          </div>

          <div class="col-lg-6 d-flex align-items-stretch contact-form-wrap">
            <form action="forms/contact.php" method="post" role="form" class="php-email-form">
              <div class="row">
                <div class="col-md-6 form-group">
                  <label for="name">Your Name</label>
                  <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <label for="email">Your Email</label>
                  <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required>
                </div>
              </div>
              <div class="form-group mt-3">
                <label for="subject">Subject</label>
                <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required>
              </div>
              <div class="form-group mt-3">
                <label for="message">Message</label>
                <textarea class="form-control" name="message" rows="8" required></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div>

        </div>

      </div>
    </section><!-- End Contact Us Section -->


    <div style="position: fixed; bottom: 20px; left: 20px; z-index: 1000;">
      <a href="https://wa.me/905338294913?text=Hello%20Prof.%20Dux%2C%20I%20would%20like%20to%20have%20a%20private%20chat%20with%20you"
        target="_blank">
        <img src="assets/img/whatsapp-icon.png" alt="WhatsApp Icon" style="width: 50px; height: 50px;">
      </a>
    </div>

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-3 col-md-6 footer-info">
            <h3>AI and Robotics Institute</h3>
            <p>
              Near East University <br>
              99138 Mersin 10, TRNC<br><br>
              <strong>Phone:</strong> +90 542 852 09 85<br>
              <strong>Email:</strong> ai.iot@neu.edu.tr<br>
            </p>
            <div class="social-links mt-3">
              <a href="https://twitter.com/Prof_Dux" class="twitter"><i class="bx bxl-twitter"></i></a>
              <a href="https://www.facebook.com/profile.php?id=61550883633799" class="facebook"><i class="bx bxl-facebook"></i></a>
              <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
              <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
              <a href="https://www.linkedin.com/in/prof-dux-363a8528b/" class="linkedin"><i class="bx bxl-linkedin"></i></a>
            </div>
          </div>

          <div class="col-lg-2 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Home</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">About</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Features</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Smart Homes</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Smart Education</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Smart Healthcare</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Training</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Consultancy</a></li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-6 footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>Enter your email address and click on 'Subscribe' to join our news letter list</p>
            <form action="" method="post">
              <input type="email" name="email"><input type="submit" value="Subscribe">
            </form>

            <div class="img-logo" style="padding:10px">
              <img src="assets/AIRI_logo.png" alt="AIRI_LOGO" style="height:50px; background-color: blanchedalmond; "
                srcset="">

            </div>
            <div class="img-logo" style="padding:10px">
              <img src="assets/RCAIoT_logo.png" alt="RCANIOT_LOGO"
                style="height:50px; background-color: blanchedalmond; " srcset="">

            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong>Prof.<span style="background-color: blue;">DUX</span></strong>. All Rights Reserved
      </div>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/bootstrap-3-one-page-template-free-shuffle/ -->
        Designed by <a href="#">MarvelSolutions</a>
      </div>
    </div>
  </footer><!-- End Footer -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
      class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>
  <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="assets/vendor/waypoints/noframework.waypoints.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>

  <script>

    $(document).ready(function () {
      $('.videos').each(function () {
        var $this = $(this);
        var videoId = $this.find('iframe').attr('data-id');
        var videoTitle = $this.find('.card-title').text();

        $this.find('iframe').ready(function () {
          var player = new YT.Player(this, {
            videoId: videoId,
            playerVars: {
              autoplay: 1,
              controls: 0,
              loop: 1,
            },
          });

          player.on('onReady', function () {
            player.play();
          });
        });
      });
    });
  </script>

</body>

</html>