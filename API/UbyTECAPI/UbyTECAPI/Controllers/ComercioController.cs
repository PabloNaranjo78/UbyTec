﻿using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System;
using UbyTECAPI.Models;
using UbyTECAPI.Tools;

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
                NpgsqlCommand command = new($"SELECT {comercio.getAtributes()} FROM getsolicitudes()", con);
                NpgsqlDataReader rd = command.ExecuteReader();
                List<Comercio> entityList = comercio.createEntityP(rd);
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

        // GET api/<ComercioController>/5
        [HttpGet("Cercano/{id}")]
        public async Task<ActionResult<List<Comercio>>> GetCercanos(int id)
        {
            try
            {
                con.Open();
                NpgsqlCommand command = new($"SELECT {comercio.getAtributes()} FROM GetComercioCercanoACliente({id})", con);
                NpgsqlDataReader rd = command.ExecuteReader();
                List<Comercio> entityList = comercio.createEntityP(rd);
                con.Close();
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
            var tempPass = PassGenerator.generatePass();
            entity.pass = tempPass;

            List<Comercio> entityList = new() 
            {
                entity
            };
            
            if (!entity.post(entity))
            {
                return BadRequest($"No se ha logrado agregar a {entity.nombre}");
            }
            if(!EmailSender.sendEmail(entity.correo,entity.nombre, tempPass, "Comercio"))
            {
                var result = entity.delete(entity.idComercio.ToString());
                return BadRequest("Email no válido");
            }
            return Ok(entity);
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
