using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private Cliente cliente = new();
        // GET: api/<ClienteController>
        [HttpGet]
        public async Task<ActionResult<List<Cliente>>> Get()
        {
            try
            {
                var entityList = cliente.get();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<ClienteController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Cliente>>> Get(int id)
        {
            try
            {
                var entityList = cliente.get(id.ToString());
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<ClienteController>
        [HttpPost]
        public async Task<ActionResult<List<Cliente>>> Post(Cliente entity)
        {
            List<Cliente> entityList = new();
            entityList.Add(entity);

            var result = entity.post(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado agregar a {entity.nombre}");
        }

        // PUT api/<ClienteController>/5
        [HttpPut]
        public async Task<ActionResult<List<Cliente>>> Put(Cliente entity)
        {
            List<Cliente> entityList = new();
            entityList.Add(entity);

            var result = entity.put(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado actualizar a {entity.idCliente}");
        }

        // DELETE api/<ClienteController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Cliente>>> Delete(int id)
        {
            List<ProductosPedido> entityList = new();

            var result = cliente.delete(id.ToString());

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar a {id}");
        }
    }
}

