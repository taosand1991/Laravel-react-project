<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Welcome Email</title>
</head>
<style>
    .main-container {
        display: flex;
        width:100%;
        height:100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .main-head {
        height: 30px;
        width:100%;
        background-color: green;
    }
    .main-head h5 {
        color: white;
        font-size:22px;
        text-align:center;
    }
    .mesage-container {
        width:100%;
        height: 100%;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .mesage-container h2 {
        margin-bottom:20px;
        text-align: left;
    }
    p{
        text-align:center;
        margin-bottom:10px;
    }
    footer{
        text-align:left !important;
        margin: 10px;
    }
</style>
<body>
    <div class="main-container">
        <div class='main-head'>
              <h5>Legacy Graphics</h5>
        </div>
        <div class='message-container'>
            <h2 >Hi {{$user->name}},</h2>
            <p >Thank you for registering with our website and We really appreciate your time.
                We will be posting a lot of news and articles you can read on. Your feedback is very
                important and we look forward to that.
            </p>
            <footer >
                <p>Thanks,</p>
                <h4>Legacy Graphics</h4>
            </footer>
        </div>
    </div>
    <style>

    </style>
</body>
</html>
