using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;
using UbyTECAPI.Tools;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepartidorController : ControllerBase
    {
        private Repartidor repartidor = new();
        // GET: api/<RepartidorController>
        [HttpGet]
        public async Task<ActionResult<List<Repartidor>>> Get()
        {
            try
            {
                List<Repartidor> entityList = repartidor.get();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<RepartidorController>/5
        [HttpGet("{usuario}")]
        public async Task<ActionResult<List<Repartidor>>> Get(string usuario)
        {
            try
            {
                List<Repartidor> entityList = repartidor.get($"'{usuario}'");
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<RepartidorController>
        [HttpPost]
        public async Task<ActionResult<List<Repartidor>>> Post(Repartidor entity)
        {
            var tempPass = PassGenerator.generatePass();
            entity.pass = tempPass;


            List<Repartidor> entityList = new()
            {
                entity
            };

            if (!entity.post(entity))
            {
                return BadRequest($"No se ha logrado agregar a {entity.nombre}");
            }
            if (!EmailSender.sendEmail(entity.correo, entity.nombre, tempPass, "Repartidor"))
            {
                var result = entity.delete($"'{entity.usuario}'");
                return BadRequest("Email no válido");
            };

            return Ok(entityList);

        }

        // PUT api/<RepartidorController>/5
        [HttpPut]
        public async Task<ActionResult<List<Repartidor>>> Put(Repartidor entity)
        {
            List<Repartidor> entityList = new();
            entityList.Add(entity);

            var result = entity.put(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado actualizar a {entity.usuario}");
        }

        // DELETE api/<RepartidorController>/5
        [HttpDelete("{usuario}")]
        public async Task<ActionResult<List<Repartidor>>> Delete(string usuario)
        {
            List<Empleado> entityList = new();

            var result = repartidor.delete($"'{usuario}'");

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar a {usuario}");
        }
    }
}
