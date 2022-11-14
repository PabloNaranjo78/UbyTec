using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosPedidoController : ControllerBase
    {
        private ProductosPedido productosPedido = new();
        // GET: api/<ProductosPedidoController>
        [HttpGet]
        public async Task<ActionResult<List<ProductosPedido>>> Get()
        {
            try
            {
                var entityList = productosPedido.get();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<ProductosPedidoController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<ProductosPedido>>> Get(int id)
        {
            try
            {
                var entityList = productosPedido.get(id.ToString());
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<ProductosPedidoController>
        [HttpPost]
        public async Task<ActionResult<List<ProductosPedido>>> Post(ProductosPedido entity)
        {
            List<ProductosPedido> entityList = new();
            entityList.Add(entity);

            var result = entity.post(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado agregar a {entity.idPedido}");
        }

        // PUT api/<ProductosPedidoController>/5
        [HttpPut]
        public async Task<ActionResult<List<ProductosPedido>>> Put(ProductosPedido entity)
        {
            List<ProductosPedido> entityList = new();
            entityList.Add(entity);

            var result = entity.put(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado actualizar a {entity.idPedido}");
        }

        // DELETE api/<ProductosPedidoController>/5
        [HttpDelete("{id}/{producto}")]
        public async Task<ActionResult<List<ProductosPedido>>> Delete(int id,string producto)
        {
            List<ProductosPedido> entityList = new();

            var result = productosPedido.delete($"{id},'{producto}'");

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar a {id}");
        }
    }
}
