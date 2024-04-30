
$(document).ready(function () {
    
    $("#divResult").hide();
    LoadCategories();
});

function LoadCategories() {
    $.ajax({
        url: "/OrderDetails/GetCategories",
        success: function (data) {
            var category = [];
            data.data.forEach(function (item, index) {
                var a = item;
                category.push(item.fgsSubCodeName + ' |' + item.fgsCode);
                });
            $("#getcommoditycode").autocomplete({
                source: category
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


$("#getcommoditycode").autocomplete({
    change: function (event, ui) {
        var spiltedValue = document.getElementById("getcommoditycode").value.split("|");
        if (spiltedValue.length > 1) {
            document.getElementById("getcommoditycode").value = spiltedValue[0]
            document.getElementById("hdCommodityCode").value = spiltedValue[1]
            $("#divResult").show();
            //var data = "<tr><td><h6 class='text-muted'>2</h6></td><td><h6 class='text-muted'>200</h6></td><td><h6 class='text-muted'>20</h6></td><td><h6 class='text-muted'>10</h6></td><td><h6 class='text-muted'>12/12/2024</h6></td><td><input type='checkbox' id='Authorized' name='Authorized' value='true' /></td></tr>"
            //$("#tblResults").append(data);
            AccountRef = document.getElementById("hdAccountRef").value
            CommodityCode = spiltedValue[1]
            LoadCustomerProducts(AccountRef, CommodityCode );
            
        }
    }
});

$("#txtTotalUnit").change(function () {
    TotalOrderAmount();
});
$("#txtUnitPrice").change(function () {
    TotalOrderAmount();
});

function LoadCustomerProducts(accountRef, commodityCode) {
    $.ajax({
        url: "/OrderDetails/GetCustomerProducts",
        data: "accountRef=" + accountRef + "&commodityCode=" + commodityCode,
        success: function (data) {
            $("#tblResults > tbody").empty();
            var cnt = 0
            data.data.forEach(function (item, index) {
                var a = item;
                cnt = cnt + 1
                //commodoty_code Description pack qty_order  unitPrice price / KG  unit_weigth OrderDate Status
                var data = "<tr><td><h6 class='text-muted'>" + item.stockCode + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.description + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.pack + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.qtyOrder + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.unitPrice + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.priceKg + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.unitWeight + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.orderDate + "</h6></td>";
                data = data + "<td><input type='checkbox' /></td></tr > "
                $("#tblResults").append(data);

                document.getElementById("hdAccountRef").value = accountRef; 
                document.getElementById("hdCommodityCode").value = commodityCode; 
                document.getElementById("hdStockCode").value = ""; 
                document.getElementById("txtDescription").value = "";
                document.getElementById("txtPackSize").value = "";
                document.getElementById("txtTotalUnit").value = "";
                document.getElementById("txtUnitPrice").value = "";
                document.getElementById("txtPricePerKg").value = "";
            });
            if (cnt == 0) {
                toastr.warning('No previous order found for the selected product for this Customer.');
                LoadProductsWithOuterjoin(commodityCode)
            }
            else {
                toastr.success(cnt + ' Previous Orders found.');
            }
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


function LoadProductsWithOuterjoin(commodityCode) {
    $.ajax({
        url: "/OrderDetails/getProductsWithOuterjoin",
        data: "commodityCode=" + commodityCode,
        success: function (data) {
            $("#tblResults > tbody").empty();
            var cnt = 0
            data.data.forEach(function (item, index) {
                var a = item;
                cnt = cnt + 1
                //commodoty_code Description pack qty_order  unitPrice price / KG  unit_weigth OrderDate Status
                var data = "<tr><td><h6 class='text-muted'>" + item.stockCode + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.description + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.pack + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.qtyOrder + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.unitPrice + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.priceKg + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.unitWeight + "</h6></td>";
                data = data + "<td><h6 class='text-muted'>" + item.orderDate + "</h6></td>";
                data = data + "<td><input type='checkbox' /></td></tr > "
                $("#tblResults").append(data);

                document.getElementById("hdCommodityCode").value = commodityCode;
                document.getElementById("hdStockCode").value = "";
                document.getElementById("txtDescription").value = "";
                document.getElementById("txtPackSize").value = "";
                document.getElementById("txtTotalUnit").value = "";
                document.getElementById("txtUnitPrice").value = "";
                document.getElementById("txtPricePerKg").value = "";
            });
            if (cnt == 0) {
                toastr.warning('No Product found for the given category.');
            }
            else {
                toastr.success(cnt + '  Product(s) found.');
            }
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
$('#test').click(function () {
    $('#tblResults tr').filter(':has(:checkbox:checked)').each(function () {
        // this = tr
        $tr = $(this);
        i = 0;
        $('td', $tr).each(function () {
            if (i == 0)
                document.getElementById("hdStockCode").value = this.innerText;
            if (i == 1)
                document.getElementById("txtDescription").value = this.innerText;
            if (i == 2)
                document.getElementById("txtPackSize").value = this.innerText;
            if (i == 3)
                document.getElementById("txtTotalUnit").value = this.innerText;
            if (i == 4)
                document.getElementById("txtUnitPrice").value = this.innerText;
            if (i == 5)
                document.getElementById("txtPricePerKg").value = this.innerText;
            i = i + 1;
            
        });

        TotalOrderAmount();
        //get row values
    });
    return false;
});

$('#edit').click(function () {
    $('#tblSavedOrders tr').filter(':has(:checkbox:checked)').each(function () {
        // this = tr
        $tr = $(this);
        i = 0;
        $('td', $tr).each(function () {
            if (i == 0)
                document.getElementById("hdOrderDetailId").value = this.innerText;
            if (i == 1) {
                document.getElementById("hdCommodityCode").value = this.innerText;
                document.getElementById("getcommoditycode").value = this.innerText;
            }
            if (i == 2)
                document.getElementById("hdStockCode").value = this.innerText;
            if (i == 3)
                document.getElementById("txtDescription").value = this.innerText;
            if (i == 4)
                document.getElementById("txtPackSize").value = this.innerText;
            if (i == 5)
                document.getElementById("txtTotalUnit").value = this.innerText;
            if (i == 6)
                document.getElementById("txtUnitPrice").value = this.innerText;
            if (i == 7)
                document.getElementById("txtPricePerKg").value = this.innerText;
            if (i == 9)
                document.getElementById("txtDueDate").innerText = this.innerText;
            i = i + 1;
            

        });
        document.getElementById("btnAdd").innerHTML = "Edit <i class='bi bi-pen'></i>";
        TotalOrderAmount();
        //get row values
    });
    return false;
});


function TotalOrderAmount() {
    var totalUnit = parseFloat(document.getElementById("txtTotalUnit").value);
    var unitPrice = parseFloat(document.getElementById("txtUnitPrice").value);
    var Total = totalUnit * unitPrice
    if ($.isNumeric(Total)) {
        document.getElementById("hdTotalOrderAmount").value = Total;
        document.getElementById("h6TotalOrderAmount").innerText = "Total : £ " + Total
    }
    else {
        document.getElementById("hdTotalOrderAmount").value = "";
        document.getElementById("h6TotalOrderAmount").innerText = "";
    }
}

function Delete(url) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                success: function (data) {
                    if (data.success) {
                        location.reload();
                        toastr.success(data.message);
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            })
        }
    })
}


function OrderAction(url, actionName) {
    var CustomerPoref = document.getElementById("txtCustomerPoref").value;
    var DespatchType = document.getElementById("ddDespatchType").value;
    var Ref = document.getElementById("txtRef").value;
    var DeliveryCharge = document.getElementById("txtDeliveryCharge").value;
    var messageTitle = "Are you sure ?"
    var message = "You won't be able to revert this!"
    if (actionName == "StatusOrderPlaced") {
        messageTitle = "Are you sure you want to place the order?";
        message = "This will mark the status of the order as 'Order Placed'."
    }
    if (actionName == "StatusSentToSage") {
        messageTitle = "Are you sure you want to send this order to Sage ?";
        message = "This will change the status of the order to 'Sent to Sage' and you will not be able to edit this Order after that. "
    }
    if (actionName == "StatusCancelled") {
        messageTitle = "Are you sure you want to Cancel this order ?";
        message = "This will change the status of the order to 'Cancelled'."
    }
    var content = document.createElement('div');
    content.innerHTML = message;
    if (!$.isNumeric(DeliveryCharge) )
        DeliveryCharge = 0;
    var urlpar = "&customerPORef=" + CustomerPoref + "&Ref=" + Ref + "&despatchType=" + DespatchType + "&deliveryCharge=" + DeliveryCharge
    url = url + urlpar
    Swal.fire({
        title: messageTitle,
        text: content.innerHTML,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "<i class='fa fa-thumbs-up'></i> Yes  "
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url ,
                success: function (data) {
                    if (data.success) {
                        location.reload();
                        toastr.success(data.message);
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            })
        }
    })
}

