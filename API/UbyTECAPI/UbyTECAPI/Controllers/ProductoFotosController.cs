using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;
using UbyTECAPI.Tools;

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

                foreach (var pFotos in entityList)
                {
                    pFotos.fotoData = MongoConnection.getImage(pFotos.foto, pFotos.producto).imagenData;
                }

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

                foreach (var pFotos in entityList)
                {
                    pFotos.fotoData = MongoConnection.getImage(pFotos.foto, pFotos.producto).imagenData;
                }
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        //get por producto pero chiquita solo una por producto
        [HttpGet("{producto}/thumbnails")]
        public async Task<ActionResult<List<ProductoFotos>>> GetThumbnails(string producto)
        {
            try
            {
                var entity = productoFotos.get($"'{producto}'").First();

                entity.thumbnails = MongoConnection.getThumbnails(entity.foto, entity.producto).thumbnails;

                return Ok(new List<ProductoFotos>() { entity });
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // get por producto, nombre
        [HttpGet("/{producto}/{nombre}/image")]
        public async Task<ActionResult<List<ProductoFotos>>> GetImage(string producto, string nombre)
        {
            try
            {

                var resultMongo = MongoConnection.getImage(nombre, producto);

                var entity = new ProductoFotos
                {
                    producto = resultMongo.producto,

                };

                return Ok(new List<ProductoFotos>() { entity });
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

            try
            {
                MongoConnection.addImage(new MongoImage
                {
                    imagenData = entity.fotoData,
                    nombreImagen = entity.foto,
                    producto = entity.producto,
                }, new MongoThumbnails
                {
                    thumbnails = entity.thumbnails,
                    nombreImagen = entity.foto,
                    producto = entity.producto,
                });
            }
            catch (Exception)
            {
                entity.delete($"'{entity.producto}','{entity.foto}'");
                return BadRequest("Error conectando a la base de datos Mongo");
            }


            return result ? Ok(entityList) : BadRequest($"No se ha logrado agregar la foto");
        }

        // DELETE api/<ProductoFotosController>/5
        [HttpDelete("{producto}/{foto}")]
        public async Task<ActionResult<List<ProductoFotos>>> Delete(string producto, string foto)
        {
            List<EmpleadoTelefonos> entityList = new();

            var result = productoFotos.delete($"'{producto}','{foto}'");
            var result2 = MongoConnection.deleteImage(foto, producto);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar la foto");
        }
    }
}
