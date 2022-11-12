using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteTelefonosController : ControllerBase
    {
        private ClienteTelefonos clienteTelefonos = new();
        // GET: api/<ClienteTelefonosController>
        [HttpGet]
        public async Task<ActionResult<List<ClienteTelefonos>>> Get()
        {
            try
            {
                var entityList = clienteTelefonos.get();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<ClienteTelefonosController>/5
        [HttpGet("{idCliente}")]
        public async Task<ActionResult<List<ClienteTelefonos>>> Get(int idCliente)
        {
            try
            {
                var entityList = clienteTelefonos.get(idCliente.ToString());
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<ClienteTelefonosController>
        [HttpPost]
        public async Task<ActionResult<List<ClienteTelefonos>>> Post(ClienteTelefonos entity)
        {
            List<ClienteTelefonos> entityList = new();
            entityList.Add(entity);

            var result = entity.post(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado agregar a {entity.telefono}");
        }

        // DELETE api/<ClienteTelefonosController>/5
        [HttpDelete("{idCliente}/{telefono}")]
        public async Task<ActionResult<List<RepartidorTelefonos>>> Delete(int idCliente, int telefono)
        {
            List<RepartidorTelefonos> entityList = new();

            var result = clienteTelefonos.delete($"{idCliente} AND telefono = {telefono}");

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar a {telefono}");
        }
    }
}
