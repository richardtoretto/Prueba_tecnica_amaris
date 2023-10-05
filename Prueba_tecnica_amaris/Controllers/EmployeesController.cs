using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prueba_tecnica_amaris.Capa_empresarial;
using Prueba_tecnica_amaris.Models;

namespace Prueba_tecnica_amaris.Controllers
{
   
    public class EmployeesController : Controller
    {

        public  ActionResult datatable()
        {
            return View();
        }



        [Route("api/[controller]")]
        [HttpGet]
        public async Task<ActionResult> lista()
        {
            var result = await EmployeesDao.listar();


            if (result == null)
            {
                return  Ok("Error");
            }
            else
            {
                return Json(result);
            }

           
        }

      
    }
}
