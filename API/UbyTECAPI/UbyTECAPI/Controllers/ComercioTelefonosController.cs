using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComercioTelefonosController : ControllerBase
    {
        private ComercioTelefonos comercioTelefonos = new();
        // GET: api/<ComercioTelefonosController>
        [HttpGet]
        public async Task<ActionResult<List<ComercioTelefonos>>> Get()
        {
            try
            {
                var entityList = comercioTelefonos.get();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<ComercioTelefonosController>/5
        [HttpGet("{idComercio}")]
        public async Task<ActionResult<List<ComercioTelefonos>>> Get(int idComercio)
        {
            try
            {
                var entityList = comercioTelefonos.get(idComercio.ToString());
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<ComercioTelefonosController>
        [HttpPost]
        public async Task<ActionResult<List<ComercioTelefonos>>> Post(ComercioTelefonos entity)
        {
            List<ComercioTelefonos> entityList = new();
            entityList.Add(entity);

            var result = entity.post(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado agregar a {entity.telefono}");
        }

        // DELETE api/<ComercioTelefonosController>/5
        [HttpDelete("{idComercio}/{telefono}")]
        public async Task<ActionResult<List<RepartidorTelefonos>>> Delete(int idComercio, int telefono)
        {
            List<RepartidorTelefonos> entityList = new();

            var result = comercioTelefonos.delete($"{idComercio}, {telefono}");

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar a {telefono}");
        }
    }
}
