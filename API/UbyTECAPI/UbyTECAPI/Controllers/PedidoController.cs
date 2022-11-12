using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private Pedido pedido = new();
        // GET: api/<PedidoController>
        [HttpGet]
        public async Task<ActionResult<List<Pedido>>> Get()
        {
            try
            {
                var entityList = pedido.get();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<PedidoController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Pedido>>> Get(int id)
        {
            try
            {
                var entityList = pedido.get(id.ToString());
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<PedidoController>
        [HttpPost]
        public async Task<ActionResult<List<Pedido>>> Post(Pedido entity)
        {
            List<Pedido> entityList = new();
            entityList.Add(entity);

            var result = entity.post(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado agregar a {entity.idPedido}");
        }

        // PUT api/<PedidoController>/5
        [HttpPut]
        public async Task<ActionResult<List<Pedido>>> Put(Pedido entity)
        {
            List<Pedido> entityList = new();
            entityList.Add(entity);

            var result = entity.put(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado actualizar a {entity.idPedido}");
        }

        // DELETE api/<PedidoController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<ProductosPedido>>> Delete(int id)
        {
            List<ProductosPedido> entityList = new();

            var result = pedido.delete(id.ToString());

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar a {id}");
        }
    }
}
