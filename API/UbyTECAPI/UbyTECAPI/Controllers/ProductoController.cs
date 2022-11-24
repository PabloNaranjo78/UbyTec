using Microsoft.AspNetCore.Mvc;
using Npgsql;
using UbyTECAPI.Models;
using UbyTECAPI.Tools;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private NpgsqlConnection con = new(Connection.Connection.ConnectionString);
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


        // GET api/<ProductoController>/5
        [HttpGet("Comercio/{id}")]
        public async Task<ActionResult<List<ProductoThumbnail>>> GetByComercio(int id)
        {
            
            try
            {
                con.Open();
                NpgsqlCommand command = new($"SELECT {producto.getAtributes()} from GetProductoByIdComercio({id})", con);
                NpgsqlDataReader rd = command.ExecuteReader();
                List<Producto> entity = producto.createEntityList(rd);

                List<ProductoThumbnail> productoThumbnailsList = new();

                foreach (var item in entity)
                {
                    productoThumbnailsList.Add(new ProductoThumbnail(item)
                    {
                        data = MongoConnection.getThumbnails(item.nombre).thumbnails
                    });
                }

                return Ok(productoThumbnailsList);
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
