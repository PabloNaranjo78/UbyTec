using Microsoft.AspNetCore.Mvc;
using UbyTECAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        // GET api/<LoginController>/5
        //EMPLADO
        [HttpGet("administrador/{id}/{pass}")]
        public async Task<ActionResult<bool>> LoginAdmin(int id,string pass)
        {
            return Ok(true);
        }

        // GET api/<LoginController>/5
        //COMERCIO
        [HttpGet("comercio/{id}/{pass}")]
        public async Task<ActionResult<bool>> LoginComercio(int id, string pass)
        {
            return Ok(true);
        }

        // GET api/<LoginController>/5
        //Cliente
        [HttpGet("cliente/{id}/{pass}")]
        public async Task<ActionResult<bool>> LoginCliente(int id, string pass)
        {
            return Ok(true);
        }

    }
}
