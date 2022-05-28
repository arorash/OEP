<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Certificate.aspx.cs" Inherits="EmploymentExpress_web.jobseeker.Certificate" %>

<%@ Register assembly="FastReport.Web, Version=2020.2.17.0, Culture=neutral, PublicKeyToken=db7e5ce63278458c" namespace="FastReport.Web" tagprefix="cc1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <cc1:WebReport ID="WebReport1" runat="server" />
        </div>
    </form>
</body>
</html>
