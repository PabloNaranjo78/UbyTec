using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminComerTelefonosController : ControllerBase
    {
        private AdminComerTelefonos adminComerTelefonos = new();
        // GET: api/<AdminComerTelefonosController>
        [HttpGet]
        public async Task<ActionResult<List<AdminComerTelefonos>>> Get()
        {
            try
            {
                var entityList = adminComerTelefonos.get();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<AdminComerTelefonosController>/5
        [HttpGet("{idAdmin}")]
        public async Task<ActionResult<List<AdminComerTelefonos>>> Get(int idAdmin)
        {
            try
            {
                var entityList = adminComerTelefonos.get($"{idAdmin}");
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<AdminComerTelefonosController>
        [HttpPost]
        public async Task<ActionResult<List<AdminComerTelefonos>>> Post(AdminComerTelefonos entity)
        {
            List<AdminComerTelefonos> entityList = new();
            entityList.Add(entity);

            var result = entity.post(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado agregar a {entity.telefono}");
        }

        // PUT api/<AdminComerTelefonosController>/5
        [HttpDelete("{idAdmin}/{telefono}")]
        public async Task<ActionResult<List<AdminComerTelefonos>>> Delete(int idAdmin, int telefono)
        {
            List<AdminComerTelefonos> entityList = new();

            var result = adminComerTelefonos.delete($"{idAdmin} AND telefono = {telefono}");

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar a {telefono}");
        }
    }
}
