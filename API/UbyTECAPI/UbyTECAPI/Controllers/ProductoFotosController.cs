using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoFotosController : ControllerBase
    {
        private ProductoFotos productoFotos = new();
        // GET: api/<ProductoFotosController>
        [HttpGet]
        public async Task<ActionResult<List<ProductoFotos>>> Get()
        {
            try
            {
                var entityList = productoFotos.get();

                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<ProductoFotosController>/5
        [HttpGet("{producto}")]
        public async Task<ActionResult<List<ProductoFotos>>> Get(string producto)
        {
            try
            {
                var entityList = productoFotos.get($"'{producto}'");
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<ProductoFotosController>
        [HttpPost]
        public async Task<ActionResult<List<ProductoFotos>>> Post(ProductoFotos entity)
        {
            List<ProductoFotos> entityList = new();
            entityList.Add(entity); 

            var result = entity.post(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado agregar la foto");
        }

        // DELETE api/<ProductoFotosController>/5
        [HttpDelete("{producto}/{foto}")]
        public async Task<ActionResult<List<ProductoFotos>>> Delete(string producto, string foto)
        {
            List<EmpleadoTelefonos> entityList = new();

            var result = productoFotos.delete($"'{producto}','{foto}'");

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar la foto");
        }
    }
}
