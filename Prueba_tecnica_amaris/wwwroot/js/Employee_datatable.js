
datatable();


async function datatable() {

    $("#load").attr("src","/image/load.gif");
  
    $.ajax({
        type: "get",
        url: '/api/Employees',
        success: await
            function (response) {
                console.log(response);

                if (response == "Error") {

                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'La api que intenta conectar no esta disponible, intente de nuevo.',
                        confirmButtonColor: '#445EF0',
                        showConfirmButton: true,
                    });
     
                } else {

                    let ca = "";
                    ca += " <table id=\"TableGeneral\"class=\"table table-striped table-hover table-bordered\"width=\"100%\"> ";
                    ca += "     <thead>                                                                    ";
                    ca += "         <tr>                                                                   ";
                    ca += "             <th>id			            </th>";
                    ca += "             <th>employee_name			</th>";
                    ca += "             <th>employee_salary		    </th>";
                    ca += "             <th>employee_age			</th>";
                    ca += "             <th>profile_image			</th>";
                    ca += "             <th>employee_anual_salary	</th>";
                    ca += "         </tr>                                                                  ";
                    ca += "     </thead>                                                                   ";
                    ca += "     <tbody>                       ";

                    $.each(response, function (index, result) {
                        ca += "<tr>";
                        ca += "<td>" + result.id + "</td>";
                        ca += "<td>" + result.employee_name + "</td>";
                        ca += "<td>" + result.employee_salary + "</td>";
                        ca += "<td>" + result.employee_age + "</td>";
                        ca += "<td>" + result.profile_image + "</td>";
                        ca += "<td>" + result.employee_anual_salary + "</td>";
                        ca += "</tr>";
                    });

                    ca += " </tbody>                                                                       ";
                    ca += " </table>                                                                       ";


                    $("#divtablacarga").html(ca);
                    funcionesTbl('divtablacarga');

                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Api conectada',
                        showConfirmButton: false,
                        timer: 1500
                    });


          
                }

                $("#load").hide();
               
            }

            
    });
}



function funcionesTbl(IdDiv) {


    try {
        var IdTable = $('#' + IdDiv + ' table').attr("id");
        $('#' + IdTable + ' thead tr').clone(true).appendTo('#' + IdTable + ' thead');
        $('#' + IdTable + ' thead tr:eq(0) th').each(function (i) {
            var title = $('#' + IdTable + ' thead th').eq($(this).index()).text();
            var $input = `<input type="text" style="width: 100%;" class="form-control input-sm" placeholder="${title}" data-index="${i}" />`;
            $(this).html((i > 0 ? $input : ""));
        });

        // DataTable
        var table = $('#' + IdTable).DataTable({
            oLanguage: {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando Lista...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            },
            colReorder: true,
             paging: true,
            "searching": true,
            scrollX: true,

        });

        // Filter event handler
        $(table.table().container()).on('keyup', 'thead tr:eq(0) input', function () {
            table
                .column($(this).data('index'))
                .search(this.value)
                .draw();

        });
    } catch (ex) {
        swal("Error JavaScript", "funcionesTbl():" + ex, "error");
    }
}

