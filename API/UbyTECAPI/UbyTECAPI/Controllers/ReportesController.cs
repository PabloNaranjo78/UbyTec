using Microsoft.AspNetCore.Mvc;
using Npgsql;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UbyTECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportesController : ControllerBase
    {
        private NpgsqlConnection con = new(Connection.Connection.ConnectionString);
        // GET: api/<ReportesController>
        [HttpGet("ConsolidadoVentas")]
        public async Task<ActionResult<List<ConsolidadoVentas>>> GetConsolidadoVentas()
        {
            try
            {
                con.Open();
                NpgsqlCommand command = new("select cliente,afiliado,compras,repartidor,monto_total,monto_servicio from consolidado_ventas", con);
                var rd = command.ExecuteReader();
                var consolidadoVentas = new List<ConsolidadoVentas>();
                while (rd.Read())
                {
                    consolidadoVentas.Add(new ConsolidadoVentas
                    {
                        cliente = rd["cliente"].ToString(),
                        afiliado = rd["afiliado"].ToString(),
                        compras = Convert.ToInt32(rd["compras"]),
                        repartidor = rd["repartidor"].ToString(),
                        monto_total = Convert.ToInt32(rd["monto_total"]),
                        monto_servicio = Convert.ToInt32(rd["monto_servicio"])
                    });
                };
                con.Close();

                return Ok(consolidadoVentas);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar con la base de datos");
            }
        }
        // GET: api/<ReportesController>
        [HttpGet("VentasAfiliado")]
        public async Task<ActionResult<List<VentasAfiliado>>> GetVentasAfiliado()
        {
            try
            {
                con.Open();
                NpgsqlCommand command = new("select afiliado,compras,monto_total,monto_servicio from ventas_afiliado", con);
                var rd = command.ExecuteReader();
                var consolidadoVentas = new List<VentasAfiliado>();
                while (rd.Read())
                {
                    consolidadoVentas.Add(new VentasAfiliado
                    {
                        afiliado = rd["afiliado"].ToString(),
                        compras = Convert.ToInt32(rd["compras"]),
                        monto_total = Convert.ToInt32(rd["monto_total"]),
                        monto_servicio = Convert.ToInt32(rd["monto_servicio"])
                    });
                };
                con.Close();

                return Ok(consolidadoVentas);
            }
            catch (Exception)
            {
                return BadRequest("No se logró conectar con la base de datos");
            }
        }
    }

    public class VentasAfiliado
    {
        public string? afiliado { get; set; }
        public int compras { get; set; }
        public int monto_total { get; set; }
        public int monto_servicio { get; set; }
    }

    public class ConsolidadoVentas
    {
        public string? cliente { set; get; }
        public string? afiliado { set; get; }
        public int compras { set; get; }
        public string? repartidor { set; get; }
        public int monto_total { set; get; }
        public int monto_servicio { set; get; }
    }
}
