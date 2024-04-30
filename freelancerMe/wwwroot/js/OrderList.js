var dataTable;
$(document).ready(function () {
    var url = window.location.search;
    if (url.includes("quote")) {
        loadDataTable("quote");
    }
    else
    {
        if (url.includes("orderplaced")) {
            loadDataTable("orderplaced");
        }
        else {
            if (url.includes("senttosage")) {
                loadDataTable("senttosage");
            }
            else {
                if (url.includes("cancelled")) {
                    loadDataTable("cancelled");
                }
                else {
                    loadDataTable("all");
                }
            }
        }
    }

});

function loadDataTable(status) {
    dataTable = $('#tblData').DataTable({
        "ajax": { url: '/home/getall?status=' + status },
        "columns": [
            { data: 'orderId', "width": "5%" },
            { data: 'orderDate', "width": "10%" },
            { data: 'status', "width": "10%" },
            { data: 'repCode', "width": "10%" },
            { data: 'customerName', "width": "15%" },
            { data: 'custDeliveryName', "width": "25%" },
            { data: 'orderValue', "width": "10%" },
            { data: 'dueDate', "width": "10%" },
            {
                data: 'orderId',
                "render": function (data) {
                    return `<div >
                     <a href="/OrderDetails/OrderDetails?orderId=${data}" class="btn btn-primary"> <i class="bi bi-bag"></i></a>
                    
                    </div>`
                },
                "width": "5%"
            },
            {
                data: 'orderId',
                "render": function (data) {
                    return `<div >
                     <a href="/order/order?id=${data}" class="btn btn-primary"> <i class="bi bi-pencil-square"></i></a>
                    
                    </div>`
                },
                "width": "5%"
            }

        ]
    });
}