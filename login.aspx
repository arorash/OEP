<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="EmploymentExpress_web.login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <title>Employment Express</title>
    <link rel="stylesheet" href="login/style.css" />
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.min.js"></script>
    <link href="css/headercss.css" rel="stylesheet" />
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark mx-background-top-linear" id='navSticky'>
          <div class="container">
              <a class="navbar-brand" href="index.html" style="text-transform: uppercase;"><img src="img/logo_1.png" width="250" height="55" alt="" /></a>
              <div>
                  
                  <button type="button" style="width:150px" class="btn btn-outline-secondary " onclick="location.href='register.html'">Register</button>
                  
              </div>
          </div>
         
      </nav>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-3 col-sm-1"></div>
             <div class="login_div col-lg-4 col-md-6 col-sm-10" style="margin:30px auto">
        <form id="form1" runat="server">
        <div>
            <div class="input-field">
                <asp:TextBox ID="username" runat="server" placeholder="Email"></asp:TextBox>
            </div>
            <div class="input-field">
                <asp:TextBox ID="password" runat="server" TextMode="Password" placeholder="Password"></asp:TextBox>
            </div>
            <div style="background-color:#2BA1F6; width:100%; height:50px; text-align:center;">
                
                <asp:Button ID="login_btn" runat="server" Text="Login" Width="100%" Height="50px" BorderStyle="None" BackColor="#2BA1F6" Font-Size="X-Large" ForeColor="White" OnClick="login_btn_Click" />
            </div>
        </div>
    </form>
        <div class="signup">
              Not a member? <a href="register.html">Register</a>
          </div>
          <div class="signup" style="margin-top:2px">
              <a href="forget_password.aspx">Forgot Password</a>
          </div>
    </div>
            <div class="col-lg-4 col-md-3 col-sm-1"></div>
        </div>
    </div>
   
    
</body>
</html>
