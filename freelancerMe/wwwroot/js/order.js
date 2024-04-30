$(document).ready(function () {
    LoadCustomers();
});

$("#ddDespatchType").change(function () {
    document.getElementById("hdDespatchType").value = this.value;
});
function LoadCustomers() {
    $.ajax({
        url: "/order/GetCustomers",
        success: function (data) {
            var customerName = [];
            data.data.forEach(function (item, index) {
                var a = item;
                customerName.push(item.name + ' |'+ item.accountRef);
                });
            $("#getcustomers").autocomplete({
                source: customerName
            });
        },
        error: function (ex) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
            alert("StackTrace: " + r.StackTrace);
            alert("ExceptionType: " + r.ExceptionType);
        }
    });
    return false;
}


$("#getcustomers").autocomplete({
    change: function (event, ui) {
        var spiltedValue = document.getElementById("getcustomers").value.split("|");
        if (spiltedValue.length > 1) {
            document.getElementById("getcustomers").value = spiltedValue[0]
            document.getElementById("CustomerAccountRef").value = spiltedValue[1]
            LoadAddress(spiltedValue[1]);
        }
    }
});

function LoadAddress(CustomerAccountRef) {
    $.ajax({
        url: "/order/GetCustomerDetails?accountRef=" + CustomerAccountRef,
        data: "{ stockID:" + CustomerAccountRef +"}",
        success: function (data) {
            var customerAddress = [];
            var cnt=0
            data.data.forEach(function (item, index) {
                var a = item;
                cnt=cnt+1
                customerAddress.push(item.address1 + ' ' + item.address2 + ' ' + item.address3 + ' ' + item.address4 + ' ' + item.address5 +' '+ ' |' + item.addressRef);
            });
            if (cnt == 0) {
                toastr.warning('No Address found for the selected Customer');
            }
            else {
                toastr.success(cnt+ ' Addresses found.');
            }
            $("#getaddress").autocomplete({
                source: customerAddress
            });
        },
        error: function (ex) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
            alert("StackTrace: " + r.StackTrace);
            alert("ExceptionType: " + r.ExceptionType);
        }
    });
    return false;
}


$("#getaddress").autocomplete({
    change: function (event, ui) {
        var spiltedValue = document.getElementById("getaddress").value.split("|");
        if (spiltedValue.length > 1) {
            document.getElementById("getaddress").value = spiltedValue[0]
            document.getElementById("CustomerAddressRef").value = spiltedValue[1]
            //document.getElementById("CustomerAddressRef").value = spiltedValue[0]
        }
    }
});

/*Scaffold - DbContext "Server=kamal-fgs;Database=Sage_Extract;Persist Security Info=False;User ID=sageuser;Password=1number1;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;" Microsoft.EntityFrameworkCore.SqlServer - OutputDir Models*/