<?php
	$subject = "New Registration from Herron Tech Website";
	
    function buildResponse($msg){
        if($msg != null){
            $response = array(
                "result" => false,
                "error"=> $msg
            );
        }
        else{
            $response = array(
                "result" => true,
                "data"=> true
            );
        }
        echo json_encode($response);
        die();
    }

    function checkGoogleReCaptcha($captcha){

        function getCurlData($url){
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_TIMEOUT, 10);
            curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16");
            $curlData = curl_exec($curl);
            curl_close($curl);
            return $curlData;
        }

       $secret = "6LfA6ykUAAAAAP0dokz0viBT-Vlfo1ugBn4pCNwd";
       $url = "https://www.google.com/recaptcha/api/siteverify";
       $url.= "?secret=$secret&response=$captcha";
       $res = json_decode(getCurlData($url), true);
       return ($res['success'] == 1) ? true : false;
    }

    $postedData = json_decode(file_get_contents("php://input"));
    $to = "team@soajs.org";// team
    $name = $postedData->name;
    $email = $postedData->email;
    $phone = $postedData->phone;
    $address = nl2br ( $postedData->address );
    $company = $postedData->company;
    $companySize = $postedData->companySize;
    $sector = $postedData->sector;
    $position = $postedData->position;
    $aboutUs = $postedData->aboutUs;
    $usingSoajs = nl2br ( $postedData->usingSoajs );
    $lookingFor = nl2br ( $postedData->lookingFor );

    $captcha = $postedData->captcha;

    if (! preg_match ( "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/", $email )) {
        buildResponse( 'Please enter a correct email format! ' );
    }

    $body = <<<HTML

	<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->
      <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS -->
      <title>SOAJS</title>

      <style type="text/css">
	    body {
	      margin: 0;
	      padding: 0;
	      -ms-text-size-adjust: 100%;
	      -webkit-text-size-adjust: 100%;
	      background-color: #F5F2F2;
	    }

	    table {
	      border-spacing: 0;
	      width:600px;
	      max-width:600px;
	      margin:0 auto;
	    }

	    table td {
	      border-collapse: collapse;
	    }

	    .ExternalClass {
	      width: 100%;
	    }

	    .ExternalClass,
	    .ExternalClass p,
	    .ExternalClass span,
	    .ExternalClass font,
	    .ExternalClass td,
	    .ExternalClass div {
	      line-height: 100%;
	    }

	    .ReadMsgBody {
	      width: 100%;
	      background-color: #ebebeb;
	    }

	    table {
	      mso-table-lspace: 0pt;
	      mso-table-rspace: 0pt;
	    }

	    img {
	      -ms-interpolation-mode: bicubic;
	    }

	    .yshortcuts a {
	      border-bottom: none !important;
	    }

	    @media screen and (max-width: 599px) {
	      .force-row,
	      .container {
	        width: 100% !important;
	        max-width: 100% !important;
	      }
	    }

	    .ios-footer a {
	      color: #aaaaaa !important;
	      text-decoration: underline;
	    }

	    .company{
	        font-family:Helvetica, Arial, sans-serif;
	        font-size:24px;
	        font-weight:bold;
	        padding-bottom:12px;
	        color:#b6b2f0;
	    }

	    .slogan {
	        font-size:12px;
	        font-weight:normal;
	        color:#5e5e73;
	    }

	    .body-text{
	        font-family:Helvetica, Arial, sans-serif;
	        font-size:14px;
	        line-height:20px;
	        text-align:left;
	        color:#5e5e73;
	    }

	    .body-text div{
	        margin-bottom: 8px;
	    }

	    .footer-text{
	        font-family:Helvetica, Arial, sans-serif;
	        font-size:12px;
	        line-height:16px;
	        color:#5e5e73;
	    }

	    .footer-text a{
	        color:#f1bb3b;
	    }
	    .content{
	        background-color:#FFFFFF;
	        padding:20px;
	        border-radius:8px;
	    }
    </style>
    </head>
    <body>
    <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" valign="top">
          <br>
          <table border="0" width="600" cellpadding="0" cellspacing="0" class="container">
            <tr>
              <td class="header company" align="left">
                Herron Tech<br />
                <span class="slogan">Your Platform Enterprise Partner For Digital Business Agility.</span>
              </td>
            </tr>
            <tr>
              <td class="container-padding content" align="left">
			    <div class="body-text">
			      <div><b>Name</b>:  $name</div>
			      <div><b>Email</b>:  $email</div>
			      <div><b>Phone</b>:  $phone</div>
			      <b>Address</b>:<br />
			      $address
			      <div><b>Company</b>:  $company</div>
			      <div><b>Size</b>:  $companySize</div>
			      <div><b>Sector</b>:  $sector</div>
			      <div><b>Position</b>:  $position</div>
			      <div><b>What are you looking for</b>:  $lookingFor</div>

			      <div><b>Already using SOAJS</b>:  $usingSoajs</div>
			    </div>
              </td>
            </tr>
            <tr>
              <td class="footer-text" align="left">
                 <br>
                 You are receiving this email because a registration form was filled on the website.
                 <br><br>
                    <strong>Regards</strong><br>
                    <span class="ios-footer">
                      Herron Tech<br>
                    </span>
                    <a href="http://www.herrontech.com">www.herrontech.com</a><br>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    </body>
    </html>
HTML;

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "X-Priority: 3\r\n";
    $headers .= "X-MSMail-Priority: Normal\r\n";
    $headers .= "From: $name <$email>\r\n";
    $headers .= "Organization: Herron Tech\r\n";
    $headers .= "To: Herron Tech Team <$to>\r\n";
    $headers .= "Date: " . date ( "D, d M Y H:m:s O", time () ) . "\r\n";
    $headers .= "Reply-To: " . $name . " <" . $email . ">\r\n";
    $headers .= "Return-Path: " . $name . " <" . $email . ">\r\n";
    $headers .= "X-Mailer: PHP" . phpversion () . "\r\n";
    $headers .= "X-Sender-IP: " . getenv ( 'REMOTE_ADDR' ) . "\r\n";
    $headers .= "Content-Transfer-Encoding: 7bit\r\n";
	
    $status = mail ( $to, $subject, $body, $headers );

    if ($status)
        buildResponse(null);
        else
            buildResponse('An error occurred while sending the message. Please try again.' );

?>