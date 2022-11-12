using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private Empleado empleado = new();
        // GET: api/<EmpleadoController>
        [HttpGet]
        public async Task<ActionResult<List<Empleado>>> Get()
        {
            try
            {
                List<Empleado> entityList = empleado.get();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<EmpleadoController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Empleado>>> Get(int id)
        {
            try
            {
                List<Empleado> entityList = empleado.get(id.ToString());
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<EmpleadoController>
        [HttpPost]
        public async Task<ActionResult<List<Empleado>>> Post(Empleado entity)
        {
            List<Empleado> entityList = new();
            entityList.Add(entity);

            var result = entity.post(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado agregar a {entity.nombre}");
        }

        // PUT api/<EmpleadoController>/5
        [HttpPut]
        public async Task<ActionResult<List<Empleado>>> Put(Empleado entity)
        {
            List<Empleado> entityList = new();
            entityList.Add(entity);

            var result = entity.put(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado actualizar a {entity.nombre}");
        }

        // DELETE api/<EmpleadoController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Empleado>>> Delete(int id)
        {
            List<Empleado> entityList = new();

            var result = empleado.delete(id.ToString());

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar a {id}");
        }
    }
}
