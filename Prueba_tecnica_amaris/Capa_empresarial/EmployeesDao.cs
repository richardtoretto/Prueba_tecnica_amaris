
using Newtonsoft.Json.Linq;
using Prueba_tecnica_amaris.Models;
using System.Data;


namespace Prueba_tecnica_amaris.Capa_empresarial
{

    public class EmployeesDao
    {


        public static async Task<List<EmployeesModel>?> listar()
        {

            using (var client = new HttpClient())
            {

               
                try
                {


                    HttpResponseMessage response = await client.GetAsync("http://dummy.restapiexample.com/api/v1/employees");
                    response.EnsureSuccessStatusCode();
                    var json = await response.Content.ReadAsStringAsync();


                    JObject datos = JObject.Parse(json);
                    JToken dataToken = datos["data"];


                    DataTable dataTable = new DataTable();
                    dataTable.Columns.Add("id", typeof(string));
                    dataTable.Columns.Add("nombre", typeof(string));
                    dataTable.Columns.Add("salario", typeof(string));
                    dataTable.Columns.Add("age", typeof(string));
                    dataTable.Columns.Add("imagen", typeof(string));
                    dataTable.Columns.Add("salario_anual", typeof(string));


                    foreach (JToken item in dataToken)
                    {
                        DataRow row = dataTable.NewRow();

                        row["id"] = item["id"].ToString();
                        row["nombre"] = item["employee_name"].ToString();
                        row["salario"] = item["employee_salary"].ToString();
                        row["age"] = item["employee_age"].ToString();
                        row["imagen"] = item["profile_image"].ToString();
                        row["salario_anual"] = (Convert.ToInt32(item["employee_salary"]) * 12).ToString();

                        dataTable.Rows.Add(row);
                    }


                    List<EmployeesModel> lista = new List<EmployeesModel>();


                    foreach (DataRow row in dataTable.Rows)
                    {

                        lista.Add(new EmployeesModel
                        {

                            id = row["id"].ToString(),
                            employee_name = row["nombre"].ToString(),
                            employee_salary = row["salario"].ToString(),
                            employee_age = row["age"].ToString(),
                            profile_image = row["imagen"].ToString(),
                            Employee_anual_salary = row["salario_anual"].ToString()

                        });


                    }


                    return lista;

                }catch(Exception ex)
                {
                    return null;
                }

            }




        }



    }
}
