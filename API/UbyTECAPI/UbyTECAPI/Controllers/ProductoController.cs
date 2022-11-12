using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private Producto producto = new();
        // GET: api/<ProductoController>
        [HttpGet]
        public async Task<ActionResult<List<Producto>>> Get()
        {
            try
            {
                var entityList = producto.get();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<ProductoController>/5
        [HttpGet("{nombre}")]
        public async Task<ActionResult<List<Producto>>> Get(string nombre)
        {
            try
            {
                var entityList = producto.get($"'{nombre}'");
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<ProductoController>
        [HttpPost]
        public async Task<ActionResult<List<Producto>>> Post(Producto entity)
        {
            List<Producto> entityList = new();
            entityList.Add(entity);

            var result = entity.post(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado agregar a {entity.nombre}");
        }

        // PUT api/<ProductoController>/5
        [HttpPut]
        public async Task<ActionResult<List<Producto>>> Put(Producto entity)
        {
            List<Producto> entityList = new();
            entityList.Add(entity);

            var result = entity.put(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado actualizar a {entity.nombre}");
        }
        // DELETE api/<ProductoController>/5
        [HttpDelete("{nombre}")]
        public async Task<ActionResult<List<Comercio>>> Delete(string nombre)
        {
            List<Empleado> entityList = new();

            var result = producto.delete($"'{nombre}'");

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar a {nombre}");
        }
    }
}
