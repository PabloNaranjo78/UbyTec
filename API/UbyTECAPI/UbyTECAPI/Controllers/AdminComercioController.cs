using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;
using UbyTECAPI.Tools;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminComercioController : ControllerBase
    {
        private AdminComercio adminComercio = new();
        // GET: api/<AdminComercioController>
        [HttpGet]
        public async Task<ActionResult<List<AdminComercio>>> Get()
        {
            try
            {
                var entityList = adminComercio.get();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<AdminComercioController>/5
        [HttpGet("{idComercio}")]
        public async Task<ActionResult<List<AdminComercio>>> Get(int idComercio)
        {
            try
            {
                var entityList = adminComercio.get(idComercio.ToString());
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<AdminComercioController>
        [HttpPost]
        public async Task<ActionResult<List<AdminComercio>>> Post(AdminComercio entity)
        {
            var tempPass = PassGenerator.generatePass();
            entity.pass = tempPass;

            List<AdminComercio> entityList = new()
            {
                entity
            };

            if (!entity.post(entity))
            {
                return BadRequest($"No se ha logrado agregar a {entity.nombre}");
            };
            if (!EmailSender.sendEmail(entity.correo, entity.nombre, tempPass, "Administrador de Comercio"))
            {
                var result = entity.delete(entity.idAdmin.ToString());
                return BadRequest("Email no válido");
            };

            return Ok(entityList);
        }

        // PUT api/<AdminComercioController>/5
        [HttpPut]
        public async Task<ActionResult<List<AdminComercio>>> Put(AdminComercio entity)
        {
            List<AdminComercio> entityList = new();
            entityList.Add(entity);

            var result = entity.put(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado actualizar a {entity.nombre}");
        }

        // DELETE api/<AdminComercioController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<AdminComercio>>> Delete(int id)
        {
            List<AdminComercio> entityList = new();

            var result = adminComercio.delete(id.ToString());

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar a {id}");
        }
    }
}
