using Microsoft.AspNetCore.Mvc;
using Npgsql;
using UbyTECAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private NpgsqlConnection con = new(Connection.Connection.ConnectionString);
        private Pedido pedido = new();
        // GET: api/<PedidoController>
        [HttpGet]
        public async Task<ActionResult<List<Pedido>>> Get()
        {
            try
            {
                var entityList = pedido.get();
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<PedidoController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Pedido>>> Get(int id)
        {
            try
            {
                var entityList = pedido.get(id.ToString());
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<PedidoController>/5
        [HttpGet("Comercio/{id}")]
        public async Task<ActionResult<List<Pedido>>> GetByIDComercio(int id)
        {
            try
            {
                con.Open();
                NpgsqlCommand command = new($"SELECT idPedido,direccion," +
                    $"finalizado,repartidor,idCliente,comprobante FROM GetPedidoByIDComercio({id})", con);
                NpgsqlDataReader rd = command.ExecuteReader();
                List<Pedido> entityList = pedido.createEntityP(rd);
                
                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // GET api/<PedidoController>/5
        [HttpGet("Cliente/{id}")]
        public async Task<ActionResult<List<Pedido>>> GetByIDCliente(int id)
        {
            try
            {
                con.Open();
                NpgsqlCommand command = new($"SELECT idPedido,direccion," +
                    $"finalizado,repartidor,idCliente,comprobante FROM GetPedidoByIDCliente({id})", con);
                NpgsqlDataReader rd = command.ExecuteReader();
                List<Pedido> entityList = pedido.createEntityP(rd);

                return Ok(entityList);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar a la base de datos");
            }
        }

        // POST api/<PedidoController>
        [HttpPost]
        public async Task<ActionResult<List<Pedido>>> Post(Pedido entity)
        {
            
            con.Open();
            NpgsqlCommand command = new($"select getNewIDPedido from getNewIDPedido()",con);
            NpgsqlDataReader rd = command.ExecuteReader();
            rd.Read();

            var newIdPedido = Convert.ToInt32(rd["getNewIDPedido"]);

            entity.idPedido = newIdPedido;
            entity.repartidor = null;
            List<Pedido> pedidoList = new()
            {
                entity
            };

            var result = entity.post(entity);  


            return result ? Ok(pedidoList) : BadRequest($"No se ha logrado agregar a {entity.idPedido}");
        }

        // PUT api/<PedidoController>/5
        [HttpPut]
        public async Task<ActionResult<List<Pedido>>> Put(Pedido entity)
        {
            con.Open();
            NpgsqlCommand command = new($"select idComercio from (producto_pedido " +
                $"join producto on producto_pedido.producto = producto.nombre) where idComercio={entity.idPedido}");
            NpgsqlDataReader rd = command.ExecuteReader();
            int idComercio = Convert.ToInt32(rd["idcomercio"]);
            rd.Read();
            con.Close();
            if (!(entity.finalizado == "Solicitado"))
            {

                //Finalizar pedido
                return Ok("");
            }
            //llama la de asignar
            return Ok("");
        }

        // DELETE api/<PedidoController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<ProductosPedido>>> Delete(int id)
        {
            List<ProductosPedido> entityList = new();

            var result = pedido.delete(id.ToString());

            return result ? Ok(entityList) : BadRequest($"No se ha logrado eliminar a {id}");
        }
    }
}
