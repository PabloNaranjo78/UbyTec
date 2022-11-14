using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepartidorTelefonosController : ControllerBase
    {
        private RepartidorTelefonos repartidorTelefonos = new();
        // GET: api/<RepartidorTelefonosController>
        [HttpGet]
        public async Task<ActionResult<List<RepartidorTelefonos>>> Get()
        {
            try
            {
                var entityList = repartidorTelefonos.get();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<RepartidorTelefonosController>/5
        [HttpGet("{usuarioRep}")]
        public async Task<ActionResult<List<RepartidorTelefonos>>> Get(string usuarioRep)
        {
            try
            {
                var entityList = repartidorTelefonos.get($"'{usuarioRep}'");
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<RepartidorTelefonosController>
        [HttpPost]
        public async Task<ActionResult<List<RepartidorTelefonos>>> Post(RepartidorTelefonos entity)
        {
            List<RepartidorTelefonos> entityList = new();
            entityList.Add(entity);

            var result = entity.post(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado agregar a {entity.telefono}");
        }

        // DELETE api/<RepartidorTelefonosController>/5
        [HttpDelete("{usuarioRep}/{telefono}")]
        public async Task<ActionResult<List<RepartidorTelefonos>>> Delete(string usuarioRep,int telefono)
        {
            List<RepartidorTelefonos> entityList = new();

            var result = repartidorTelefonos.delete($"'{usuarioRep}', {telefono}");

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar a {telefono}");
        }
    }
}
