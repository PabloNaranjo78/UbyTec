using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System;
using UbyTECAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComercioController : ControllerBase
    {
        private NpgsqlConnection con = new(Connection.Connection.ConnectionString);
        private Comercio comercio = new();
        // GET: api/<ComercioController>
        [HttpGet]
        public async Task<ActionResult<List<Comercio>>> Get()
        {
            try
            {
                var entityList = comercio.get();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        [HttpGet("solicitudes")]
        public async Task<ActionResult<List<Comercio>>> GetSolicitudes()
        {
            try
            {
                con.Open();
                NpgsqlCommand command = new($"SELECT idComercio,pass,tipo,nombre,correo,sinpe,solicitud," +
                    $"provincia,canton,distrito FROM getsolicitudes()", con);
                NpgsqlDataReader rd = command.ExecuteReader();
                List<Comercio> entityList = new();
                while (rd.Read())
                {
                    entityList.Add(new Comercio
                    {
                        idComercio = Convert.ToInt32(rd["idComercio"]),
                        pass = rd["pass"].ToString(),
                        tipo = rd["tipo"].ToString(),
                        nombre = rd["nombre"].ToString(),
                        correo = rd["correo"].ToString(),
                        sinpe = Convert.ToInt32(rd["sinpe"]),
                        solicitud = Boolean.Parse(rd["solicitud"].ToString()),
                        provincia = rd["provincia"].ToString(),
                        canton = rd["canton"].ToString(),
                        distrito = rd["distrito"].ToString()

                    });
                }
                con.Close();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<ComercioController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Comercio>>> Get(int id)
        {
            try
            {
                var entityList = comercio.get(id.ToString());
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<ComercioController>
        [HttpPost]
        public async Task<ActionResult<List<Comercio>>> Post(Comercio entity)
        {
            List<Comercio> entityList = new();
            entityList.Add(entity);

            var result = entity.post(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado agregar a {entity.nombre}");
        }

        // PUT api/<ComercioController>/5
        [HttpPut]
        public async Task<ActionResult<List<Comercio>>> Put(Comercio entity)
        {
            List<Comercio> entityList = new();
            entityList.Add(entity);

            var result = entity.put(entity);

            return result ? Ok(entityList) : BadRequest($"No se ha logrado actualizar a {entity.nombre}");
        }

        // DELETE api/<ComercioController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Comercio>>> Delete(int id)
        {
            List<Empleado> entityList = new();

            var result = comercio.delete(id.ToString());

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar a {id}");
        }
    }
}
